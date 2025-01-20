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

test("throws error for invalid ship placement", () => {
  const board = new Gameboard();
  const ship = new Ship(3);

  expect(() => board.placeShip(ship, [9, 9], "horizontal")).toThrow(
    "Invalid Placement"
  );

  expect(() => board.placeShip(ship, [0, 0], "horizontal")).not.toThrow();

  expect(() => board.placeShip(ship, [0, 1], "horizontal")).toThrow(
    "Invalid Placement"
  );
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

test("receiveAttack does not record duplicate hits", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");
  expect(board.receiveAttack([0, 0])).toBe("hit");
  expect(board.receiveAttack([0, 0])).toBe("miss");
  expect(ship.hits).toBe(1);
});

test("areAllShipsSunk returns true if all ships are sunk", () => {
  const board = new Gameboard();
  const ship = new Ship(1);
  board.placeShip(ship, [0, 0], "horizontal");
  board.receiveAttack([0, 0]);
  expect(board.areAllShipsSunk()).toBe(true);
});
