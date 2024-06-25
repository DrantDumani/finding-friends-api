const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const validateParams = require("../middleware/validateParams");

router.get("/thumbnails", gameController.getAllThumbnails);

router.get("/:gameId", validateParams.gameId, gameController.getSingleGame);

module.exports = router;
