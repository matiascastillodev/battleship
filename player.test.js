import { Player } from "./player.js";
import { Ship } from "./ship.js";

test("player can attack enemy's gameboard", () => {
  const player = new Player();
  const enemy = new Player();

  const ship = new Ship(3);
  enemy.gameboard.placeShip(ship, [0, 0], "horizontal");

  const result = player.attack(enemy.gameboard, [0, 0]);
  expect(result).toBe("hit");
  expect(ship.hits).toBe(1);
});

test("computer makes a valid random attack", () => {
  const computer = new Player();
  const enemy = new Player();

  const ship = new Ship(3);
  enemy.gameboard.placeShip(ship, [0, 0], "horizontal");

  const result = computer.randomAttack(enemy.gameboard);
  expect(["hit", "miss"]).toContain(result);
});
