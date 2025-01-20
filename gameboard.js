class Gameboard {
  constructor() {
    this.ships = [];
    this.missedHits = [];
  }

  placeShip(ship, startCoord, orientation) {
    const [x, y] = startCoord;
    const shipCoords = [];

    for (let i = 0; i < ship.length; i++) {
      const coord = orientation === "horizontal" ? [x, y + i] : [x + i, y];
      shipCoords.push(coord);
    }

    const isValidPlacement = shipCoords.every(
      ([x, y]) =>
        x >= 0 &&
        x < 10 &&
        y >= 0 &&
        y < 10 &&
        !this.ships.some((s) =>
          s.coordinates.some(([sx, sy]) => sx === x && sy === y)
        )
    );

    if (!isValidPlacement) {
      throw new Error("Invalid Placement");
    }

    this.ships.push({ ship, coordinates: shipCoords });
  }

  receiveAttack(coord) {
    const [x, y] = coord;

    for (const shipObj of this.ships) {
      const hitIndex = shipObj.coordinates.findIndex(
        ([sx, sy]) => sx === x && sy === y
      );
      if (hitIndex !== -1) {
        shipObj.ship.hit();
        shipObj.coordinates.splice(hitIndex, 1);
        return "hit";
      }
    }

    this.missedHits.push(coord);
    return "miss";
  }

  areAllShipsSunk() {
    if (this.ships.every((shipObj) => shipObj.ship.isSunk())) {
      return true;
    } else {
      return false;
    }
  }
}

export { Gameboard };
