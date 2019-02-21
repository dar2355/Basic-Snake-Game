class Snake {
  constructor(x, y, grid) {
    this.x = x;
    this.y = y;
    this.length = 5;
    this.direction = null;
    this.segments = [];
    this.grid = grid;
  }

  collidesWith(x, y) {
    return this.segments.some(
      ([sx, sy]) => `[${sx}, ${sy}]` === `[${x}, ${y}]`
    );
  }

  canMove(x, y) {
    if (this.collidesWith(x, y)) this.grid.stop();
    if (this.collidesWith(this.grid.fruit.x, this.grid.fruit.y)) {
      this.length += this.grid.fruit.value;
      this.grid.updateScore(this.grid.fruit.value);
      this.grid.fruit.place();
    }

    if (this.grid.layout[x][y] === "W") {
      this.grid.stop();
      return false;
    } else {
      return true;
    }
  }

  move(controller) {
    this.segments.push([this.x, this.y]);
    if (this.segments.length > this.length) this.segments.shift();

    if (controller.up && this.direction !== "down") this.moveUp();
    else if (controller.down && this.direction !== "up") this.moveDown();
    else if (controller.left && this.direction !== "right") this.moveLeft();
    else if (controller.right && this.direction !== "left") this.moveRight();
    else {
      switch (this.direction) {
        case "up":
          this.moveUp();
          break;
        case "down":
          this.moveDown();
          break;
        case "left":
          this.moveLeft();
          break;
        case "right":
          this.moveRight();
          break;
      }
    }
  }

  moveUp() {
    if (this.canMove(this.x, this.y - 1)) this.y -= 1;
    this.direction = "up";
  }

  moveDown() {
    if (this.canMove(this.x, this.y + 1)) this.y += 1;
    this.direction = "down";
  }

  moveLeft() {
    if (this.canMove(this.x - 1, this.y)) this.x -= 1;
    this.direction = "left";
  }

  moveRight() {
    if (this.canMove(this.x + 1, this.y)) this.x += 1;
    this.direction = "right";
  }
}

export { Snake };
