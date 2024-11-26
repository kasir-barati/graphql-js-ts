import { NotNegativeNumber } from '../types/utility.type';

export function assertNotNegativeNumber(
  potentiallyNegative: number,
): asserts potentiallyNegative is NotNegativeNumber {
  if (potentiallyNegative < 0) {
    throw 'NegativeNumber';
  }
}
