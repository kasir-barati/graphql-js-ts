import { PrismaClient } from '@prisma/client';
import { seedAlertTypes } from './alert-type.seed';

(async () => {
  const prismaClient = new PrismaClient();

  console.log(await seedAlertTypes(prismaClient));
})()
  .then()
  .catch(console.error);
