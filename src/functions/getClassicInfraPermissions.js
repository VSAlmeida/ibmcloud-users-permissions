const { classic } = require("../config/api");

// Funcao responsavel por pegar as permissoes de infra classic
const getClassicInfraPermissions = async (userName, apiKey, email) => {
  return classic
    .get(
      `/SoftLayer_Account/getPermissionRoles.json?objectMask=mask[actions,users]&objectFilter={"permissionRoles":{"users":{"email":{"operation": "${email}"}}}}`,
      {
        auth: {
          username: userName,
          password: apiKey,
        },
      }
    )
    .then((response) => {
      const permissions = response.data[0].actions;
      // Mapeia as permissoes de infra classic e retonar uma lista com jsons dentro
      // { name: "string", description: "string" }
      return permissions.map((permission) => {
        return {
          name: permission.name,
          description: permission.description,
        };
      });
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.response.data);
    });
};

module.exports = getClassicInfraPermissions;
