import { Snake } from "./Snake";
import { Fruit } from "./Fruit";

const sampleLayout = `\
WWWWWWWWWWW
W         W
W         W
W         W
W         W
W         W
W         W
W         W
W         W
W         W
WWWWWWWWWWW`;

class Grid {
  constructor(canvas, layout, controller, scoretracker) {
    this.score = 0;
    this.scale = 90;
    this.speed = 100; // half of a second

    this.snake = null;
    this.fruit = null;

    this.ctx = canvas.getContext("2d");
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.layout = layout.split("\n").map(row => row.split(""));
    this.controller = controller;
    this.scoretracker = scoretracker;
  }

  // main game loop
  start() {
    this.updateScore(0);
    this.snake = new Snake(5, 5, this);
    this.fruit = new Fruit(1, this);
    this.active = true;

    this.gameLoop = setInterval(() => {
      this.snake.move(this.controller);

      requestAnimationFrame(() => {
        this.render();
      });
    }, this.speed);
  }

  render() {
    this.drawGrid();
    this.drawFruit();
    this.drawSnake();
  }

  stop() {
    this.active = false;
    console.log("stopped");
    clearInterval(this.gameLoop);
  }

  updateScore(change) {
    this.score += change;
    this.scoretracker.innerHTML = `${this.score}`.padStart(3, "0");
  }

  drawBlock(x, y) {
    this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
  }

  getColorAt(x, y) {
    switch (this.layout[x][y]) {
      case "W":
        return "#000000";
      default:
        if ((x % 2 === 1 && y % 2 === 0) || (x % 2 === 0 && y % 2 === 1))
          return "#EEEEEE";
        else return "#FFFFFF";
    }
  }

  drawFruit() {
    this.ctx.fillStyle = "#AA0000";
    this.drawBlock(this.fruit.x, this.fruit.y);
  }

  drawSnake() {
    this.ctx.fillStyle = "#00AA00";
    this.drawBlock(this.snake.x, this.snake.y);

    this.ctx.fillStyle = "#008800";
    for (const [x, y] of this.snake.segments) {
      this.drawBlock(x, y);
    }
  }

  drawGrid() {
    for (let i = 0; i < this.layout[0].length; i++) {
      for (let j = 0; j < this.layout.length; j++) {
        this.ctx.fillStyle = this.getColorAt(i, j);
        this.drawBlock(j, i);
      }
    }
  }
}

export { sampleLayout, Grid };
