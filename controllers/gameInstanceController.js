const Character = require("../models/character");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.createInstance = async (req, res, next) => {
  try {
    const gameInstance = jwt.verify(res.locals.gameToken, process.env.SECRET);
    gameInstance.characters = gameInstance.characters.map((char) => ({
      ...char,
      found: false,
    }));
    gameInstance._id = new mongoose.Types.ObjectId();
    console.log(gameInstance._id);
    delete gameInstance.iat;

    const instanceToken = jwt.sign(gameInstance, process.env.SECRET, {
      expiresIn: "1h",
    });
    return res.json(instanceToken);
  } catch (err) {
    return next(err);
  }
};

exports.findCharacter = async (req, res, next) => {
  try {
    const gameInstance = jwt.verify(res.locals.gameToken, process.env.SECRET);
    const character = await Character.findById(req.params.characterId).exec();
    const { xPos, yPos } = req.body.coords;
    if (
      xPos >= character.lX &&
      xPos <= character.uX &&
      yPos >= character.lY &&
      yPos <= character.uY
    ) {
      gameInstance.characters = gameInstance.characters.map((char) =>
        char._id === req.params.characterId ? { ...char, found: true } : char
      );
      gameInstance.updatedAt = Date.now();
      msg = `Correct! You found ${character.name}`;
    } else {
      msg = "Incorrect! Keep looking";
    }
    const newToken = jwt.sign(gameInstance, process.env.SECRET);
    return res.json({ msg, newToken });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(404).json("Expired game");
    }
    return next(err);
  }
};
