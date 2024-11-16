import axios from 'axios';

describe('POST /graphql', () => {
  it('should get a todo', async () => {
    const query = /* GraphQL */ `
      {
        getTodo(id: "eec5e3aa-7137-4c9c-a723-ec2f43d4daa4") {
          id
          content
        }
      }
    `;

    const res = await axios.post(`/graphql`, { query });

    console.log(res.data);

    expect(res.status).toBe(200);
    expect(res.data).toMatchSnapshot();
  });
});
