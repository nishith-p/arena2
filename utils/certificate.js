const path = require("path");
const fs = require("fs");
const https = require("https");

const options = {
  cert: fs.readFileSync(path.resolve(__dirname, "../authCert.crt"), `utf-8`),
  rejectUnauthorized: false,
  keepAlive: false,
};

const httpsAgent = new https.Agent(options);

module.exports = { httpsAgent };
