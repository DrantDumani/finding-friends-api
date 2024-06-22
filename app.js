const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
require("dotenv").config();

const gameRouter = require("./routes/gameRouter");
const gameInstanceRouter = require("./routes/gameInstanceRouter");
const scoreRouter = require("./routes/scoreRouter");

const mongoURI = process.env.PRODUCTION_DB || process.env.DEVELOPMENT_DB;
const port = process.env.PORT;

mongoose.set("strictQuery", "false");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoURI);
}

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/games", gameRouter);
app.use("/gameInstances", gameInstanceRouter);
app.use("/scores", scoreRouter);

app.use((err, req, res, next) => {
  const error = req.app.get("env") === "development" ? err.message : "";
  console.error(error);
});

app.listen(port, () => {
  console.log(`Currently running on port ${port}`);
});
