const memoryFavorites = require("./memoryFavorites");
const mongoFavorites = require("./mongoFavorites");

function createFavoritesRepository({ mongoReady }) {
  return mongoReady ? mongoFavorites : memoryFavorites;
}

module.exports = { createFavoritesRepository };
