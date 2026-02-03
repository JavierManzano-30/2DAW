const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToMongo } = require("./db");
const { createRepository } = require("./data/tareaRepository");
const tareasRouter = require("./routes/tareas");
const animeRouter = require("./routes/anime");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

async function start() {
  const mongoReady = await connectToMongo(process.env.MONGO_URI);
  const repo = createRepository({ mongoReady });

  app.use((req, _res, next) => {
    req.repo = repo;
    next();
  });

  app.get("/", (_req, res) => {
    res.json({
      ok: true,
      service: "tareas-api",
      storage: mongoReady ? "mongo" : "memory"
    });
  });

  app.use("/tareas", tareasRouter);
  app.use("/anime", animeRouter);

  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

start();
