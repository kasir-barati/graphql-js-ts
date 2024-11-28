import { WebsocketClient } from '@testing';
import axios from 'axios';
import { TopResponse } from '../support/types/top-response.type';

describe('APP', () => {
  let websocketClient: WebsocketClient;

  beforeAll(() => {
    websocketClient = new WebsocketClient(
      'ws://localhost:4004/graphql',
    );
  });

  it('should return a message on GET /api', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });

  it('should return memory usage in gigabyte on POST /graphql', async () => {
    const query = `#graphql
      subscription {
        top {
          cpu(cpuState: FREE)
          memory(unit: GIGABYTE)
        }
      }
    `;

    for await (const statistics of websocketClient.subscribe<TopResponse>(
      query,
    )) {
      console.log(statistics.data.top);

      expect(typeof statistics.data.top.cpu).toBe('number');
      expect(typeof statistics.data.top.memory).toBe('number');

      break;
    }
  });
});
