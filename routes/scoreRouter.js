const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const validateParams = require("../middleware/validateParams");

router.post(
  "/:gameInstanceId",
  validateParams.validateToken,
  validateParams.playerName,
  scoreController.addScore
);

router.get("/:gameId", validateParams.gameId, scoreController.getScores);

module.exports = router;
