# Caching

What is caching?

A software component that stores data, that the future requests for that data can be served faster ([infographic](https://github.com/kasir-barati/cloud/blob/main/aws/ElastiCache/assets/elasticache-ec2-rds-loadbalancer.png)).

> ![IMPORTANT]
>
> Caching a GraphQL API is different than other endpoint based APIs (e.g. things like REST).

## HTTP Caching

It is **harder in GraphQL**.

```http
POST /graphql HTTP 1.1
content-type: application/json
'
  {
    "query": "{ shop { name } }",
    "variable": null,
    "operationName": null
  }
'
```

With `POST` HTTP method we cannot use normal HTTP caching. But GraphQL Spec also do not ask us to only use `POST`. So we can utilize `GET` HTTP verb.

### How Much Useful is HTTP Caching?

It is really great when:

1. We have immutable resources with a very long `max-age`.
   - Things like JS/CSS assets.
   - `max-age` is a year in the future.
   - Add a hash or version number to the file name, thus whenever wanna deploy a new version you can simply rename it. Then your client knows that they need to fetch the new version.
2. We have mutable resources with a very clear expiration date.
3. Our client is browsers;
   - Set the proper headers on your backend
   - Browsers will take care of the rest[^1] for you. No coding required.

> [!CAUTION]
>
> It is not good if:
>
> 1. Our resources are mutable, and server needs to revalidate the cache. Meaning the request has to go to the server anyway.
>
>    And to do so we need to add `etags`, or `last-modified` headers to our requests.
>
>    And most APIs are like this!
>
> 2. You have different clients that ain't browsers.

### Utopia of Clients of a Backend App

They do not need to do anything to benefit from caching. This means that we need to take care of it at the application level :).

### Application Level Caching -- Caching Approaches

- Caching a single resolver:

  Here this particular resolver is probably super slow, so we wanna make it faster.

- Caching frequently accessed data:

  - Our app uses the cache instead of querying it from the underlying DB.
  - E.g. [IdentityCache](https://github.com/Shopify/identity_cache) which caches data in a [Memcached](https://memcached.org/).

- Cache all `Queries`.

> [!NOTE]
>
> It is kinda I guess obvious that we do not wanna cache `Mutations` and Introspection\*.
>
> \*If it is enabled and accessible.

### Caching Queries

- We say whether an `Object` is cacheable or not.
- Cache key is dictating "cache miss".
- Cache key structure: `AppName:Query:Variables:OperationName`

> [!IMPORTANT]
>
> `Query` and `Variables` need to be first normalized and then hashed. We use the hashed value in this string of course.

### Examination of When to Use Caching

- Measure how many request you have.
- How many of them are cacheable.
- **How many ain't**.
- How frequently you cache gets invalid.

If you have a ton of cacheable requests, then if you implement it right, it will have a big impact.

### Considerations

Query complexity (AKA query depth) is important since:

- Our cache storage might run out of space if we cache a lot of queries.
- Or on the other hand we might be kicking cached data out of our storage too soon if the cardinality[^2] of our queries are too high.

  **Note** This won't be an issue if you're serving internal clients since the variety of queries won't be out of control.

> [!NOTE]
>
> Learn more about [query complexity in NestJS here](../nestjs.md#query-complexity).

## Ref

- [Scott Walkinshaw – Caching GraphQL APIs](https://youtu.be/MPRQRlrixls?si=5bP9amLA6m0p9Cpk).

# Footnotes

[^1]: Read, write and invalidation.

[^2]: Variety .
