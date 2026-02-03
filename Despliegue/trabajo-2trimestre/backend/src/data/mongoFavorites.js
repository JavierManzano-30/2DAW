const Favorito = require("../models/Favorito");

async function getAll() {
  return Favorito.find().sort({ createdAt: -1 }).lean();
}

async function findByMalId(malId) {
  return Favorito.findOne({ mal_id: malId }).lean();
}

async function create({ mal_id, title, image, score, year }) {
  const favorito = await Favorito.create({ mal_id, title, image, score, year });
  return favorito.toObject();
}

async function removeById(id) {
  const result = await Favorito.findByIdAndDelete(id).lean();
  return Boolean(result);
}

module.exports = { getAll, findByMalId, create, removeById };
