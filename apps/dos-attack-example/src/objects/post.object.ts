import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import { UserObject } from './user.object';

export const PostObject = new GraphQLObjectType({
  name: 'Post',
  extensions: {
    joinMonster: {
      sqlTable: 'post',
      uniqueKey: 'id',
    },
  },
  fields: () => ({
    id: {
      // the column name is assumed to be the same as the field name
      type: new GraphQLNonNull(GraphQLID),
    },
    author: {
      description: 'Who has written this post',
      type: new GraphQLNonNull(UserObject),
      extensions: {
        joinMonster: {
          /**
           * @example
           * ```graphql
           * query {
           *   getPosts { # higherLevelQueryKey
           *     id
           *     author { # nestedQueryKey
           *       id
           *     }
           *   }
           * }
           * ```
           */
          sqlJoin(
            higherLevelQueryKey: string, // post table
            nestedQueryKey: string, // user table
          ) {
            return `${nestedQueryKey}.id = ${higherLevelQueryKey}."authorId"`;
          },
        },
      },
    },
  }),
});
