import { Player } from "./player.js";
import { Ship } from "./ship.js";

class GameController {
  constructor() {
    this.player = new Player();
    this.computer = new Player();
    this.currentTurn = "player";
  }

  initializeGame() {
    this.player.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");
    this.player.gameboard.placeShip(new Ship(2), [2, 2], "vertical");

    this.computer.gameboard.placeShip(new Ship(3), [5, 5], "horizontal");
    this.computer.gameboard.placeShip(new Ship(2), [7, 7], "vertical");
  }

  playTurn(coord = null) {
    if (this.currentTurn === "player") {
      const result = this.player.attack(this.computer.gameboard, coord);
      console.log(`Player attacks ${coord}: ${result}`);
    } else {
      const result = this.computer.randomAttack(this.player.gameboard);
      console.log("Computer attacks randomly:", result);
    }

    this.checkGameOver();
    this.currentTurn = this.currentTurn === "player" ? "computer" : "player";
  }

  checkGameOver() {
    if (this.player.gameboard.areAllShipsSunk()) {
      console.log("Computer wins!");
      this.endGame();
    } else if (this.computer.gameboard.areAllShipsSunk()) {
      console.log("Player wins!");
      this.endGame();
    }
  }

  endGame() {
    console.log("Game Over!");
    this.currentTurn = null;
  }
}

export { GameController };
