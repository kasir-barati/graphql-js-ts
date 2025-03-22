import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from 'graphql';
import joinMonster from 'join-monster';

import { PostObject } from '../objects/post.object';
import { Context } from '../type';

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    // place this user type in the schema
    getPosts: {
      type: new GraphQLList(PostObject),
      // how to write the WHERE condition
      extensions: {
        joinMonster: {
          /**
           * @example
           * ```graphql
           * query {
           *   getPosts { # higherLevelQueryKey
           *     id
           *     author {
           *       id
           *     }
           *   }
           * }
           * ```
           */
          where: (higherLevelQueryKey, args) => {
            return null;
          },
        },
      },
      resolve: (
        parent,
        args,
        context: Context,
        resolveInfo: GraphQLResolveInfo,
      ) => {
        return joinMonster(resolveInfo, {}, (sql: string) => {
          console.log(sql);

          return context.postRepository.query(sql);
        });
      },
    },
  }),
});
