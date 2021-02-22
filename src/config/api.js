const axios = require("axios");
const rateLimit = require("axios-rate-limit");

const iam = rateLimit(
  axios.default.create({
    baseURL: "https://iam.cloud.ibm.com",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  }),
  { maxRequests: 10, perMilliseconds: 1000, maxRPS: 10 }
);

const userManagement = rateLimit(
  axios.default.create({
    baseURL: "https://user-management.cloud.ibm.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  { maxRequests: 10, perMilliseconds: 1000, maxRPS: 10 }
);

module.exports = { iam, userManagement };
