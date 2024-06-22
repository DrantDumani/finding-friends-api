const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/thumbnails", gameController.getAllThumbnails);

router.get("/:gameId", gameController.getSingleGame);

module.exports = router;
