# Pagination

> [!NOTE]
>
> - Different pagination models enable different client capabilities.
> - I tried `prisma-nestjs-graphql` lib and here is the result: `apps/botprobe-nest` project.
>   - I decided to try out `nestjs-query` since it looks more promising both from filtering capabilities, pagination and auth (learn more [here](https://discord.com/channels/520622812742811698/1313097554543771689/1315660190330392658)).
> - To lean more about pagination in general [read this](https://github.com/kasir-barati/nestjs-materials/blob/main/docs/designing-restful-api/pagination.md).
> - To learn more about efficiency in SQL you can read [this](https://github.com/kasir-barati/sql/blob/main/docs/select/pagination.md).
> - Read this great article in apollo website [Relay-Style Connections and Pagination](https://www.apollographql.com/docs/graphos/schema-design/guides/relay-style-connections).
> - A related post to this topic from a bigger point of view would be: [Zero, One, Infinity Principle in Software Development](https://dev.to/kasir-barati/zero-one-infinity-principle-in-software-development-39p0).

To traverse the relationship between sets of objects. we can have a field that returns a plural type:

```graphql
{
  post {
    id
    title
    comments {
      id
      content
      user {
        id
        username
      }
    }
  }
}
```

- Some fields return a list of values.
- Accept `first` and `after` to allow for specifying a specific region of a list.

  ![Slicing or pagination in GraphQL with first as argument](../assets/slicing-pagination.png)

  But this is not gonna cut it when our client needs to paginate. Here are some API designs we can have:

  1. `comments(first:2 offset:2)` returns the next two in the list.
  2. `comments(first:2 after:$commentId)` returns the next two after the last comment we fetched.
  3. `comments(first:2 after:$commentCursor)` returns the next two comments from where the cursor points to.

  [Cursor-based pagination](https://github.com/kasir-barati/nestjs-materials/blob/main/docs/designing-restful-api/pagination.md#cursorBasedPagination) is the one we'll use.

## Cursor-based pagination in GraphQL

> [!TIP]
>
> Since the "cursor" is opaque, it can be anything. E.g. in [`nestjs-query`](https://tripss.github.io/nestjs-query/docs/graphql/queries/paging#cursor-based-paging) by default it is not using a keyset cursor approach. JFYI, it does not matter what is our ORM/ODM, what matters is to understand that due to the opaque nature of cursor `nestjs-query` by default uses a type offset pagination beneath the cursor-based pagination.
>
> learn more about `nestjs-query`'s pagination [here](https://tripss.github.io/nestjs-query/docs/graphql/queries/paging#key-set-based-cursor) and now let's look at the GraphQL query and its generated SQL query by the TypeOrm:
>
> <table>
> <caption>
> Note that we have both previous page and next page in this particular example.
> </caption>
> <thead>
> <tr>
> <th>
> SQL Query
> </th>
> <th>
> GraphQL Query
> </th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>
>
> ```sql
> SELECT
>     "Alert"."id" AS "Alert_id",
>     "Alert"."title" AS "Alert_title",
>     "Alert"."userId" AS "Alert_userId",
>     "Alert"."updatedAt" AS "Alert_updatedAt"
>     "Alert"."createdAt" AS "Alert_createdAt",
>     "Alert"."alertTypeId" AS "Alert_alertTypeId",
>     "Alert"."description" AS "Alert_description",
> FROM "alert" "Alert"
> LIMIT 5
> OFFSET 13
> ```
>
> </td>
> <td>
>
> ```graphql
> query {
>   alerts(paging: {
>     "paging": {
>       "last": 4,
>       "before": "YXJyYXljb25uZWN0aW9uOjE4"
>     }
>   }) {
>     edges {
>       cursor
>       node {
>         id
>         title
>         createdAt
>       }
>     }
>     pageInfo {
>       endCursor
>       hasNextPage
>       startCursor
>       hasPreviousPage
>     }
>   }
> }
> ```
>
> </td>
> </tr>
> <tr>
> <td>
>
> ```sql
> SELECT
>     "Alert"."id" AS "Alert_id",
>     "Alert"."title" AS "Alert_title",
>     "Alert"."description" AS "Alert_description",
>     "Alert"."userId" AS "Alert_userId",
>     "Alert"."alertTypeId" AS "Alert_alertTypeId",
>     "Alert"."createdAt" AS "Alert_createdAt",
>     "Alert"."updatedAt" AS "Alert_updatedAt"
> FROM "alert" "Alert"
> LIMIT 7
> ```
>
> </td>
> <td>
>
> ```graphql
> query {
>     alerts(paging: {
>     "paging": {
>       "first": 6
>     }
>   }) {
>     edges {
>       cursor
>       node {
>         id
>         title
>         createdAt
>       }
>     }
>     pageInfo {
>       endCursor
>       hasNextPage
>       startCursor
>       hasPreviousPage
>     }
>   }
> }
> ```
>
> </td>
> </tr>
> <tr>
> <td>
>
> ```sql
> SELECT
>     "Alert"."id" AS "Alert_id",
>     "Alert"."title" AS "Alert_title",
>     "Alert"."description" AS "Alert_description",
>     "Alert"."userId" AS "Alert_userId",
>     "Alert"."alertTypeId" AS "Alert_alertTypeId",
>     "Alert"."createdAt" AS "Alert_createdAt",
>     "Alert"."updatedAt" AS "Alert_updatedAt"
> FROM "alert" "Alert"
> LIMIT 7
> OFFSET 6
> ```
>
> </td>
> <td>
>
> ```graphql
> query {
>     alerts(paging: {
>     "paging": {
>       "first": 6,
>       "after": "YXJyYXljb25uZWN0aW9uOjU="
>     }
>   }) {
>     edges {
>       cursor
>       node {
>         id
>         title
>         createdAt
>       }
>     }
>     pageInfo {
>       endCursor
>       hasNextPage
>       startCursor
>       hasPreviousPage
>     }
>   }
> }
> ```
>
> </td>
> </tr>
> </tbody>
> </table>

How can we send the cursor to the client?

- We obviously do not wanna add it to our `Comment` type.
- It is a property of the `comments`, not of the `post`.

## Relay cursor connections

- A generic specification for how a GraphQL server should expose paginated data.
- A predictable contract between the client & server.
- Might seems a bit complex but that's because it is so generalized.
  - Therefore we'll go through it step by step.
- "Connections" is a feature-rich pagination design pattern.
- [Relay](https://relay.dev/) knows how to work with "Connections" design pattern.

> [!TIP]
>
> **Lovely specification**:
>
> To ensure a consistent implementation of this pattern, we can take a loo at the [Relay Cursor Connections Specification](https://relay.dev/graphql/connections.htm).

### Add a new [layer of indirection](../glossary.md#indirectionDefinition)

- Our `comments` field should give us a list of edges.
- An edge has both:

  - A cursor.
  - The underlying node.

- We can also ask for additional information about the connection itself, e.g.:

  - How many comments is written for that post?
  - Is there more connections (comments to fetch)?
  - Etc.

![Every item in the paginated list has its own cursor](../assets/graphql-connections-pagination.png)

> [!IMPORTANT]
>
> <a href="#paginationBuzzwords" id="paginationBuzzwords">#</a> Buzzwords:
>
> - **Connection** is the _paginated field_ on an object, e.g. `comments` in `post`.
> - Each **edge** has:
>   - Metadata About one object in the paginated list.
>   - A cursor to allow pagination starting from that object.
> - **Node**: represents the actual object user was looking for.
> - **pageInfo**:
>   - Lets the client know if there are more pages of data to fetch.
>   - In Relay spec it does NOT tell you the total number of items, because the client cache doesn’t need that info.
>     - But we can add it too through another field outside of `pageInfo`.
>
> To help you better understand the naming convention you can think of it as graph:
>
> ![Nodes and edges in a graph](../assets/nodes-and-edges-in-graph.png)

### Why Were Connections Created?

- A very crucial existential question.
- To have a very efficient method of paging.
- To have a common nomenclature that is generic enough to encompass everything.

### Designing GraphQL Schema

![Cursor-based connections pagination](../assets/graphql-cursor-based-connections-pagination.png)

- `PostCommentsConnection`:

  - **A wrapper type**.
  - Fields:

    - `edges`.

      <details>
        <summary>Fields inside it</summary>
        <ul>
          <li>
            <code>node</code> contains the actual comment's data.
            <br />
            <b>Cannot be a list!</b>
          </li>
          <li><code>cursor</code> is the cursor to that "node".</li>
          <li>Can have additional fields related to the edge</li>
        </ul>
      </details>

    - `pageInfo`:

      <details>
        <summary>Fields inside it</summary>
        <ul>
          <li>
            <code>startCursor</code> is the first cursor of <b>the currently fetched page</b> and not the very first record in our database!
          </li>
          <li>
            <code>endCursor</code> is the last cursor of <b>the currently fetched page</b> and not the very last record in our database!
          </li>
          <li>
            <code>hasNextPage</code> indicates whether there is a next page or not.
          </li>
          <li>
            <code>hasPreviousPage</code> indicates whether there is a previous page or not.
          </li>
        </ul>
      </details>

    - Enables modeling additional info/attributes, related to the connection, where they **DO NOT** belong to the entities in our edges.

- `PostCommentEdge`:

  - An actual entity in our graph.
  - **A wrapper type**.
  - Here can can model other info that do not belong to the post, nor the comment itself. E.g.:
    - Tone of a comment for a specific post, is it negative, or positive, stuff like that. This info is being generated because of the relationship between comment and post.
    - Or a specific customer might shop at one business in store and another online. This is an attribute of the relationship between a business and customer.
  - Without wrapper types (edge & connection), you don't have a place to put this data.

- `commentsConnection`: you can perform forward pagination, backward pagination, **or both**.

  - **Forward pagination**:
    - `first`:
      - Mandatory.
      - Slices the data, i.e., returns that many comments.
    - `after`:
      - Mandatory.
      - Paginates through the data, i.e., returns comments after that cursor.
  - **Backward pagination**:
    - `last`:
      - Required.
      - A non-negative integer.
    - `before`:
      - Required.
      - Returns the nodes before that cursor.

  > [!TIP]
  >
  > Some general validations for these args:
  >
  > ```ts
  > export function validatePagination(
  >   forwardPaging: { after: string; first: number },
  >   backwardPaging: { before: string; last: number },
  > ) {
  >   if (forwardPaging.first < 0) {
  >     throw new Error(
  >       'ForwardPagingArg.first cannot be less than 0',
  >     );
  >   }
  >
  >   if (backwardPaging.last < 0) {
  >     throw new Error(
  >       'BackwardPagingArg.last cannot be less than 0',
  >     );
  >   }
  >
  >   if (
  >     !isNil(backwardPaging.last) &&
  >     isNil(backwardPaging.before)
  >   ) {
  >     throw new Error(
  >       'BackwardPagingArg property before cannot be undefined when you specify last',
  >     );
  >   }
  >
  >   if (
  >     !isNil(forwardPaging.after) &&
  >     !isNil(backwardPaging.last)
  >   ) {
  >     throw new Error(
  >       'ForwardPagingArg.after cannot be specified with BackwardPagingArg.last',
  >     );
  >   }
  >
  >   if (
  >     !isNil(forwardPaging.first) &&
  >     !isNil(backwardPaging.before)
  >   ) {
  >     throw new Error(
  >       'ForwardPagingArg.first cannot be specified with BackwardPagingArg.before',
  >     );
  >   }
  > }
  > ```

> [!CAUTION]
>
> Sort edges the same way, in both, forward pagination and backward pagination. I.e.,
>
> - `after`: the edge closest to `cursor` must **come first**.
> - `before`: the edge closest to `cursor` must **come last**.

> [!TIP]
>
> In graph theory, an _edge_/_connection_ can have properties of its own which act effectively as metadata;
>
> ```graphql
> enum CommentSentiment {
>   NEUTRAL
>   POSITIVE
>   NEGATIVE
> }
> type PostCommentEdge {
>   cursor: ID!
>   node: Comment
>   sentiment: CommentSentiment
> }
> ```
>
> **Note**: most tools treat the edge type as boilerplate. But we are not gonna do that, we add data that belongs to the edge to the `edge` type.

### 3rd-party libs

- In Prisma we have libraries such as [prisma-relay-cursor-connection](https://github.com/devoxa/prisma-relay-cursor-connection).
- Or ORM agnostic libraries such as [nestjs-graphql-connection](https://github.com/equalogic/nestjs-graphql-connection).

## Ref

1. [Pagination](https://graphql.org/learn/pagination/).
2. [Understanding pagination: REST, GraphQL, and Relay](https://www.apollographql.com/blog/understanding-pagination-rest-graphql-and-relay).
3. [Explaining GraphQL Connections](https://www.apollographql.com/blog/explaining-graphql-connections).
4. [Implementation of Relay-style pagination with Prisma Client JS](https://github.com/prisma/prisma/issues/5016).
