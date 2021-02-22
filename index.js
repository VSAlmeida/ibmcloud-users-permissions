require("dotenv").config();
const { getToken, getUsers, getAccessGroups } = require("./src");

const accountId = process.env.ACCOUNT_ID;

const start = async () => {
  const token = await getToken(process.env.API_KEY);
  const users = await getUsers(token, accountId);

  let permissions = users.map(async (user) => {
    const access_groups = await getAccessGroups(token, accountId, user.user_id);
    user.access_groups = access_groups;
    return user;
  });

  permissions = await Promise.all(permissions);
  console.log(permissions);
};

start();
