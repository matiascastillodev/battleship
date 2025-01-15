import { Ship } from "./ship.js";

test("creates a ship with a given length", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
});

test("hit() increments hits", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("hit() does not increment hits beyond length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  ship.hit(); // Exceeds length
  expect(ship.hits).toBe(2);
});

test("isSunk() returns true if hits >= length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("isSunk() returns false if hits < length", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
