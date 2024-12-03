import { Prisma, PrismaClient } from '@prisma/client';

const alertTypes: Prisma.AlertTypeCreateArgs['data'][] = [
  {
    description:
      'Sudden drops in pressure, unusual temperature changes, or VOC (Volatile Organic Compound) emissions.',
    name: 'leak-detection',
  },
  {
    description:
      'Detected via visual inspection, thermal imaging, or ultrasonic testing.',
    name: 'corrosion',
  },
  {
    description:
      'Detected via visual inspection, thermal imaging, or ultrasonic testing.',
    name: 'cracks',
  },
  {
    description: 'Pressure increases or flow rate reductions.',
    name: 'blockages',
  },
  {
    description:
      'Unauthorized equipment, vehicles, or personnel near pipelines.',
    name: 'encroachment',
  },
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
  return 'Alert types seeded!';
}
