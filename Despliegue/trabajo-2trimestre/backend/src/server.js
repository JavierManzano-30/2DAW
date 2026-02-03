const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToMongo } = require("./db");
const { createFavoritesRepository } = require("./data/favoriteRepository");
const animeRouter = require("./routes/anime");
const favoritosRouter = require("./routes/favoritos");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

async function start() {
  const mongoReady = await connectToMongo(process.env.MONGO_URI);
  const favorites = createFavoritesRepository({ mongoReady });

  app.use((req, _res, next) => {
    req.favorites = favorites;
    next();
  });

  app.get("/", (_req, res) => {
    res.json({
      ok: true,
      service: "anime-api",
      storage: mongoReady ? "mongo" : "memory"
    });
  });

  app.use("/anime", animeRouter);
  app.use("/favoritos", favoritosRouter);

  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

start();
