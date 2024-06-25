const mongoose = require("mongoose");
const { Schema } = mongoose;

const CharacterSchema = Schema({
  name: { type: String },
  image: { type: String },
  gameId: { type: Schema.Types.ObjectId, ref: "Game" },
  uX: { type: Number },
  uY: { type: Number },
  lX: { type: Number },
  lY: { type: Number },
});

module.exports = mongoose.model("Character", CharacterSchema);
