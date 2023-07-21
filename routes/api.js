const express = require("express");
const router = express.Router();

const scrapRouter = require("./v1_0/scrap");

router.use("/v1_0/scrap", scrapRouter);

module.exports = router;
