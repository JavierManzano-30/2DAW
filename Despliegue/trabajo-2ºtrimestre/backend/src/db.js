const mongoose = require("mongoose");

async function connectToMongo(mongoUri) {
  if (!mongoUri) {
    console.log("MONGO_URI not set. Using in-memory storage.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed. Using in-memory storage.");
    console.error(err.message);
    return false;
  }
}

module.exports = { connectToMongo };
