import { NestApplication } from '@nestjs/core';
import { FormattedExecutionResult } from 'graphql';
import { Client, createClient } from 'graphql-ws';
import { Server } from 'http';

export function getWebsocketClient(
  app: NestApplication,
  jwtToken?: string,
) {
  const httpServer = app.getHttpServer() as Server;
  const serverAddress = httpServer.address();

  if (typeof serverAddress === 'string' || serverAddress === null) {
    throw new Error('Invalid server address');
  }

  const port = serverAddress?.port ?? 3000;
  const websocketUrl = `ws://localhost:${port}/graphql`;

  return createClient({
    url: websocketUrl,
    webSocketImpl: WebSocket,
    connectionParams: {
      headers: {
        Authorization: 'bearer ' + jwtToken,
      },
    },
  });
}

export function subscribe<Response>(
  wsClient: Client,
  subscriptionQuery: string,
  variables?: Record<string, unknown>,
) {
  let subscriptionTimeout: NodeJS.Timeout;

  return new Promise<
    [FormattedExecutionResult<Response, unknown> | null, Error | null]
  >((resolve, reject) => {
    wsClient.subscribe<Response>(
      { query: subscriptionQuery, variables },
      {
        next: (data) => {
          clearTimeout(subscriptionTimeout);
          resolve([data, null]);
        },
        error: (err: Error) => resolve([null, err]),
        complete: () => console.log('Subscription completed'),
      },
    );

    // Timeout if no event is received
    subscriptionTimeout = setTimeout(() => {
      reject(new Error('Subscription timed out'));
    }, 5000);
  });
}
