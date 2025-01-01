# Best practices

- Create different resolvers for different types;

  ```graphql
  type Query {
    huaweiCars: [HuaweiCar!]
    volvoCars: [VolvoCar!]
  }
  ```

  If:

  - you expect to add more types(car manufacturer) in the near future. This prevents potential messiness.
  - Your client need to perform queries like "sort Huawei cars by their rating ascending, Volvo cars by their ratings descending".
    - Here we just changed one of the parameters. But this can get even messier as decide to change more parameters.
      - Though we can solve this by calling our API twice :).

  > [!CAUTION]
  >
  > If adding separate queries is not doable consider the next suggestion.

- [Homogenize two or more resolvers into a single one with unions](../data-types.md#union). Then to simplify your query you can:

  - Filter using arguments.
  - Use [fragments](../queries-and-mutations.md#dont-repeat-yourself-dry----named-fragments).
  - Use [directives](../queries-and-mutations.md#directives).
    ```graphql
    query GetProducts($clientType: String!) {
      products {
        id
        price
        inventory @include(if: $clientType == "ADMIN")
        salesData @include(if: $clientType == "ADMIN")
      }
    }
    ```

<!-- TK -->
<!-- - Define your schema based on a real life data model?
- Create efficient application focused queries and responses?
- GraphQL API should just model the data they describe? -->

> [!NOTE]
>
> Refs of the Best Practices sections:
>
> - Stackoverflow Q&A: [Best practice around GraphQL nesting depth](https://stackoverflow.com/q/66448806/8784518).
>
> Just read/watch for fun:
>
> - [Spring Boot GraphQL Tutorial #4 - DDOS, Recursion, Max Query Depth Limit](https://www.youtube.com/watch?v=JRh5Rd6Reis).

## best practices and opinionated stances held by GraphQL services

- [Serve over HTTP](./serve-over-http.md).
- [Compress your request/response with GZIP](./compress-your-req-res-with-gzip.md).
- [Avoid versioning](./avoid-versioning.md).
- [Most of the times fields are nullable](./most-of-the-times-fields-are-nullable.md).
- [Pagination](./pagination.md).
- [Communication with a GraphQL service](./communication-with-a-graphql-service.md).
- [Batching](./batching.md).
- [Caching](./caching.md).
