function renderBoard(board, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous rendering

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coord = `${x},${y}`;

      if (board.missedHits.some(([mx, my]) => mx === x && my === y)) {
        cell.classList.add("miss");
      } else if (
        board.ships.some((shipObj) =>
          shipObj.coordinates.some(([sx, sy]) => sx === x && sy === y)
        )
      ) {
        cell.classList.add("ship");
      }

      container.appendChild(cell);
    }
  }
}

import { GameController } from "./main.js";

const gameController = new GameController();
gameController.initializeGame();

renderBoard(gameController.player.gameboard, "player-board");
renderBoard(gameController.computer.gameboard, "computer-board");

document.getElementById("computer-board").addEventListener("click", (event) => {
  if (!event.target.classList.contains("cell")) return;

  const coord = event.target.dataset.coord.split(",").map(Number);
  gameController.playTurn(coord);
  renderBoard(gameController.player.gameboard, "player-board");
  renderBoard(gameController.computer.gameboard, "computer-board");
});
