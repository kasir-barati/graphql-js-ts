import { cpus } from 'os';

export function getCpuInfo() {
  const logicalCoresInfo = cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  for (const cpu in logicalCoresInfo) {
    if (!logicalCoresInfo.hasOwnProperty(cpu)) {
      continue;
    }

    user += logicalCoresInfo[cpu].times.user;
    nice += logicalCoresInfo[cpu].times.nice;
    sys += logicalCoresInfo[cpu].times.sys;
    irq += logicalCoresInfo[cpu].times.irq;
    idle += logicalCoresInfo[cpu].times.idle;
  }

  const total = user + nice + sys + idle + irq;

  return {
    idle: idle,
    total: total,
  };
}
