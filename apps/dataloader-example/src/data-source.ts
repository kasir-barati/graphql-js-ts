import { DataSource } from 'typeorm';

import { Post } from './post/entities/post.entity';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Post, User],
  subscribers: [],
  migrations: [],
});
