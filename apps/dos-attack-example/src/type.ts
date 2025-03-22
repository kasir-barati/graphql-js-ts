import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';

export interface Context {
  postRepository: Repository<Post>;
}
