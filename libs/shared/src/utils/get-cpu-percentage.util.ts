import { getCpuInfo } from './get-cpu-info.util';

export function getCpuPercentage(cpuState: 'free' | 'in-use') {
  const cpuInfo1 = getCpuInfo();
  return new Promise<number>((resolve, _reject) => {
    setTimeout(() => {
      const cpuInfo2 = getCpuInfo();
      const idle = cpuInfo2.idle - cpuInfo1.idle;
      const total = cpuInfo2.total - cpuInfo1.total;
      const percentage = idle / total;

      if (cpuState === 'free') {
        resolve(Math.ceil(percentage * 100));
      } else {
        const inUse = 100 - Math.ceil(percentage * 100);
        resolve(inUse);
      }
    }, 1000);
  });
}
