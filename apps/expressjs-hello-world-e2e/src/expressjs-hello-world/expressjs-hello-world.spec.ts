import axios from 'axios';

describe('GET /', () => {
  it('should return "Hello world"', async () => {
    const query = `{ hello }`;

    // http://localhost:4000/graphql
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
    expect(res.data).toMatchSnapshot();
  });
});
