export function hasAtLeastOneOfTheseProperties<T>(
  obj: T,
  keys: Array<keyof T>,
) {
  for (const key of keys) {
    if (obj[key] !== undefined || obj[key] !== null) {
      return true;
    }
  }
  return false;
}

export function hasExactlyOneProperty<T>(
  obj: T,
  prop1: keyof T,
  prop2: keyof T,
) {
  // Equivalent to: Boolean(Boolean(obj[prop1]) ^ Boolean(obj[prop2]))
  return xor(obj[prop1], obj[prop2]);
}

function xor(a: unknown, b: unknown) {
  return !!a !== !!b;
}
