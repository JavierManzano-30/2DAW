const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const tareas = await req.repo.getAll();
  res.json(tareas);
});

router.post("/", async (req, res) => {
  const { titulo, descripcion } = req.body || {};

  if (!titulo || !descripcion) {
    return res.status(400).json({
      error: "titulo y descripcion son obligatorios"
    });
  }

  const tarea = await req.repo.create({ titulo, descripcion });
  return res.status(201).json(tarea);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const removed = await req.repo.remove(id);

  if (!removed) {
    return res.status(404).json({ error: "tarea no encontrada" });
  }

  return res.json({ ok: true });
});

module.exports = router;
