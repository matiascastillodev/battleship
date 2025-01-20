import { Gameboard } from "./gameboard.js";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.attackedCoords = new Set();
  }

  attack(enemyBoard, coord) {
    const result = enemyBoard.receiveAttack(coord);
    this.attackedCoords.add(coord.toString());
    return result;
  }

  randomAttack(enemyBoard) {
    const allCoords = Array.from({ length: 10 }, (_, x) =>
      Array.from({ length: 10 }, (_, y) => [x, y])
    ).flat();

    const availableCoords = allCoords.filter(
      ([x, y]) => !this.attackedCoords.has([x, y].toString())
    );

    if (availableCoords.length === 0) {
      throw new Error("No available coordinates to attack");
    }

    const coord =
      availableCoords[Math.floor(Math.random() * availableCoords.length)];
    return this.attack(enemyBoard, coord);
  }
}

export { Player };
