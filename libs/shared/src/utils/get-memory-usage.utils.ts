import { freemem, totalmem } from 'os';

import { NotNegativeNumber } from '../types/utility.type';
import { assertNotNegativeNumber } from './assert-not-negative-number.util';
import { MemoryUnitConvertor } from './memory-unit-convertor.util';

interface Get {
  /**@description Memory usage in bytes */
  usedMemory: NotNegativeNumber;
  /**@description Total memory in bytes */
  totalMemory: NotNegativeNumber;
}

/**@return memory usage in bytes */
function getMemoryUsage(): Get;
/**@return converted memory usage */
function getMemoryUsage(unitConvertor?: MemoryUnitConvertor): Get;
function getMemoryUsage(unitConvertor?: MemoryUnitConvertor): Get {
  const usedMemory = totalmem() - freemem();
  const totalMemory = totalmem();

  if (unitConvertor) {
    const convertedUsedMemory = unitConvertor.convert(usedMemory);
    const convertedTotalMemory = unitConvertor.convert(totalMemory);

    return {
      usedMemory: convertedUsedMemory,
      totalMemory: convertedTotalMemory,
    };
  }

  assertNotNegativeNumber(usedMemory);
  assertNotNegativeNumber(totalMemory);

  return {
    usedMemory,
    totalMemory,
  };
}

export { getMemoryUsage };
