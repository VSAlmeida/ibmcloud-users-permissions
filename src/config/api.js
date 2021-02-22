const axios = require("axios");

const iam = axios.default.create({
  baseURL: "https://iam.cloud.ibm.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

const userManagement = axios.default.create({
  baseURL: "https://user-management.cloud.ibm.com",
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = { iam, userManagement };
