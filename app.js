const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (err, req, res, _next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res
    .status(err.status || 500)
    .send({ data: null, error: true, message: err.message || "Error occured" });
});

module.exports = app;
