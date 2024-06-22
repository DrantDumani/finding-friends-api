const Score = require("../models/score");
const GameInstance = require("../models/gameInstance");

exports.addScore = async (req, res, next) => {
  try {
    const gameInstance = await GameInstance.findById(req.params.gameInstanceId)
      .populate("gameId")
      .exec();
    if (!gameInstance) {
      return res.status(404).json({ err: "Invalid or expired game" });
    }
    const isGameOver = gameInstance.chars.every((char) => char.found);
    if (!isGameOver) {
      return res
        .status(403)
        .json({ err: "Cannot add score until game is completed" });
    }
    const time =
      Date.parse(gameInstance.updatedAt) - Date.parse(gameInstance.createdAt);
    const score = new Score({
      name: req.body.name,
      score: time,
      gameId: gameInstance.gameId,
    });

    await Promise.all([
      GameInstance.findByIdAndDelete(req.params.gameInstanceId).exec(),
      score.save(),
    ]);

    res.json({ name: score.name, score: score.score });
  } catch (err) {
    res.status(400).json({ err: "Bad request" });
    return next(err);
  }
};

exports.getScores = async (req, res, next) => {
  try {
    const scores = await Score.find({ gameId: req.params.gameId })
      .sort({ score: 1 })
      .exec();
    return res.json(scores);
  } catch (err) {
    return next(err);
  }
};
