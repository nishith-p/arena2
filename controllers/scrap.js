const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("json-2-csv");
const fs = require("fs");

const { httpsAgent } = require("../utils/certificate");

const SCHEDULER_URL = process.env.SCHEDULER_URL;

const getQueueList = async (_req, res, next) => {
  try {
    const resObj = await axios(SCHEDULER_URL, {
      httpsAgent,
    });
    const $ = cheerio.load(resObj.data);

    let queues = [];

    $("#queueList tbody tr").each((_index, element) => {
      const host = $(element).find("td:nth-child(1)").text();
      const name = $(element).find("td:nth-child(2) a").text();
      const link = $(element).find("td:nth-child(2) a").attr("href");

      queues.push({ host, name, link });
    });

    res.status(200).send({ data: queues, error: false, message: null });
  } catch (error) {
    next(error);
  }
};

const getQueueStats = async (req, res, next) => {
  try {
    const qURL =
      SCHEDULER_URL +
      req.params.host.toUpperCase() +
      "/" +
      req.params.name.toUpperCase();

    const resObj = await axios(qURL, {
      httpsAgent,
    });

    const $ = cheerio.load(resObj.data);

    let queueStats = [];

    $(".list-group-item").each((index, element) => {
      const badge = $(element).find(".badge").text();
      const text = $(element).find(".text-capitalize").text();

      queueStats.push({ badge, text });
    });

    res.status(200).send({ data: queueStats, error: false, message: null });
  } catch (error) {
    next(error);
  }
};

const getQueueJobsByStatus = async (req, res, next) => {
  try {
    const qURL =
      SCHEDULER_URL +
      req.params.host.toUpperCase() +
      "/" +
      req.params.name.toUpperCase() +
      "/" +
      req.params.status.toLowerCase() +
      "?page=" +
      req.query.page +
      "&order=" +
      req.query.order +
      "&pageSize=" +
      (!req.query.pageSize ? 100 : req.query.pageSize);
    const resObj = await axios(qURL, {
      httpsAgent,
    });

    const $ = cheerio.load(resObj.data);

    const jobDataArray = [];

    $("ul.list-group li.list-group-item").each((index, element) => {
      const label = $(element).find(".label").text();
      const state = $(element)
        .find("div.row div.col-sm-3:nth-child(1)")
        .text()
        .replace("State\n", "")
        .trim();
      const timestamp = $(element)
        .find("div.row div.col-sm-3:nth-child(2)")
        .text()
        .replace("Timestamp\n", "")
        .trim();
      const processed = $(element)
        .find("div.row div.col-sm-3:nth-child(3)")
        .text()
        .replace("Processed\n", "")
        .trim();
      const finished = $(element)
        .find("div.row div.col-sm-3:nth-child(4)")
        .text()
        .replace("Finished\n", "")
        .trim();
      const progress = $(element)
        .find("div.progress div.progress-bar")
        .text()
        .trim();
      let reasonForFailure = $(element)
        .find('h5:contains("Reason for failure") + pre code')
        .text()
        .trim();
      let reqPayload = $(element)
        .find('h5:contains("Data") + pre code')
        .text()
        .trim();

      if (reasonForFailure) {
        try {
          reasonForFailure = JSON.parse(reasonForFailure);
        } catch (error) {
          //console.error("Invalid JSON for reasonForFailure:", error);
          reasonForFailure = reasonForFailure;
        }
      }

      if (reqPayload) {
        try {
          reqPayload = JSON.parse(reqPayload);
        } catch (error) {
          console.error("Invalid JSON for reqPayload:", error);
          reqPayload = null;
        }
      }

      jobDataArray.push({
        label,
        state,
        timestamp,
        processed,
        finished,
        progress,
        reasonForFailure,
        reqPayload,
      });
    });

    jobDataArray.shift();

    if (req.query.dup === "r") {
      const uniqueMessages = {};

      const filteredData = jobDataArray.filter((obj) => {
        if (!uniqueMessages[obj.reasonForFailure.internalMessage]) {
          uniqueMessages[obj.reasonForFailure.internalMessage] = true;
          return true;
        }
        return false;
      });

      jobDataArray.splice(0, jobDataArray.length, ...filteredData);
    }

    if (req.query.export === "e") {
      const csv = await _.json2csv(jobDataArray);
      fs.writeFileSync(
        `./exports/queue-export-${new Date().getTime()}.csv`,
        csv
      );
    }

    res
      .status(200)
      .send({ data: jobDataArray || "No data", error: false, message: null });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQueueList, getQueueStats, getQueueJobsByStatus };
