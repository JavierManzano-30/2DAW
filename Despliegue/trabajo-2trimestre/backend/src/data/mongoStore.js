const Tarea = require("../models/Tarea");

async function getAll() {
  return Tarea.find().sort({ createdAt: -1 }).lean();
}

async function create({ titulo, descripcion }) {
  const tarea = await Tarea.create({ titulo, descripcion });
  return tarea.toObject();
}

async function remove(id) {
  const result = await Tarea.findByIdAndDelete(id).lean();
  return Boolean(result);
}

module.exports = { getAll, create, remove };
