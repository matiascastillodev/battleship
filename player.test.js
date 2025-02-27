import { Player } from "./player.js";
import { Ship } from "./ship.js";

test("player can attack enemy's gameboard", () => {
  const player = new Player();
  const computer = new Player();

  const ship = new Ship(3);
  computer.gameboard.placeShip(ship, [0, 0], "horizontal");

  const result = player.attack(computer.gameboard, [0, 0]);
  expect(result).toBe("hit");
  expect(ship.hits).toBe(1);
});

test("computer makes a valid random attack", () => {
  const player = new Player();
  const computer = new Player();

  const ship = new Ship(3);
  player.gameboard.placeShip(ship, [0, 0], "horizontal");

  const result = computer.randomAttack(player.gameboard);
  expect(["hit", "miss"]).toContain(result);
});

test("computer does not make duplicate random attacks", () => {
  const player = new Player();
  const computer = new Player();

  const ship = new Ship(3);
  player.gameboard.placeShip(ship, [0, 0], "horizontal");

  const attackResults = new Set();
  for (let i = 0; i < 100; i++) {
    const result = computer.randomAttack(player.gameboard);
    attackResults.add(result);
  }

  expect(attackResults.size).toBeGreaterThan(1);
});
