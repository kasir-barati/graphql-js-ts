# Communication with a GraphQL service

- Write clean code on the server.
- Every field on every type has a focused single-purpose function for resolving that value.
- Do **NOT** design a GraphQL service which is:
  - Chatty: makes large number of small, individual requests to a backend ([look at batching](./batching.md)).
  - Repeatedly loads data from your databases ([look at caching chapter](./caching.md)).
