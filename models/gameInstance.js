const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameInstanceSchema = Schema({
  gameId: { type: Schema.Types.ObjectId, ref: "Game" },
  chars: [
    {
      char: { type: Schema.Types.ObjectId, ref: "Character" },
      found: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("GameInstance", GameInstanceSchema);
