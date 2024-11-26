import { getMemoryUsage } from './get-memory-usage.utils';
import {
  GigabyteConvertor,
  KilobyteConvertor,
  MegabyteConvertor,
} from './memory-unit-convertor.util';

describe('getMemoryUsage', () => {
  it('should return memory usage in bytes', () => {
    const memory = getMemoryUsage();

    expect(memory).toStrictEqual({
      totalMemory: expect.any(Number),
      usedMemory: expect.any(Number),
    });
  });
  it('should return memory usage in kb', () => {
    const memory = getMemoryUsage(new KilobyteConvertor());

    expect(memory).toStrictEqual({
      totalMemory: expect.any(Number),
      usedMemory: expect.any(Number),
    });
  });

  it('should return memory usage in mb', () => {
    const memory = getMemoryUsage(new MegabyteConvertor());

    expect(memory).toStrictEqual({
      totalMemory: expect.any(Number),
      usedMemory: expect.any(Number),
    });
  });

  it('should return memory usage in gb', () => {
    const memory = getMemoryUsage(new GigabyteConvertor());

    expect(memory).toStrictEqual({
      totalMemory: expect.any(Number),
      usedMemory: expect.any(Number),
    });
  });
});
