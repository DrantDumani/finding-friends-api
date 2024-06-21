const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./mongoConfig/mongoConfig");
const logger = require("morgan");
const createError = require("http-errors");
require("dotenv").config();

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

// Place routers here

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Currently running on port ${port}`);
});
