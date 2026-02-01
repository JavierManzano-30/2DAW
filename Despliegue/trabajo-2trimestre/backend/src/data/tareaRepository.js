const memoryStore = require("./memoryStore");
const mongoStore = require("./mongoStore");

function createRepository({ mongoReady }) {
  return mongoReady ? mongoStore : memoryStore;
}

module.exports = { createRepository };
