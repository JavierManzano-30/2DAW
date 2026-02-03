const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const favoritos = await req.favorites.getAll();
  res.json(favoritos);
});

router.post("/", async (req, res) => {
  const { mal_id, title, image, score, year } = req.body || {};

  if (!mal_id || !title) {
    return res.status(400).json({ error: "mal_id y title son obligatorios" });
  }

  const existing = await req.favorites.findByMalId(Number(mal_id));
  if (existing) {
    return res.status(200).json(existing);
  }

  const favorito = await req.favorites.create({
    mal_id: Number(mal_id),
    title,
    image: image || "",
    score: typeof score === "number" ? score : null,
    year: typeof year === "number" ? year : null
  });

  return res.status(201).json(favorito);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const removed = await req.favorites.removeById(id);

  if (!removed) {
    return res.status(404).json({ error: "favorito no encontrado" });
  }

  return res.json({ ok: true });
});

module.exports = router;
