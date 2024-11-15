import axios from 'axios';

describe('POST /graphql', () => {
  const profileId = '15f3920f-a56e-4997-9763-09283dfbe36a';

  it('should return profile with only an id name', async () => {
    const query = /* GraphQL */ `
      query GetProfile($id: ID!) {
        getProfile(id: $id) {
          id
          name
        }
      }
    `;

    const res = await axios.post(
      '/graphql',
      {
        query,
        variables: { id: profileId },
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(res.data).toMatchSnapshot();
  });

  it('should create profile and return id + name', async () => {
    // This must be called query, no matter it is a mutation or query
    const query = /* GraphQL */ `
      mutation CreateProfile($input: ProfileInput) {
        createProfile(input: $input) {
          id
          name
        }
      }
    `;

    const res = await axios.post(
      '/graphql',
      { query, variables: { input: { name: 'Mohammad Jawad' } } },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(res.data.data.createProfile).toStrictEqual({
      id: expect.any(String),
      name: 'Mohammad Jawad',
    });
  });

  it('should update profile and return id, name, email', async () => {
    // This must be called query, no matter it is a mutation or query
    const query = /* GraphQL */ `
      mutation UpdateProfile($id: ID!, $input: ProfileInput) {
        updateProfile(id: $id, input: $input) {
          id
          name
          email
        }
      }
    `;

    const res = await axios.post(
      '/graphql',
      {
        query,
        variables: {
          id: profileId,
          input: {
            name: 'Mohammad Jawad (Kasir)',
            email: 'new@fancy.email',
          },
        },
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    expect(res.status).toBe(200);
    expect(res.data.data.updateProfile).toStrictEqual({
      id: profileId,
      name: 'Mohammad Jawad (Kasir)',
      email: 'new@fancy.email',
    });
  });
});
