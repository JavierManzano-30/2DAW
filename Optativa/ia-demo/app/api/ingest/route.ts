import { NextRequest, NextResponse } from "next/server";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { getPool, toVectorParam } from "@/lib/db";
import { chunkText } from "@/lib/chunk";

export const runtime = "nodejs";

const openaiBaseUrl =
  process.env.OPENAI_API_BASE ||
  process.env.OPENAI_BASE_URL ||
  "https://models.inference.ai.azure.com/v1";

export async function POST(req: NextRequest) {
  try {
    const { text, source } = (await req.json()) as {
      text?: string;
      source?: string;
    };

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Texto vacío, envía contenido para indexar." },
        { status: 400 }
      );
    }

    const chunks = chunkText(text);
    if (chunks.length === 0) {
      return NextResponse.json(
        { error: "No se pudieron generar fragmentos." },
        { status: 400 }
      );
    }

    const pool = getPool();
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        const embeddingResult = await embed({
          model: openai.embedding("text-embedding-3-small", {
            apiKey: process.env.OPENAI_API_KEY,
            baseUrl: openaiBaseUrl,
          }),
          value: chunk,
        });
        await client.query(
          `
            INSERT INTO documents (source, chunk_index, content, embedding)
            VALUES ($1, $2, $3, $4)
          `,
          [source || "manual", i, chunk, toVectorParam(embeddingResult.embedding)]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    return NextResponse.json({
      ok: true,
      chunks: chunks.length,
      source: source || "manual",
    });
  } catch (error) {
    console.error("Error en /api/ingest:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Error interno" },
      { status: 500 }
    );
  }
}
