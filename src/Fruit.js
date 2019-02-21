class Fruit {
  constructor(value, grid) {
    this.grid = grid;
    this.value = value;
    this.x = 0;
    this.y = 0;

    this.place();
  }

  place() {
    let limiter = 100;
    while (
      (this.grid.layout[this.x][this.y] === "W" ||
        this.grid.snake.collidesWith(this.x, this.y)) &&
      limiter > 0
    ) {
      this.x = Math.floor(Math.random() * this.grid.layout[0].length);
      this.y = Math.floor(Math.random() * this.grid.layout.length);
      limiter--;
    }
  }
}

export { Fruit };
