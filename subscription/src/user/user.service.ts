import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PubSub } from 'graphql-subscriptions';

import { NotificationMessage, PUBSUB_PROVIDER } from '../shared';
import { PUBLISH_NOTIFICATION } from './user.constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(PUBSUB_PROVIDER) private readonly pubsub: PubSub,
  ) {}

  me() {
    return { id: randomUUID() };
  }

  async updateEmail(userId: string, email: string) {
    const message: NotificationMessage = {
      id: randomUUID(),
      message: `User ID ${userId} updated their email address, new email address is ${email}`,
    };

    await this.pubsub.publish(PUBLISH_NOTIFICATION, message);
  }

  onNotification() {
    return this.pubsub.asyncIterableIterator<NotificationMessage>(
      PUBLISH_NOTIFICATION,
    );
  }
}
