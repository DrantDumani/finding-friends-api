const mongoose = require("mongoose");

exports.gameId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.gameId)) {
    return res.status(400).json({ err: "Bad request" });
  }
  return next();
};

exports.gameInstanceId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.gameInstanceId)) {
    return res.status(400).json({ err: "Bad request" });
  }
  return next();
};

exports.singleCharacterId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.characterId)) {
    return res.status(400).json({ err: "Bad request" });
  }
  return next();
};

exports.characterIds = (req, res, next) => {
  const allValid = Array.isArray(req.body.chars)
    ? req.body.chars.every((id) => mongoose.isValidObjectId(id))
    : false;
  if (!allValid) {
    return res.status(400).json({ err: "Bad request" });
  }
  return next();
};

exports.playerName = (req, res, next) => {
  if (req.body.name || req.body.name.length > 7) {
    return res.status(400).json({ err: "Bad request" });
  }
  return next();
};
