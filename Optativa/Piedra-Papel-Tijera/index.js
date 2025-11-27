// Script de ejemplo para llamar al endpoint de Chat Completions de OpenAI.
// Usa fetch nativo de Node 18+ y la API key de https://platform.openai.com/api-keys.

const fs = require("fs");
const path = require("path");
const http = require("http");
const rps = require("./main.js");

const CHAT_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";
const PORT = Number(process.env.PORT) || 3000;

const loadEnvLocal = () => {
  const envPath = path.join(__dirname, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key && val && !process.env[key]) {
      process.env[key] = val;
    }
  }
};

loadEnvLocal();

const API_KEY =
  process.env.OPENAI_API_KEY ||
  process.env.OPENAI_APIKEY ||
  "PON_AQUI_TU_API_KEY";

if (!API_KEY || API_KEY === "PON_AQUI_TU_API_KEY") {
  console.error(
    "Falta API key. Configura la variable de entorno OPENAI_API_KEY o edita el código."
  );
  process.exit(1);
}

async function askChat(promptText) {
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: "Eres un asistente breve y claro." },
      { role: "user", content: promptText },
    ],
    temperature: 0.7,
  };

  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0]?.message?.content;
  if (!choice) throw new Error("Respuesta sin contenido de chat.");
  return choice.trim();
}

async function cliMain() {
  const promptText =
    process.argv.filter((x) => !x.startsWith("--")).slice(2).join(" ") ||
    "Dame un saludo rápido desde el modelo de chat.";
  try {
    const reply = await askChat(promptText);
    console.log("Respuesta del modelo:\n", reply);
  } catch (err) {
    console.error("Error al llamar a la API:", err.message);
    process.exit(1);
  }
}

const serveStatic = (req, res) => {
  const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = parsed.pathname;
  if (pathname === "/") pathname = "/index.html";

  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(__dirname, "public", safePath);

  if (!filePath.startsWith(path.join(__dirname, "public"))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime =
    {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".json": "application/json; charset=utf-8",
    }[ext] || "text/plain; charset=utf-8";

  res.writeHead(200, { "Content-Type": mime });
  fs.createReadStream(filePath).pipe(res);
};

const handleApiChat = async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405, { Allow: "POST" });
    res.end("Only POST");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 1e6) req.connection.destroy(); // evitar abusos
  });

  req.on("end", async () => {
    try {
      const parsed = JSON.parse(body || "{}");
      const prompt = String(parsed.prompt || "").trim();
      if (!prompt) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Prompt vacío" }));
        return;
      }

      const reply = await askChat(prompt);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ reply }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message || "Error desconocido" }));
    }
  });
};

const handleApiRps = (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405, { Allow: "POST" });
    res.end("Only POST");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on("end", () => {
    try {
      const payload = JSON.parse(body || "{}");
      const playerMove = String(payload.playerMove || "").trim().toLowerCase();
      const finish = Boolean(payload.finish);
      const state = payload.state || {
        score: { player: 0, machine: 0 },
        history: { player: [], machine: [] },
      };

      if (!finish && !rps.MOVES.includes(playerMove)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Jugada inválida" }));
        return;
      }

      const historyPlayer = state.history?.player || [];
      const historyMachine = state.history?.machine || [];

      if (finish) {
        const predictability = rps.computePredictability(historyPlayer);
        const summary = rps.summarizePattern(historyPlayer, predictability);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            summary,
            predictability,
            state: {
              score: state.score || { player: 0, machine: 0 },
              history: { player: historyPlayer, machine: historyMachine },
            },
          })
        );
        return;
      }

      const predictedPlayerMove = rps.predictPlayerNext(historyPlayer);
      const machineMove = rps.counterMove(predictedPlayerMove);
      const winner = rps.decideWinner(playerMove, machineMove);

      const newScore = { ...(state.score || {}) };
      if (winner === "player") newScore.player = (newScore.player || 0) + 1;
      if (winner === "machine") newScore.machine = (newScore.machine || 0) + 1;

      const newHistory = {
        player: [...historyPlayer, playerMove],
        machine: [...historyMachine, machineMove],
      };

      const predictability = rps.computePredictability(newHistory.player);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          machineMove,
          winner,
          predictedPlayerMove,
          predictability,
          state: { score: newScore, history: newHistory },
        })
      );
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message || "Error desconocido" }));
    }
  });
};

function startWebServer() {
  const server = http.createServer((req, res) => {
    const parsed = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (parsed.pathname === "/api/chat") {
      handleApiChat(req, res);
      return;
    }
    if (parsed.pathname === "/api/rps") {
      handleApiRps(req, res);
      return;
    }
    serveStatic(req, res);
  });

  server.listen(PORT, () => {
    console.log(
      `Servidor web listo en http://localhost:${PORT} (Ctrl+C para parar)`
    );
  });
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const wantsWeb = args.includes("--web");
  if (wantsWeb) {
    startWebServer();
  } else {
    cliMain();
  }
}

module.exports = { askChat };
