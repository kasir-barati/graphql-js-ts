import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { StartedRedisContainer } from '@testcontainers/redis';
import { Client } from 'graphql-ws';
import * as request from 'supertest';

import { UserModule } from '../src/user/user.module';
import {
  createRedisContainer,
  getDefaultModules,
  getDefaultProviders,
  getWebsocketClient,
  sleep,
  subscribe,
} from './utils';

describe('UserResolver (e2e)', () => {
  let app: NestApplication;
  let redis: StartedRedisContainer;
  let client!: Client;

  beforeAll(async () => {
    redis = await createRedisContainer();
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [...getDefaultModules(), UserModule],
        providers: getDefaultProviders(),
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.listen(0); // Dynamic port allocation
  });

  afterAll(async () => {
    await client?.dispose();
    await app?.close();
    await redis?.stop({ remove: true });
  });

  it('should receive the email notification when we call updateEmail mutation', async () => {
    // Arrange
    const updateEmailMutation = /* GraphQL */ `
      query {
        me {
          id
        }
      }
    `;

    // Act
    const { status, body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: updateEmailMutation });

    // Assert
    expect(status).toBe(200);
    expect(body).toStrictEqual({
      data: { me: { id: expect.any(String) } },
    });
  });

  it('should receive the email notification when we call updateEmail mutation', async () => {
    // Arrange
    const updateEmailMutation = /* GraphQL */ `
      mutation {
        updateEmail(
          userId: "228fc97c-b16c-4ba0-8ff6-0a2c6548417d"
          input: { email: "some@gmail.com" }
        )
      }
    `;

    // Act
    const { status, body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: updateEmailMutation });

    // Assert
    expect(status).toBe(200);
    expect(body).toStrictEqual({
      data: { updateEmail: 0 },
    });
  });

  it('should receive the email notification when we call updateEmail mutation', async () => {
    // Arrange
    const updateEmailMutation = /* GraphQL */ `
      mutation {
        updateEmail(
          userId: "228fc97c-b16c-4ba0-8ff6-0a2c6548417d"
          input: { email: "some@gmail.com" }
        )
      }
    `;
    const onNotificationSubscription = /* GraphQL */ `
      subscription {
        onNotification {
          id
          message
        }
      }
    `;
    const wsClient = getWebsocketClient(app);

    // Act
    const subscriptionPromise = subscribe(
      wsClient,
      onNotificationSubscription,
    );
    await sleep();
    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: updateEmailMutation });

    // Assert
    const [eventData] = await subscriptionPromise;
    expect(eventData).toStrictEqual({
      data: {
        onNotification: {
          id: expect.any(String),
          message:
            'User ID 228fc97c-b16c-4ba0-8ff6-0a2c6548417d updated their email address, new email address is some@gmail.com',
        },
      },
    });
  });
});
