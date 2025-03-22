import { GraphQLID, GraphQLList, GraphQLObjectType } from 'graphql';

import { PostObject } from './post.object';

export const UserObject = new GraphQLObjectType({
  name: 'User',
  extensions: {
    joinMonster: {
      sqlTable: 'public.user',
      uniqueKey: 'id',
    },
  },
  fields: () => ({
    id: {
      // the column name is assumed to be the same as the field name
      type: GraphQLID,
    },
    posts: {
      description: 'A List of posts this user has written.',
      type: new GraphQLList(PostObject),
      extensions: {
        joinMonster: {
          sqlJoin(userTable: string, postTable: string) {
            return `${userTable}.id = ${postTable}."authorId"`;
          },
        },
      },
    },
  }),
});
