import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { doesPathExist } from '@shared';
import { GraphQLResolveInfo } from 'graphql';
import { FindOneOptions, Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getPosts() {
    return this.postRepository.find({ take: 5 });
  }

  getUser(authorId: string, info: GraphQLResolveInfo) {
    const shouldJoinPosts = doesPathExist(
      ['author', 'posts'],
      info.fieldNodes,
    );
    const options: FindOneOptions<User> = { where: { id: authorId } };

    if (shouldJoinPosts) {
      options.relations = {
        posts: true,
      };
    }

    return this.userRepository.findOne(options);
  }
}
