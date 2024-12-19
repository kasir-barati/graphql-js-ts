import { Post } from './app/entities/post.entity';
import { User } from './app/entities/user.entity';
import { AppDataSource } from './data-source';

(async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  if ((await userRepository.count()) > 0) {
    return 'Was seeded!';
  }

  const users = new Array<Partial<User>>(1000).fill({ posts: [] });
  const createdUsers = await userRepository.save(users);
  const usersIds = createdUsers.map((user) => user.id);

  for (const userId of usersIds) {
    const posts = new Array<Partial<Post>>(100).fill({
      authorId: userId,
    });

    await postRepository.save(posts);
  }

  await AppDataSource.destroy();
  return 'Seeded!';
})()
  .then(console.log)
  .catch(console.error);
