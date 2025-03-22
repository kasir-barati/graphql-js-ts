import { DataSource } from 'typeorm';

import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dos',
  password: 'dos',
  database: 'dos',
  synchronize: true,
  logging: true,
  entities: [Post, User],
  subscribers: [],
  migrations: [],
});
