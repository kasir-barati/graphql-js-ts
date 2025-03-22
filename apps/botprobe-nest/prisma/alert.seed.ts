import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

import { alertTypesIds } from './alert-type.seed';

let alertTypesIdsIndex = 0;

const dummyAlerts: Prisma.AlertCreateArgs['data'][] = new Array(
  1_000_000,
)
  .fill({})
  .map((_, index) => {
    if (alertTypesIdsIndex === alertTypesIds.length) {
      alertTypesIdsIndex = 0;
    }

    const alertTypeId = alertTypesIds[alertTypesIdsIndex++];

    return {
      title: 'alert title ' + (index + 1),
      userId: randomUUID(),
      description: 'alert description ' + (index + 1),
      alertTypeId,
    } satisfies Prisma.AlertCreateArgs['data'];
  });

export async function seedAlerts(prismaClient: PrismaClient) {
  if (await prismaClient.alert.findFirst({})) {
    return 'Alerts already have been seeded!';
  }

  await prismaClient.alert.createMany({ data: dummyAlerts as any });
  return 'Alerts seeded!';
}
