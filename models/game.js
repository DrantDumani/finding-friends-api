const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

module.exports = mongoose.model("Game", GameSchema);
