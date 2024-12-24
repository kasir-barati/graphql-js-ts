import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    public readonly repository: Repository<Post>,
  ) {}

  findAllByUserIds(userIds: Readonly<string[]>) {
    return this.repository.find({ where: { authorId: In(userIds) } });
  }
}
