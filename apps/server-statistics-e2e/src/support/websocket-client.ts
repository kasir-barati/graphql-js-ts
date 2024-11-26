import { Client, createClient } from 'graphql-ws';
import WebSocket from 'ws';

export class WebsocketClient {
  private client: Client;

  constructor() {
    this.client = createClient({
      url: 'ws://localhost:4005/subscriptions',
      webSocketImpl: WebSocket,
      lazy: false,
    });
  }

  async *subscribe<ResponseType>(
    query: string,
    variables?: Record<string, unknown>,
  ): AsyncGenerator<ResponseType, void, unknown> {
    const subscription = this.client.iterate({
      query,
      variables, // Is this correct?
    });

    for await (const event of subscription) {
      yield event as ResponseType;
    }
  }
}