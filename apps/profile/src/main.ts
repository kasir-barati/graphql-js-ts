import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { ProfileResolver } from './resolvers/profile.resolver';

const port = 4002;
const profiles: ProfileResolver[] = [
  {
    id: '15f3920f-a56e-4997-9763-09283dfbe36a',
    name: 'seeded profile name',
    email: 'seed@mail.co',
    avatar: 'seed.avatar/asapoihj.png',
    username: 'seeded_profile_username',
  } as ProfileResolver,
];

const schema = buildSchema(/* GraphQL */ `
  input ProfileInput {
    name: String
    email: String
    avatar: String
    username: String
  }
  type Profile {
    id: String
    name: String
    email: String
    avatar: String
    username: String
  }
  type Query {
    getProfile(id: ID!): Profile
  }
  type Mutation {
    # Wrong usage:
    # Internal error occurred during request handling. Please check your implementation. Error: The type of Mutation.setProfile(profile:) must be "Input" type but got: Profile.
    # setProfile(profile: Profile): Profile

    # Note that since our mutations are retuning a Profile, client can choose what they want to receive as response.
    createProfile(input: ProfileInput): Profile
    updateProfile(id: ID!, input: ProfileInput): Profile
  }
`);

const rootResolver = {
  getProfile(args) {
    const profile = profiles.find((p) => p.id === args.id);

    return profile;
  },
  createProfile(args) {
    const { name, email, avatar, username } = args.input;
    const newProfile = new ProfileResolver().setProfile({
      name,
      email,
      avatar,
      username,
    });

    profiles.push(newProfile);

    return newProfile;
  },
  updateProfile(args) {
    const { name, email, avatar, username } = args.input;
    const profile = profiles.find((p) => p.id === args.id);

    if (!profile) {
      throw 'NotFound';
    }

    profile.name = name;
    profile.email = email;
    profile.avatar = avatar;
    profile.username = username;

    return profile;
  },
};

const app = express();

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});
// Mounting our GraphQL API to the /graphql endpoint.
app.all(
  '/graphql',
  createHandler({ schema, rootValue: rootResolver }),
);

app.listen(
  port,
  console.log.bind(
    this,
    `Server is listening on http://localhost:${port}`,
  ),
);
