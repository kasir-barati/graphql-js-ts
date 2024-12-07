import { PrismaClient } from '@prisma/client';
import { seedAlertTypes } from './alert-type.seed';
import { seedAlerts } from './alert.seed';

(async () => {
  const prismaClient = new PrismaClient();

  console.log(await seedAlertTypes(prismaClient));
  console.log(await seedAlerts(prismaClient));
})()
  .then()
  .catch(console.error);
