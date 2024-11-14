export function rollTheDie(howManySidesDoTheDieHave: number = 6) {
  return 1 + Math.floor(Math.random() * howManySidesDoTheDieHave);
}
