import axios from 'axios';

describe('AppResolver (e2e)', () => {
  it('should return "Hello API"', async () => {
    const query = /* GraphQL */ `
      query {
        getData
      }
    `;

    const res = await axios.post('/graphql', { query });

    expect(res.status).toBe(200);
    expect(res.data).toStrictEqual({
      data: { getData: 'Hello API' },
    });
  });

  it('should return all robots', async () => {
    const query = /* GraphQL */ `
      query {
        robots {
          name
          ... on HumanoidRobot {
            height
          }
          ... on ScaraRobot {
            axes
          }
        }
      }
    `;

    const res = await axios.post('/graphql', { query });

    expect(res.status).toBe(200);
    expect(res.data.data.robots).toIncludeSameMembers([
      { name: 'Humaniod robot', height: 180 },
      { name: 'SCARA Robot', axes: 4 },
    ]);
  });
});
