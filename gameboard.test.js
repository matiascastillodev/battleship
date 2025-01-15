import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

test("places a ship at specific coordinates", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");
  expect(board.ships[0].coordinates).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test("receiveAttack records a hit", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");
  expect(board.receiveAttack([0, 1])).toBe("hit");
  expect(ship.hits).toBe(1);
});

test("receiveAttack records a miss", () => {
  const board = new Gameboard();
  expect(board.receiveAttack([5, 5])).toBe("miss");
  expect(board.missedHits).toContainEqual([5, 5]);
});

test("areAllShipsSunk returns true if all ships are sunk", () => {
  const board = new Gameboard();
  const ship = new Ship(1);
  board.placeShip(ship, [0, 0], "horizontal");
  board.receiveAttack([0, 0]);
  expect(board.areAllShipsSunk()).toBe(true);
});
