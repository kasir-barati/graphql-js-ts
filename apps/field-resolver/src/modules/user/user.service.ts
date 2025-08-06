import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { UserType } from './types';

@Injectable()
export class UserService {
  findAll(): UserType[] {
    return [
      {
        id: randomUUID(),
        greetMe: { parentResolverMessage: "I've found all users" },
      },
    ];
  }

  findOne(id: string): UserType {
    return {
      id,
      greetMe: { parentResolverMessage: 'I returned the user' },
    };
  }
}
