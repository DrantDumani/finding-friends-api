const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScoreSchema = Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 7 },
  date: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  gameId: { type: Schema.Types.ObjectId, ref: "Game" },
});

module.exports = mongoose.model("Score", ScoreSchema);
