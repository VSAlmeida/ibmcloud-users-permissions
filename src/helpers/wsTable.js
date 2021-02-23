const { titleStyles, headerStyles, rowStyles } = require("./wsStyles");

// Funcao responsavel por criar as tabelas
const wsTable = (ws, title, startRowIndex, rows, startColumnIndex, headers) => {
  let currentRowIndex = startRowIndex;
  let currentColumnIndex = startColumnIndex;

  // Cria o titulo da tabela
  ws.cell(
    currentRowIndex - 1,
    currentColumnIndex,
    currentRowIndex - 1,
    currentColumnIndex + 5,
    true
  )
    .string(title)
    .style(titleStyles);

  // Cria o header da tabela
  headers.forEach((header, index) => {
    currentColumnIndex += index;
    ws.cell(
      currentRowIndex,
      currentColumnIndex,
      currentRowIndex,
      currentColumnIndex + 2,
      true
    )
      .string(`${header.header}`)
      .style(headerStyles);
    currentColumnIndex += 2;
  });

  currentRowIndex++;

  // Cria as linhas da tabela
  rows.forEach((row, rowIndex) => {
    currentColumnIndex = startColumnIndex;
    Object.keys(row).forEach((cell, cellIndex) => {
      ws.cell(
        currentRowIndex + rowIndex,
        currentColumnIndex + cellIndex,
        currentRowIndex + rowIndex,
        currentColumnIndex + cellIndex + 2,
        true
      )
        .string(`${row[cell]}`)
        .style(rowStyles);
      ws.row(currentRowIndex + rowIndex).setHeight(60);
      currentColumnIndex += 2;
    });
  });
};

module.exports = wsTable;
