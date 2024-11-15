import { rollTheDie } from '../utils/roll-the-dice.util';

export class RandomDie {
  constructor(public readonly sides: number = 6) {}

  rollOnce() {
    return rollTheDie(this.sides);
  }
  roll(count: number) {
    return new Array(count)
      .fill([])
      .map((die: number[]) => die.push(this.rollOnce()));
  }
}
