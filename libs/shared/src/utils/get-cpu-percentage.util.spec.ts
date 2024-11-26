import { getCpuPercentage } from './get-cpu-percentage.util';

describe('getCpuPercentage', () => {
  it('should return how much free CPU do we have', async () => {
    const res = await getCpuPercentage('free');

    expect(typeof res).toBe('number');
    expect(res).toBeLessThanOrEqual(100);
    expect(res).toBeGreaterThanOrEqual(0);
  });

  it('should return how CPU is in use', async () => {
    const res = await getCpuPercentage('in-use');

    expect(typeof res).toBe('number');
    expect(res).toBeLessThanOrEqual(100);
    expect(res).toBeGreaterThanOrEqual(0);
  });
});
