# Security in a GraphQL service

- Auth: Authentication & authorization.
- Operation safe-listing.
  - Or alternatively:
    - [Depth-limiting](./best-practices/query-depth-and-complexity.md).
    - Breadth-limiting.
    - Alias limits.
    - Cycle rejection.
    - [Cost analysis](./best-practices/cost-analysis.md).
- Execution timeouts.

## Cross Site Request Forgery -- CSRF

- Client must:
  - Send operations via `GET`.
  - Multipart upload requests must include `Apollo-Require-Preflight`.

## Cross-Origin Resource Sharing -- CORS

- An extra layer of protection.
- An HTTP-header-based protocol that enables a server to dictate:
  - Which [origin](./glossary.md#originInCorsAttackDefinition)s can access its resources.
  - Which types of HTTP requests are allowed.
- <a href="#sopDefinition" id="sopDefinition">#</a> Same-origin policy (SOP):
  - A security mechanism.
  - Restricts scripts on one origin from interacting with resources from another origin.
- If two URLs differ in their domain, protocol, or port, then those URLs come from two different origins.

> [!TIP]
>
> - CORS is a new protocol to relax [SOP](#sopDefinition) and safely share resources across different origins.
> - Related to browser security: cannot prevent other softwares from making requests for resources on the server. Like [`cURL`](https://man7.org/linux/man-pages/man1/curl.1.html) that can by pass the CORS configurations.
> - [Learn how to implement it in AWS, ExpressJS, and with GitHub self-hosted runners here](https://github.com/kasir-barati/cloud/blob/main/deploying-exercises/expressjs-cors/github-pipeline.md).

## Denial of Service attack

- Protect your GraphQL servers against resource exhaustion and DoS attacks.
  - Reject queries to your GraphQL server that are deemed too costly to execute.
  - Learn more [here](./nestjs.md#query-complexity).
- To do this we need to perform analysis the cost of executing a query.
- There are tools that can help us to do this:
  - [`graphql-query-complexity`](https://www.npmjs.com/package/graphql-query-complexity).
- It is directly related to your GraphQL schema design:

  - If you can send the following query to your GraphQL service:

    ```graphql
    query {
      getPosts {
        id
        author {
          posts {
            id
            author {
              posts {
                id
                author {
                  posts {
                    id
                    author {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ```

  - And let's assume like in our example you're using a tool like [join-monster](https://github.com/join-monster/join-monster) which will convert your query into this SQL:

    ```sql
    SELECT
        "getPosts"."id" AS "id",
        "author"."id" AS "author__id",
        "posts"."id" AS "author__posts__id",
        "author$"."id" AS "author__posts__author$__id",
        "posts$"."id" AS "author__posts__author$__posts$__id",
        "author$$"."id" AS "author__posts__author$__posts$__author$$__id",
        "posts$$"."id" AS "author__posts__author$__posts$__author$$__posts$$__id",
        "author$$$"."id" AS "author__posts__author$__posts$__author$$__posts$$__author$$$__id"
    FROM post "getPosts"
    LEFT JOIN public.user "author" ON "author".id = "getPosts"."authorId"
    LEFT JOIN post "posts" ON "author".id = "posts"."authorId"
    LEFT JOIN public.user "author$" ON "author$".id = "posts"."authorId"
    LEFT JOIN post "posts$" ON "author$".id = "posts$"."authorId"
    LEFT JOIN public.user "author$$" ON "author$$".id = "posts$"."authorId"
    LEFT JOIN post "posts$$" ON "author$$".id = "posts$$"."authorId"
    LEFT JOIN public.user "author$$$" ON "author$$$".id = "posts$$"."authorId"
    ```

> [!NOTE]
>
> A couple of notes:
>
> - The project for this can be found here: `apps/dos-attack-example`.
>   - To learn how to run it read [this doc](../apps/dos-attack-example/README.md).
> - And this query on my local system took a long time so I just killed my project and never bother to see if this actually can return any result.
