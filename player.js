import { Gameboard } from "./gameboard.js";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  attack(enemyBoard, coord) {
    return enemyBoard.receiveAttack(coord);
  }

  randomAttack(enemyBoard) {
    let coord;
    do {
      coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } while (
      enemyBoard.missedHits.some(
        ([x, y]) => x === coord[0] && y === coord[1]
      ) ||
      enemyBoard.ships.some((shipObj) =>
        shipObj.coordinates.some(
          ([sx, sy]) => sx === coord[0] && sy === coord[1]
        )
      )
    );

    return this.attack(enemyBoard, coord);
  }
}

export { Player };
