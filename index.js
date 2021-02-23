require("dotenv").config();
const prompt = require("readline-sync");
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

// Funcao principal
const start = async () => {
  // Verifica se as keys necessarias ja existem como variaveis de ambiente
  // Caso nao existam pede que sejam fornecidas pelo usuario
  const accountId = process.env.ACCOUNT_ID
    ? process.env.ACCOUNT_ID
    : prompt.question("Provide your Accound ID: ");

  const userName = process.env.USER_NAME
    ? process.env.USER_NAME
    : prompt.question("Provide your User Name: ");

  const apiKey = process.env.API_KEY
    ? process.env.API_KEY
    : prompt.question("Provide your API Key: ");

  const classicApiKey = process.env.CLASSIC_API_KEY
    ? process.env.CLASSIC_API_KEY
    : prompt.question("Provide your Classic Infra API Key: ");

  // Pega o Bearer Token
  const token = await getToken(apiKey);

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
      userName,
      classicApiKey,
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
