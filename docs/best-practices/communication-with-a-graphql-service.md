# Communication with a GraphQL service

- Write clean code on the server.
- Every field on every type has a focused single-purpose function for resolving that value.
- Do **NOT** design a GraphQL service which is:
  - Chatty: makes large number of small, individual requests to a backend.
  - Repeatedly loads data from your databases.

# Caching

tk

# Batching technique:

- Multiple requests for data from a backend are collected over a short period of time and then dispatched in a single request to an underlying database or microservice by using a tool like [Facebook’s DataLoader](https://github.com/graphql/dataloader).
