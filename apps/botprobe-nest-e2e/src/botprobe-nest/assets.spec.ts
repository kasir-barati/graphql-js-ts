import axios from 'axios';

describe('POST /graphql', () => {
  it('should return all the alarms', async () => {
    const query = `#graphql
      query GetAlarms() {}
    `;

    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
