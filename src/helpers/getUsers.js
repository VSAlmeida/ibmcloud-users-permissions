const { userManagement } = require("../config/api");

const getUsers = async (token, accountId, nextUrl) => {
  const query = nextUrl ? nextUrl : `/v2/accounts/${accountId}/users`;
  const response = await userManagement
    .get(query, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
  const next = response.data.next_url;
  const data = response.data.resources;

  if (next) {
    return data.concat(await getUsers(token, accountId, next));
  } else {
    return data;
  }
};

module.exports = getUsers;
