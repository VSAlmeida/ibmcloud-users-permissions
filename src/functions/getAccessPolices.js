const { iam } = require("../config/api");

const getAccessPolicies = async (token, accountId, iamId) => {
  return iam
    .get(`/v1/policies?account_id=${accountId}&iam_id=${iamId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const policies = response.data.policies;
      return policies.map((policie) => {
        let roles = "";
        let resources = "";
        policie.roles.forEach((role) => {
          roles += `${role.display_name}, `;
        });

        policie.resources[0].attributes.map((attribute) => {
          if (attribute.name !== "accountId") {
            resources += `${attribute.name} ${attribute.operator} ${attribute.value}, `;
          }
        });

        roles = roles.slice(0, -2);
        resources = resources.slice(0, -2);
        return {
          roles,
          resources,
        };
      });
    })
    .catch((error) => {
      throw new Error(JSON.stringify(error.response.data.errors));
    });
};

module.exports = getAccessPolicies;
