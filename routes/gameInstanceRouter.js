const express = require("express");
const router = express.Router();
const validateParams = require("../middleware/validateParams");
const gameInstanceController = require("../controllers/gameInstanceController");

router.get(
  "/:gameInstanceId",
  validateParams.gameInstanceId,
  gameInstanceController.getInstance
);

router.post(
  "/:gameId",
  validateParams.gameId,
  validateParams.characterIds,
  gameInstanceController.createInstance
);

router.put(
  "/:gameInstanceId/:characterId",
  gameInstanceController.findCharacter
);

module.exports = router;
