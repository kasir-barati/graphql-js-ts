import { NotNegativeNumber } from '../types/utility.type';
import { assertNotNegativeNumber } from './assert-not-negative-number.util';

// JFYI: Here we've replaced conditions with polymorphism
// Learn more here: https://refactoring.guru/replace-conditional-with-polymorphism

/**
 * @description You can implement this abstract class to have other convertors.
 * @see KilobyteConvertor Ready to use convertor
 * @see MegabyteConvertor Ready to use convertor
 * @see GigabyteConvertor Ready to use convertor
 */
export abstract class MemoryUnitConvertor {
  abstract convert(memoryInBytes: number): NotNegativeNumber;
}
export class KilobyteConvertor extends MemoryUnitConvertor {
  override convert(memoryInBytes: number): NotNegativeNumber {
    const memory = Number((memoryInBytes / 1024).toFixed(2));

    assertNotNegativeNumber(memory);

    return memory;
  }
}
export class MegabyteConvertor extends MemoryUnitConvertor {
  override convert(memoryInBytes: number): NotNegativeNumber {
    const memory = Number((memoryInBytes / 1024 ** 2).toFixed(2));

    assertNotNegativeNumber(memory);

    return memory;
  }
}
export class GigabyteConvertor extends MemoryUnitConvertor {
  override convert(memoryInBytes: number): NotNegativeNumber {
    const memory = Number((memoryInBytes / 1024 ** 3).toFixed(2));

    assertNotNegativeNumber(memory);

    return memory;
  }
}
