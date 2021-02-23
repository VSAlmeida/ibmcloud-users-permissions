const excel = require("excel4node");
const ProgressBar = require("../helpers/ProgressBar");
const createWsHeader = require("../helpers/wsHeader");
const createWsTable = require("../helpers/wsTable");
const { headerStyles, rowStyles } = require("../helpers/wsStyles");
const os = require("os");

const wb = new excel.Workbook({
  defaultFont: {
    size: 12,
    name: "IBM Plex Sans",
  },
});
const progress = new ProgressBar("Exporting Users");

// Caminho para a area de trabalho
const path = `${os.homedir()}\\Desktop\\users-permissions.xlsx`;

// Funcao responsavel por exportar os usuarios
const exportUsers = (users) => {
  // Cria um novo Worksheet com o nome Users
  const ws = wb.addWorksheet("Users");

  // Inicia a barra de progresso no terminal
  let currentProgress = 0;
  progress.init(users.length);

  // Cria o header do Worksheet
  createWsHeader(wb, ws);

  // Cria o header da tabela principal
  ws.cell(5, 2, 5, 4, true).string("User").style(headerStyles);
  ws.cell(5, 5, 5, 7, true).string("Email").style(headerStyles);
  ws.cell(5, 8, 5, 10, true).string("Status").style(headerStyles);

  // Mapeia os usuarios e percorre um por vez
  users.forEach((user, index) => {
    // Splita o nome do email do provedor do email
    const [mail, address] = user.email.split("@"); // exemple@ibm.com
    const row = index + 6;

    // Insere as linhas da pagina principal (Users)
    ws.cell(row, 2, row, 4, true)
      .formula(
        `=HYPERLINK("#${mail}!A1", "${user.firstname} ${user.lastname}")`
      )
      .style(rowStyles);
    ws.cell(row, 5, row, 7, true).string(user.email).style(rowStyles);
    ws.cell(row, 8, row, 10, true).string(user.state).style(rowStyles);

    // Cria um novo Worksheet com o nome do user currente
    const wsCurrentUser = wb.addWorksheet(mail);

    // Cria o header do Worksheet
    createWsHeader(wb, wsCurrentUser);

    let startRowIndex = 6;
    let startColumnIndex = 2;

    // Cria a tabela de grupos de acesso
    if (user.access_groups.length > 0) {
      createWsTable(
        wsCurrentUser,
        "Access Groups",
        startRowIndex,
        user.access_groups,
        startColumnIndex,
        [
          {
            header: "Group",
          },
          {
            header: "Description",
          },
        ]
      );
      startColumnIndex += 7;
    }

    // Cria a tabela de policas de acesso
    if (user.access_policeis.length > 0) {
      createWsTable(
        wsCurrentUser,
        "Access Policeis",
        startRowIndex,
        user.access_policeis,
        startColumnIndex,
        [
          {
            header: "Role",
          },
          {
            header: "Resource Attributes",
          },
        ]
      );
      startColumnIndex += 7;
    }

    // Cria a tabela de permissoes de infra classica
    if (user.classic_infra.length > 0) {
      createWsTable(
        wsCurrentUser,
        "Classic Infrastructure",
        startRowIndex,
        user.classic_infra,
        startColumnIndex,
        [
          {
            header: "Title",
          },
          {
            header: "Description",
          },
        ]
      );
    }

    // Atualiza a barra de progresso
    currentProgress++;
    progress.update(currentProgress);
  });

  // Cria o excel na area de trabalho
  wb.write(path);
  console.log(`Finished! Your export was saved in ${path}`);
};

module.exports = exportUsers;
