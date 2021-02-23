require("dotenv").config();
const {
  getToken,
  getUsers,
  ProgressBar,
  exportUsers,
  getAccessGroups,
  getAccessPolicies,
  getClassicInfraPermissions,
} = require("./src");
const progress = new ProgressBar("Getting Permissions");

const accountId = process.env.ACCOUNT_ID;

// Funcao principal
const start = async () => {
  const token = await getToken(process.env.API_KEY);

  // Pega os usuarios da conta
  console.log("Getting users account");
  const users = await getUsers(token, accountId);
  const total = users.length;
  console.log(`Were found ${total} users`);

  // Inicia a barra de progresso no terminal
  let currentProgress = 0;
  progress.init(total);

  // Mapeia os usuarios e pega as informacoes de permissao deles
  // Cada item desta lista retonar uma promise
  const permissions = users.map(async (user) => {
    // Gera uma promise para cada metodo de permissao
    // E dispara requisicoes simultaneas
    let access_groups = getAccessGroups(token, accountId, user.iam_id);
    let classic_infra = getClassicInfraPermissions(
      process.env.USER_NAME,
      process.env.CLASSIC_API_KEY,
      user.email
    );
    let access_policeis = getAccessPolicies(token, accountId, user.iam_id);

    // Espera as promises terminarem de executar
    access_groups = await Promise.resolve(access_groups);
    access_policeis = await Promise.resolve(access_policeis);
    classic_infra = await Promise.resolve(classic_infra);

    // Adiciona as permissoes no json do usuario
    user.access_groups = access_groups;
    user.access_policeis = access_policeis;
    user.classic_infra = classic_infra;

    // Atualiza a barra de progresso
    currentProgress++;
    progress.update(currentProgress);
    return user;
  });

  // Espera todas as promises terminarem de executar
  const userPermissions = await Promise.all(permissions);
  console.log("Success! All data were obtained successfully");

  // Exporta as infos para o excel
  exportUsers(userPermissions);
};

start();
