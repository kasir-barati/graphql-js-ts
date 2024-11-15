import axios from 'axios';

/**
 * @description Its objective is to make my e2e tests repeatable not matter how many times.
 */
export async function cleanup() {
  await cleanupSeededProfile();
}

async function cleanupSeededProfile() {
  const defaultData = {
    id: '15f3920f-a56e-4997-9763-09283dfbe36a',
    name: 'seeded profile name',
    email: 'seed@mail.co',
    avatar: 'seed.avatar/asapoihj.png',
    username: 'seeded_profile_username',
  } as const;
  const query = /* GraphQL */ `
    mutation UpdateProfile($id: ID!, $input: ProfileInput) {
      updateProfile(id: $id, input: $input) {
        id
      }
    }
  `;

  await axios.post(
    '/graphql',
    {
      query,
      variables: {
        id: defaultData.id,
        input: {
          name: defaultData.name,
          email: defaultData.email,
          avatar: defaultData.avatar,
          username: defaultData.username,
        },
      },
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
