require("dotenv").config();
const {
  getToken,
  getUsers,
  getAccessGroups,
  getClassicInfraPermissions,
  ProgressBar,
} = require("./src");
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
    let access_groups = getAccessGroups(token, accountId, user.user_id);
    let classic_infra = getClassicInfraPermissions(
      process.env.USER_NAME,
      process.env.CLASSIC_API_KEY,
      user.email
    );

    access_groups = await Promise.resolve(access_groups);
    classic_infra = await Promise.resolve(classic_infra);
    user.access_groups = access_groups;
    user.classic_infra = classic_infra;

    currentProgress++;
    progress.update(currentProgress);
    return user;
  });

  permissions = await Promise.all(permissions);
  console.log(permissions);
};

start();
