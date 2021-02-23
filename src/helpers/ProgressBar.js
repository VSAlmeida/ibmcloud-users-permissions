const { bgWhite } = require("chalk");

// Classe responsavel por criar a barra de progresso
module.exports = class ProgressBar {
  constructor(name) {
    this.total;
    this.current;
    this.name = name;
    this.bar_length = process.stdout.columns - (name.length + 14);
  }

  // Inicia a barra de progresso
  init(total) {
    this.total = total;
    this.current = 0;
    this.update(this.current);
  }

  // Atualiza a barra de progresso
  update(current) {
    this.current = current;
    const current_progress = this.current / this.total;
    this.draw(current_progress);
  }

  // Desenha a barra de progresso
  draw(current_progress) {
    const filled_bar_length = (current_progress * this.bar_length).toFixed(0);
    const empty_bar_length = this.bar_length - filled_bar_length;

    const filled_bar = this.get_bar(filled_bar_length, " ", bgWhite);
    const empty_bar = this.get_bar(empty_bar_length, "-");
    const percentage_progress = (current_progress * 100).toFixed(2);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `${this.name}: [${filled_bar}${empty_bar}] | ${percentage_progress}%`
    );
  }

  get_bar(length, char, color = (a) => a) {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += char;
    }
    return color(str);
  }
};
