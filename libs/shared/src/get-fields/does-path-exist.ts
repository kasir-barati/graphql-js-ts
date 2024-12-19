import { FieldNode, SelectionNode } from 'graphql';

/**
 * @param {string[]} path You need to pass the path to a relation in your query as it is stated in your GraphQL schema as an array.
 * @example
 * if we have the following schema:
 *
 * ```graphql
 * type User {
 *   id: ID!
 *   posts: [Post!]
 * }
 * type Post {
 *   id: ID!
 *   authorId: String!
 *   author: User!
 * }
 * type Query {
 *   getPosts: [Post!]
 * }
 * ```
 *
 * And you're query is:
 *
 * ```graphql
 * {
 *   getPosts {
 *     id
 *     author {
 *       posts {
 *         id
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * You need to pass `['author', 'posts']` to this function.
 * @example
 * A complete example would look like this:
 *
 * ```ts
 * const shouldJoinPosts = doesPathExist(
 *   ['author', 'posts'],
 *   info.fieldNodes,
 * );
 * ```
 */
export function doesPathExist(
  path: string[],
  nodes?: readonly SelectionNode[],
): boolean {
  if (!nodes || path.length === 0) {
    return false;
  }

  const node = nodes.find(
    (x): x is FieldNode =>
      x.kind === 'Field' && x.name.value === path[0],
  );

  if (!node) {
    return false;
  }

  if (path.length === 1) {
    return true;
  }

  return doesPathExist(path.slice(1), node.selectionSet?.selections);
}
