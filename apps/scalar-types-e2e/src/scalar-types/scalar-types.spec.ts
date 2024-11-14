import axios from 'axios';

describe('GET /graphql', () => {
  it('should return a random ID', async () => {
    const query = `{ genRandomId }`;

    const res = await axios.post(
      '/graphql',
      { query },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(typeof res.data.data.genRandomId).toBe('string');
  });

  it('should return a random mnemonic', async () => {
    const query = `{ genRandomMnemonic }`;

    const res = await axios.post(
      '/graphql',
      { query },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(res.data.data.genRandomMnemonic.split(' ').length).toBe(
      12,
    );
    expect(typeof res.data.data.genRandomMnemonic).toBe('string');
  });

  it('should return a boolean', async () => {
    const query = `{ isItNightOnTheServer }`;

    const res = await axios.post(
      '/graphql',
      { query },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(typeof res.data.data.isItNightOnTheServer).toBe('boolean');
  });

  it('should return the result of rolled dices', async () => {
    const query = `{ rollThreeDice }`;

    const res = await axios.post(
      '/graphql',
      { query },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(res.data.data.rollThreeDice.length).toBe(3);
    for (const die of res.data.data.rollThreeDice) {
      expect(Number.isInteger(die)).toBeTruthy();
    }
  });
});
