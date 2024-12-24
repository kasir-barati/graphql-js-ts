import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    public readonly repository: Repository<User>,
  ) {}

  findAllByIds(ids: readonly string[]) {
    return this.repository.find({ where: { id: In(ids) } });
  }
}
