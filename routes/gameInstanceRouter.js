const express = require("express");
const router = express.Router();
const validateParams = require("../middleware/validateParams");
const gameInstanceController = require("../controllers/gameInstanceController");

router.post(
  "/:gameId",
  validateParams.validateToken,
  gameInstanceController.createInstance
);

router.put(
  "/:characterId",
  validateParams.validateToken,
  gameInstanceController.findCharacter
);

module.exports = router;
