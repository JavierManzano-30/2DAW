import { UIMessage, convertToModelMessages, streamText, embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { getPool, toVectorParam } from "@/lib/db";

export const runtime = "nodejs";

const openaiBaseUrl =
  process.env.OPENAI_API_BASE ||
  process.env.OPENAI_BASE_URL ||
  "https://models.inference.ai.azure.com/v1";

const SYSTEM_PROMPT = `Eres un asistente que solo responde basándose en el contexto proporcionado.
Si la pregunta no está respondida por el contexto, di claramente que no tienes información para responder.
No inventes detalles, sé breve y preciso.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const uiMessagesWithoutId = (messages as Array<UIMessage>).map(({ id, ...rest }) => {
    void id;
    return rest;
  });

  // Extraer el texto del último mensaje de usuario (solo partes de texto).
  const lastUser = [...uiMessagesWithoutId].reverse().find((m) => m.role === "user");
  const question = lastUser?.parts
    ?.map((p) => ("text" in p ? p.text : ""))
    .join(" ")
    .trim();

  if (!question) {
    return new Response("Pregunta no válida", { status: 400 });
  }

  const modelMessages = convertToModelMessages(uiMessagesWithoutId);

  // 1) Embed the question and retrieve context.
  const embeddingResult = await embed({
    model: openai.embedding("text-embedding-3-small", {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: openaiBaseUrl,
    }), // dimensión 1536
    value: question,
  });

  const pool = getPool();
  const { rows } = await pool.query(
    `
      SELECT content, source
      FROM documents
      ORDER BY embedding <-> $1
      LIMIT 5
    `,
    [toVectorParam(embeddingResult.embedding)]
  );

  const context = rows
    .map((row) => `Fuente: ${row.source || "desconocida"}\n${row.content}`)
    .join("\n\n");

  const augmentedMessages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    {
      role: "system" as const,
      content: `Contexto recuperado:\n${context || "(sin contexto recuperado)"}`,
    },
    ...modelMessages,
  ];

  // 2) Generate grounded answer with streaming.
  const response = await streamText({
    model: openai("gpt-4o-mini", {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: openaiBaseUrl,
    }),
    messages: augmentedMessages,
  });

  return response.toUIMessageStreamResponse();
}
