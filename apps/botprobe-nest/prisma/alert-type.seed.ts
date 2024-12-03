import { Prisma, PrismaClient } from '@prisma/client';

const alertTypes: Prisma.AlertTypeCreateArgs['data'][] = [
  {
    id: '8f55cefb-402d-4615-9025-548f76362c27',
    description:
      'Sudden drops in pressure, unusual temperature changes, or VOC (Volatile Organic Compound) emissions.',
    name: 'leak-detection',
  },
  {
    id: '6faf44db-10bb-4a15-8e81-29b1beaee5c6',
    description:
      'Detected via visual inspection, thermal imaging, or ultrasonic testing.',
    name: 'corrosion',
  },
  {
    id: 'e6d74f10-c0a0-413a-a5e7-a898f55aa7e8',
    description:
      'Detected via visual inspection, thermal imaging, or ultrasonic testing.',
    name: 'cracks',
  },
  {
    id: 'e062a62e-35d5-40ae-9986-4778e1667dd8',
    description: 'Pressure increases or flow rate reductions.',
    name: 'blockages',
  },
  {
    id: '7e36d0fa-bbdd-4dcd-997e-d4753bbb8819',
    description:
      'Unauthorized equipment, vehicles, or personnel near pipelines.',
    name: 'encroachment',
  },
];

const dummyAlertTypes: Prisma.AlertTypeCreateArgs['data'][] =
  new Array(1_000_000).fill({}).map((_, index) => {
    return {
      name: 'Dummy alert type name ' + index + 1,
      description: 'Dummy alert type description' + index + 1,
    } satisfies Prisma.AlertTypeCreateArgs['data'];
  });

export const alertTypesIds = [
  ...alertTypes.map((alertType) => alertType.id!),
  ...dummyAlertTypes.map((alertType) => alertType.id!),
];

export async function seedAlertTypes(prismaClient: PrismaClient) {
  if (
    await prismaClient.alertType.findFirst({
      where: { name: alertTypes[0].name },
    })
  ) {
    return 'Already have been seeded!';
  }

  await prismaClient.alertType.createMany({ data: alertTypes });
  await prismaClient.alertType.createMany({ data: dummyAlertTypes });
  return 'Alert types seeded!';
}
