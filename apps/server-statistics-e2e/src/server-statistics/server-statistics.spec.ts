import { WebsocketClient } from '@testing';
import { GreetResponse } from '../support/types/greet-response.type';
import {
  HtopResponse,
  TopResponse,
} from '../support/types/top-response.type';

describe('POST /graphql', () => {
  let graphqlWebsocketClient: WebsocketClient;

  beforeAll(() => {
    graphqlWebsocketClient = new WebsocketClient(
      'ws://localhost:4005/graphql',
    );
  });

  it('should subscribe to greetings of our server!', async () => {
    const query = `#graphql
      subscription { greet }
    `;
    const expectedGreetings = [
      'سلام',
      'Hi',
      'Hallo',
      'Grüß Gott',
      'Moin',
      'Ciao',
      'こにちは',
    ];

    for await (const greeting of graphqlWebsocketClient.subscribe<GreetResponse>(
      query,
    )) {
      expect(greeting.data.greet).toBe(expectedGreetings.shift());
    }
  });

  it('should subscribe to statistics of our server', async () => {
    const query = `#graphql
      subscription { top { cpu } }
    `;

    for await (const statistics of graphqlWebsocketClient.subscribe<TopResponse>(
      query,
    )) {
      expect(typeof statistics.data.top.cpu).toBe('number');
      break;
    }
  });

  it.each(['GB', 'MB', 'KB'])(
    'should subscribe to memory usage in %s of our server',
    async (unit) => {
      const query = `#graphql
        subscription SubscribeToMemoryUsage($unit: Unit) { 
          htop { 
            memory(unit: $unit)
          }
        }
      `;

      for await (const statistics of graphqlWebsocketClient.subscribe<HtopResponse>(
        query,
        { unit },
      )) {
        console.log(statistics.data);
        expect(typeof statistics.data.htop.memory).toBe('number');
        break;
      }
    },
  );
});
