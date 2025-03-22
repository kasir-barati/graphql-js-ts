import { DataSource } from 'typeorm';

import { Post } from './app/entities/post.entity';
import { User } from './app/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Post, User],
  subscribers: [],
  migrations: [],
});
