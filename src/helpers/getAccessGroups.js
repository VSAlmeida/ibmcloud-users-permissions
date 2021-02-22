const { iam } = require("../config/api");

const getAccessGroups = async (token, accountId, userId) => {
  return iam
    .get(`/v2/groups?account_id=${accountId}&iam_id=${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const groups = response.data.groups;
      return groups.map((group) => {
        return {
          name: group.name,
          description: group.description,
        };
      });
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

module.exports = getAccessGroups;
