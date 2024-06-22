const Game = require("../models/game");
const Character = require("../models/character");
const mongoose = require("mongoose");

exports.getAllThumbnails = async (req, res, next) => {
  try {
    const games = await Game.find({}, "name thumbnail").exec();
    return res.json(games);
  } catch (err) {
    return next(err);
  }
};

exports.getSingleGame = async (req, res, next) => {
  try {
    const [game, characters] = await Promise.all([
      Game.findById(req.params.gameId).exec(),
      Character.aggregate([
        { $match: { gameId: new mongoose.Types.ObjectId(req.params.gameId) } },
        { $sample: { size: 3 } },
        { $project: { name: 1, image: 1, gameId: 1 } },
      ]),
    ]);
    return res.json({ game, characters });
  } catch (err) {
    return next(err);
  }
};
