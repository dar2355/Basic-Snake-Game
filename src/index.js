import { Grid, sampleLayout } from "./Grid";
import "./styles.css";

const keysDown = {
  up: false,
  down: false,
  left: false,
  right: false
};

document.onkeydown = e => {
  switch (e.key) {
    case "ArrowUp":
      keysDown.up = true;
      break;
    case "ArrowDown":
      keysDown.down = true;
      break;
    case "ArrowLeft":
      keysDown.left = true;
      break;
    case "ArrowRight":
      keysDown.right = true;
      break;
  }
};

document.onkeyup = e => {
  switch (e.key) {
    case "ArrowUp":
      keysDown.up = false;
      break;
    case "ArrowDown":
      keysDown.down = false;
      break;
    case "ArrowLeft":
      keysDown.left = false;
      break;
    case "ArrowRight":
      keysDown.right = false;
      break;
  }
};

const score = document.getElementById("score");
const starter = document.getElementById("game-start");
let grid;

starter.onclick = () => {
  if (grid) grid.stop();

  grid = new Grid(
    document.getElementById("game"),
    sampleLayout,
    keysDown,
    score
  );

  grid.start();
};
//grid.drawGrid();
