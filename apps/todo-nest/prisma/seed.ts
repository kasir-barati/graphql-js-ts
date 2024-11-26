import { PrismaClient } from '@prisma/client';

(async () => {
  const prismaClient = new PrismaClient();

  if (
    await prismaClient.user.findFirst({
      where: { username: 'kasir-barati' },
    })
  ) {
    console.log('Already have been seeded!');
    return;
  }

  const user = await prismaClient.user.create({
    data: {
      username: 'kasir-barati',
    },
    select: {
      id: true,
    },
  });
  await prismaClient.todo.create({
    data: {
      id: 'eec5e3aa-7137-4c9c-a723-ec2f43d4daa4',
      title: 'Seeded todo',
      createdById: user.id,
      content: 'Some content',
    },
  });
})()
  .then()
  .catch(console.error);
