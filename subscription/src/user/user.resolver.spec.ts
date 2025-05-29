import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { PUBSUB_PROVIDER } from '../shared';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: PUBSUB_PROVIDER,
          useValue: {
            publish: jest.fn(),
            asyncIterableIterator: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should call userService.me', () => {
    const spy = jest.spyOn(resolver['userService'], 'me');

    resolver.me();

    expect(spy).toHaveBeenCalled();
  });

  it('should call userService.updateEmail', async () => {
    const spy = jest.spyOn(resolver['userService'], 'updateEmail');
    const userId = randomUUID();

    await resolver.updateEmail(userId, { email: 'some@abc.com' });

    expect(spy).toHaveBeenCalledWith(userId, 'some@abc.com');
  });

  it('should call userService.updateEmail', () => {
    const spy = jest.spyOn(resolver['userService'], 'onNotification');

    resolver.onNotification();

    expect(spy).toHaveBeenCalled();
  });
});
