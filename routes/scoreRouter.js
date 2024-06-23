const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const validateParams = require("../middleware/validateParams");

router.post(
  "/:gameInstanceId",
  validateParams.playerName,
  validateParams.gameInstanceId,
  scoreController.addScore
);

router.get(
  "/:gameInstanceId",
  validateParams.gameInstanceId,
  scoreController.getScores
);

module.exports = router;
