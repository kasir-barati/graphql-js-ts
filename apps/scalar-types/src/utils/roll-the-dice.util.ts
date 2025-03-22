export function rollTheDie(howManySidesDoTheDieHave = 6) {
  return 1 + Math.floor(Math.random() * howManySidesDoTheDieHave);
}
