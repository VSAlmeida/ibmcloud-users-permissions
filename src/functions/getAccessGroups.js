const { iam } = require("../config/api");

// Funcao responsavel por pegar os grupos de acesso
const getAccessGroups = async (token, accountId, iamId) => {
  return iam
    .get(`/v2/groups?account_id=${accountId}&iam_id=${iamId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const groups = response.data.groups;
      // Mapeia os grupos de acesso e retonar uma lista com jsons dentro
      // { name: "string", description: "string" }
      return groups.map((group) => {
        return {
          name: group.name,
          description: group.description,
        };
      });
    })
    .catch((error) => {
      throw new Error(JSON.stringify(error.response.data.errors));
    });
};

module.exports = getAccessGroups;
