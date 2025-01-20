import { Ship } from "./ship.js";
import { Player } from "./player.js";

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");
const gameInfo = document.querySelector("#game-info");
const gridSize = 10 * 10;

for (let i = 0; i < gridSize; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  playerBoard.appendChild(cell);
}

for (let i = 0; i < gridSize; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  computerBoard.appendChild(cell);
}

let player = new Player();
let computer = new Player();
let currentTurn = null;
let gameEnded = false;
const playerAttackedCoords = new Set();

function getRandomCoord() {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function getRandomOrientation() {
  return Math.random() > 0.5 ? "horizontal" : "vertical";
}

function placeShipsRandomly(gameboard, boardElement, isPlayerBoard = false) {
  const shipSizes = [5, 4, 3, 3, 2];
  shipSizes.forEach((size) => {
    let placed = false;
    while (!placed) {
      try {
        const ship = new Ship(size);
        const startCoord = getRandomCoord();
        const orientation = getRandomOrientation();
        gameboard.placeShip(ship, startCoord, orientation);
        placed = true;

        if (isPlayerBoard) {
          const [x, y] = startCoord;
          for (let i = 0; i < size; i++) {
            const coord =
              orientation === "horizontal" ? [x, y + i] : [x + i, y];
            const index = coord[0] * 10 + coord[1];
            const cell = boardElement.querySelector(
              `.cell[data-index="${index}"]`
            );
            if (cell) {
              cell.classList.add("ship");
            }
          }
        }
      } catch (e) {}
    }
  });
}

function clearGameboard(gameboard, boardElement) {
  gameboard.ships = [];
  gameboard.missedHits = [];
  boardElement.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("ship", "hit", "miss");
  });
  playerAttackedCoords.clear();
}

function playTurn(coord) {
  const coordString = coord.toString();
  if (currentTurn === "player" && !playerAttackedCoords.has(coordString)) {
    playerAttackedCoords.add(coordString);
    const { result } = player.attack(computer.gameboard, coord);
    updateBoard(computerBoard, coord, result);
    console.log(`Player attacks ${coord}: ${result}`);
    gameInfo.textContent = `Player attacks ${coord}: ${result}`;
    currentTurn = "computer";
    setTimeout(computerTurn, 1000); // Delay for computer's turn
  }
}

function computerTurn() {
  if (currentTurn === "computer") {
    const { coord, result } = computer.randomAttack(player.gameboard);
    console.log("Computer attacks randomly:", coord, result);
    gameInfo.textContent = `Computer attacks ${coord}: ${result}`;
    updateBoard(playerBoard, coord, result);
    currentTurn = "player";
    checkGameOver();
  }
}

function updateBoard(boardElement, coord, result) {
  const [x, y] = coord;
  const index = x * 10 + y;
  const cell = boardElement.querySelector(`.cell[data-index="${index}"]`);
  if (cell) {
    if (result === "hit") {
      cell.classList.add("hit");
    } else if (result === "miss") {
      cell.classList.add("miss");
    }
  }
}

function checkGameOver() {
  if (player.gameboard.areAllShipsSunk()) {
    console.log("Computer wins!");
    gameInfo.textContent = "Computer wins! Click 'Play' to start a new game.";
    currentTurn = null;
    gameEnded = true;
  } else if (computer.gameboard.areAllShipsSunk()) {
    console.log("Player wins!");
    gameInfo.textContent = "Player wins! Click 'Play' to start a new game.";
    currentTurn = null;
    gameEnded = true;
  }
}

document.querySelector("#randomize").addEventListener("click", () => {
  clearGameboard(player.gameboard, playerBoard);
  clearGameboard(computer.gameboard, computerBoard);
  placeShipsRandomly(player.gameboard, playerBoard, true);
  placeShipsRandomly(computer.gameboard, computerBoard);
  gameInfo.textContent = "Ships placed. Click 'Play' to start the game.";
});

document.querySelectorAll("#computer-board .cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    if (currentTurn === "player") {
      const index = parseInt(cell.dataset.index);
      const x = Math.floor(index / 10);
      const y = index % 10;
      playTurn([x, y]);
      checkGameOver();
    }
  });
});

document.getElementById("play-btn").addEventListener("click", () => {
  if (
    player.gameboard.ships.length === 0 ||
    computer.gameboard.ships.length === 0
  ) {
    gameInfo.textContent =
      "Please randomize ship placements before starting the game.";
    return;
  }

  if (currentTurn !== null || gameEnded) {
    // Reset the game to initial state
    clearGameboard(player.gameboard, playerBoard);
    clearGameboard(computer.gameboard, computerBoard);
    player = new Player();
    computer = new Player();
    currentTurn = null;
    gameEnded = false;
    gameInfo.textContent = "Game reset. Please randomize ship placements.";
    return;
  }

  currentTurn = "player";
  gameInfo.textContent = "Game started. Player's turn.";
});
