const Game = require("../models/game");
const Character = require("../models/character");
const mongoose = require("mongoose");
const { getImgPath } = require("../utils/getImgPath");
const jwt = require("jsonwebtoken");

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
        { $project: { name: 1, image: 1 } },
      ]),
    ]);
    if (!game) {
      return res.status(404).json({ err: "Game not found" });
    } else {
      game.image = getImgPath(req, game.image);
      characters.forEach((char) => (char.image = getImgPath(req, char.image)));
      const payload = { game, characters };
      const token = jwt.sign(payload, process.env.SECRET);
      return res.json(token);
    }
  } catch (err) {
    return next(err);
  }
};
