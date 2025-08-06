import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { UserType } from './types';

@Injectable()
export class UserService {
  findAll(): UserType[] {
    return [{ id: randomUUID(), greetMe: { someField: 'Find All' } }];
  }

  findOne(id: string): UserType {
    return { id, greetMe: { someField: 'Find One' } };
  }
}
