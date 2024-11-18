import { rollTheDie } from '../utils/roll-the-dice.util';

export class RandomDie {
  constructor(public readonly sides: number = 6) {}

  rollOnce() {
    return rollTheDie(this.sides);
  }
  // this method's first parameter is args since it is our resolver.
  roll({ count }: { count: number }) {
    return new Array(count)
      .fill([])
      .map((die: number[]) => die.push(this.rollOnce()));
  }
}

export class RandomDieWithError {
  message = 'hi';

  rollOnce() {
    throw 'FakeError';
  }
}
