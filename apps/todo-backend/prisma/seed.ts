import { getDbClient } from '../src/repositories/db-client';

(async () => {
  const dbClient = getDbClient();

  const user = await dbClient.user.create({
    data: {
      username: 'kasir-barati',
    },
    select: {
      id: true,
    },
  });
  await dbClient.todo.create({
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
