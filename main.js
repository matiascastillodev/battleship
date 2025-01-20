import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

// cell generation

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");
const gridSize = 10 * 10;

for (let i = 0; i < gridSize; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  playerBoard.appendChild(cell);
}

for (let i = 0; i < gridSize; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  computerBoard.appendChild(cell);
}

// game

const player = new Player();
const computer = new Player();
let currentTurn = null;

function getRandomCoord() {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function getRandomOrientation() {
  return Math.random() > 0.5 ? "horizontal" : "vertical";
}

function placeShipsRandomly(gameboard, boardElement) {
  const shipSizes = [1, 2, 3, 4, 5];
  shipSizes.forEach((size) => {
    let placed = false;
    while (!placed) {
      try {
        const ship = new Ship(size);
        const startCoord = getRandomCoord();
        const orientation = getRandomOrientation();
        gameboard.placeShip(ship, startCoord, orientation);
        placed = true;

        const [x, y] = startCoord;
        for (let i = 0; i < size; i++) {
          const coord = orientation === "horizontal" ? [x, y + i] : [x + i, y];
          const index = coord[0] * 10 + coord[1];
          const cell = boardElement.querySelector(
            `.cell[data-index="${index}"]`
          );
          if (cell) {
            cell.classList.add("ship");
          }
        }
      } catch (e) {}
    }
  });
}

placeShipsRandomly(player.gameboard, playerBoard);
placeShipsRandomly(computer.gameboard, computerBoard);

function clearGameboard(gameboard, boardElement) {
  gameboard.ships = [];
  gameboard.missedHits = [];
  boardElement.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("ship");
  });
}

document.querySelector("#randomize").addEventListener("click", () => {
  clearGameboard(player.gameboard, playerBoard);
  clearGameboard(computer.gameboard, computerBoard);
  placeShipsRandomly(player.gameboard, playerBoard);
  placeShipsRandomly(computer.gameboard, computerBoard);
});

function playTurn(coord) {
  if (currentTurn === "player") {
    const result = player.attack(computer.gameboard, coord);
    console.log(`Player attacks ${coord}: ${result}`);
    currentTurn = "computer";
  } else {
    const result = computer.randomAttack(player.gameboard);
    console.log("Computer attacks randomly:", result);
    currentTurn = "player";
  }
  checkGameOver();
}

function checkGameOver() {
  if (player.gameboard.areAllShipsSunk()) {
    console.log("Computer wins!");
    currentTurn = null;
  } else if (computer.gameboard.areAllShipsSunk()) {
    console.log("Player wins!");
    currentTurn = null;
  }
}

document.querySelectorAll("#computer-board .cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    if (currentTurn === "player") {
      const index = parseInt(cell.dataset.index);
      const x = Math.floor(index / 10);
      const y = index % 10;
      playTurn([x, y]);
    }
  });
});

document.getElementById("play-btn").addEventListener("click", () => {
  currentTurn = "player";
  console.log("Game started. Player's turn.");
});
