const { randomUUID } = require("node:crypto");

const tareas = [];

function getAll() {
  return tareas;
}

function create({ titulo, descripcion }) {
  const tarea = {
    id: randomUUID(),
    titulo,
    descripcion,
    createdAt: new Date().toISOString()
  };
  tareas.push(tarea);
  return tarea;
}

function remove(id) {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index === -1) return false;
  tareas.splice(index, 1);
  return true;
}

module.exports = { getAll, create, remove };
