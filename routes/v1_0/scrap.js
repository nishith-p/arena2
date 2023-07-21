const express = require("express");
const router = express.Router();

const scrapController = require("../../controllers/scrap");

router.get("/", scrapController.getQueueList);
router.get("/stats/:host/:name/", scrapController.getQueueStats);
router.get("/:host/:name/:status", scrapController.getQueueJobsByStatus);

module.exports = router;
