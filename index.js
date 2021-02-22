require("dotenv").config();
const { getToken, getUsers, getAccessGroups, ProgressBar } = require("./src");
const progress = new ProgressBar("Getting Permissions");

const accountId = process.env.ACCOUNT_ID;

const start = async () => {
  console.log("Getting users account");
  const token = await getToken(process.env.API_KEY);
  const users = await getUsers(token, accountId);
  const total = users.length;
  let currentProgress = 0;

  console.log(`Were found ${total} users`);
  progress.init(total);

  let permissions = users.map(async (user) => {
    const access_groups = await getAccessGroups(token, accountId, user.user_id);
    user.access_groups = access_groups;
    currentProgress++;
    progress.update(currentProgress);
    return user;
  });

  permissions = await Promise.all(permissions);
  console.log(permissions);
};

start();
