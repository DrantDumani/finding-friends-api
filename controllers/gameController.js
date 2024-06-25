const Game = require("../models/game");
const Character = require("../models/character");
const mongoose = require("mongoose");
const { getImgPath } = require("../utils/getImgPath");

exports.getAllThumbnails = async (req, res, next) => {
  try {
    const games = await Game.find({}, "name thumbnail").exec();
    games.forEach((game) => (game.thumbnail = getImgPath(req, game.thumbnail)));
    return res.json(games);
  } catch (err) {
    return next(err);
  }
};

exports.getSingleGame = async (req, res, next) => {
  try {
    const [game, characters] = await Promise.all([
      Game.findById(req.params.gameId, "image").exec(),
      Character.aggregate([
        {
          $match: {
            gameId: mongoose.Types.ObjectId.createFromHexString(
              req.params.gameId
            ),
          },
        },
        { $sample: { size: 3 } },
        { $project: { name: 1, image: 1, gameId: 1 } },
      ]),
    ]);
    if (!game) {
      return res.status(404).json({ err: "Game not found" });
    } else {
      game.image = getImgPath(req, game.image);
      characters.forEach((char) => (char.image = getImgPath(req, char.image)));
      return res.json({ game, characters });
    }
  } catch (err) {
    return next(err);
  }
};
