const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameInstanceSchema = Schema(
  {
    createdAt: { type: Date, expires: 3600, default: Date.now },
    gameId: { type: Schema.Types.ObjectId, ref: "Game" },
    chars: [
      {
        char: { type: Schema.Types.ObjectId, ref: "Character" },
        found: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameInstance", GameInstanceSchema);
