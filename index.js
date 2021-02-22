const { getToken, getUsers } = require("./src");
require("dotenv").config();

const accountId = process.env.ACCOUNT_ID;

const start = async () => {
  const token = await getToken(process.env.API_KEY);
  const users = await getUsers(token, accountId);

  users.forEach((user) => {
    console.log(user.user_id);
  });
};

start();
