const { iam } = require("../config/api");

// Gera o Bearer Token
const getToken = (apiKey) => {
  return iam
    .post(
      `/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`
    )
    .then((response) => {
      return response.data.access_token;
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

module.exports = getToken;
