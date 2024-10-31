const Score = require("../models/score");
const jwt = require("jsonwebtoken");

exports.addScore = async (req, res, next) => {
  try {
    const gameInstance = jwt.verify(res.locals.gameToken, process.env.SECRET);
    const isGameOver = gameInstance.characters.every((char) => char.found);
    if (!gameInstance) {
      return res.status(404).json({ err: "Invalid or expired game" });
    }

    if (!isGameOver) {
      return res
        .status(403)
        .json({ err: "Cannot add score until game is completed" });
    }
    const time = gameInstance.updatedAt - gameInstance.iat * 1000;
    const score = new Score({
      _id: gameInstance._id,
      name: req.body.name,
      score: time,
      gameId: gameInstance.game._id,
    });
    await score.save();
    res.json({ name: score.name, score: score.score });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(404).json({ err: "Expired game" });
    }
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
