const excel = require("excel4node");
const wb = new excel.Workbook();

// Cria os estilos do titulo da tabela
const titleStyles = wb.createStyle({
  font: {
    color: "#FFFFFF",
    size: 16,
  },
  border: {
    left: {
      style: "thin",
      color: "black",
    },
    right: {
      style: "thin",
      color: "black",
    },
    top: {
      style: "thin",
      color: "black",
    },
    bottom: {
      style: "thin",
      color: "black",
    },
    outline: false,
  },
  fill: {
    type: "pattern",
    patternType: "solid",
    bgColor: "#222B35",
    fgColor: "#222B35",
  },
  alignment: {
    vertical: "center",
    horizontal: "center",
  },
});

// Cria os estilos do header da tabela
const headerStyles = wb.createStyle({
  font: {
    color: "#FFFFFF",
    size: 14,
  },
  border: {
    left: {
      style: "thin",
      color: "black",
    },
    right: {
      style: "thin",
      color: "black",
    },
    top: {
      style: "thin",
      color: "black",
    },
    bottom: {
      style: "thin",
      color: "black",
    },
    outline: false,
  },
  fill: {
    type: "pattern",
    patternType: "solid",
    bgColor: "#222B35",
    fgColor: "#222B35",
  },
  alignment: {
    vertical: "center",
  },
});

// Cria os estilos dos linhas da tabela
const rowStyles = wb.createStyle({
  font: {
    size: 12,
  },
  border: {
    left: {
      style: "thin",
      color: "black",
    },
    right: {
      style: "thin",
      color: "black",
    },
    top: {
      style: "thin",
      color: "black",
    },
    bottom: {
      style: "thin",
      color: "black",
    },
    outline: false,
  },
  alignment: {
    vertical: "center",
    wrapText: true,
  },
});

module.exports = {
  titleStyles,
  rowStyles,
  headerStyles,
};
