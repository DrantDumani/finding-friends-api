const GameInstance = require("../models/gameInstance");
const Game = require("../models/game");
const Character = require("../models/character");
const { getImgPath } = require("../utils/getImgPath");

exports.createInstance = async (req, res, next) => {
  try {
    const [validGame, chars] = await Promise.all([
      Game.findById(req.params.gameId).exec(),
      Promise.all(
        req.body.chars.map((char) => Character.findById(char).exec())
      ),
    ]);

    const validChars = chars.filter(
      (char) => char?.gameId.toString() === validGame?._id.toString()
    );
    if (!validGame || validChars.length !== 3) {
      return res.status(422).json({ err: "Invalid game data" });
    } else {
      const gameInstance = new GameInstance({
        gameId: req.params.gameId,
        chars: validChars.map((char) => ({ char: char })),
      });
      await gameInstance.save();
      res.json({ _id: gameInstance._id });
    }
  } catch (err) {
    return next(err);
  }
};

exports.getInstance = async (req, res, next) => {
  try {
    const gameInstance = await GameInstance.findById(req.params.gameInstanceId)
      .populate({ path: "gameId chars.char", select: "image name" })
      .exec();
    if (!gameInstance) {
      return res.status(404).json({ err: "Invalid or expired game" });
    } else {
      gameInstance.gameId.image = getImgPath(req, gameInstance.gameId.image);
      gameInstance.chars.forEach(
        (charObj) => (charObj.char.image = getImgPath(req, charObj.char.image))
      );
      return res.json(gameInstance);
    }
  } catch (err) {
    return next(err);
  }
};

exports.findCharacter = async (req, res, next) => {
  try {
    const [gameInstance, character] = await Promise.all([
      GameInstance.findById(req.params.gameInstanceId).exec(),
      Character.findById(req.params.characterId).exec(),
    ]);

    if (!gameInstance || !character) {
      return res.status(404).json("Invalid or expired game");
    } else {
      const { xPos, yPos } = req.body.coords;
      if (
        xPos >= character.lX &&
        xPos <= character.uX &&
        yPos >= character.lY &&
        yPos <= character.uY
      ) {
        gameInstance.chars = gameInstance.chars.map((charRef) => {
          if (charRef.char.toString() === req.params.characterId) {
            return { ...charRef, found: true };
          } else return charRef;
        });
        await gameInstance.save();
        res.json({ msg: `Correct! You found ${character.name}` });
      } else {
        res.json({ msg: "Incorrect! Keep looking" });
      }
    }
  } catch (err) {
    return next(err);
  }
};
