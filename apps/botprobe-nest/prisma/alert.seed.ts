import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { alertTypesIds } from './alert-type.seed';

const dummyAlerts: Prisma.AlertCreateArgs['data'][] = new Array(
  1_000_000,
)
  .fill({})
  .map((_, index) => {
    let alertTypeId =
      alertTypesIds[Math.floor(Math.random() * 1_000_000) + 1];

    return {
      title: 'alert title ' + index + 1,
      userId: randomUUID(),
      description: 'alert description ' + index + 1,
      alertTypeId,
    } satisfies Prisma.AlertCreateArgs['data'];
  });

export async function seedAlertTypes(prismaClient: PrismaClient) {
  if (
    await prismaClient.alert.findFirst({
      where: { title: dummyAlerts[0].title },
    })
  ) {
    return 'Already have been seeded!';
  }

  await prismaClient.alert.createMany({ data: dummyAlerts as any });
  return 'Alert types seeded!';
}
