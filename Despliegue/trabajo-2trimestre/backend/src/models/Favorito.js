const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema(
  {
    mal_id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: ""
    },
    score: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Favorito", favoritoSchema);
