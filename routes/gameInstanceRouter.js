const express = require("express");
const router = express.Router();
const gameInstanceController = require("../controllers/gameInstanceController");

router.get("/:gameInstanceId", gameInstanceController.getInstance);

router.post("/", gameInstanceController.createInstance);

router.put(
  "/:gameInstanceId/:characterId",
  gameInstanceController.findCharacter
);

module.exports = router;
