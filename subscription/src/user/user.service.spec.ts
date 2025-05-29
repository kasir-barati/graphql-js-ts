import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { PUBSUB_PROVIDER } from '../shared';
import { PUBLISH_NOTIFICATION } from './user.constant';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<UserService>(UserService);
  });

  it('should return user info', () => {
    const res = service.me();

    expect(res).toStrictEqual({ id: expect.any(String) });
  });

  it('should be defined', async () => {
    const spy = jest.spyOn(service['pubsub'], 'publish');
    const userId = randomUUID();

    await service.updateEmail(userId, 'huh@yay.com');

    expect(spy).toHaveBeenCalledWith(PUBLISH_NOTIFICATION, {
      id: expect.any(String),
      message: `User ID ${userId} updated their email address, new email address is huh@yay.com`,
    });
  });

  it('should be defined', () => {
    const spy = jest.spyOn(
      service['pubsub'],
      'asyncIterableIterator',
    );

    service.onNotification();

    expect(spy).toHaveBeenCalledWith(PUBLISH_NOTIFICATION);
  });
});
