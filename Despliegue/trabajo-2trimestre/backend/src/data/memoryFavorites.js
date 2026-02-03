const { randomUUID } = require("node:crypto");

const favoritos = [];

function getAll() {
  return favoritos;
}

function findByMalId(malId) {
  return favoritos.find((item) => item.mal_id === malId) || null;
}

function create({ mal_id, title, image, score, year }) {
  const favorito = {
    _id: randomUUID(),
    mal_id,
    title,
    image,
    score,
    year,
    createdAt: new Date().toISOString()
  };
  favoritos.unshift(favorito);
  return favorito;
}

function removeById(id) {
  const index = favoritos.findIndex((item) => item._id === id);
  if (index === -1) return false;
  favoritos.splice(index, 1);
  return true;
}

module.exports = { getAll, findByMalId, create, removeById };
