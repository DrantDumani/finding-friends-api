const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

router.post("/:gameInstanceId", scoreController.addScore);

router.get("/:gameId", scoreController.getScores);

module.exports = router;
