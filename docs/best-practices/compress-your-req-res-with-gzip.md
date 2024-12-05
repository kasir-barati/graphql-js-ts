# Compressed communication -- GZIP

- Respond using JSON.
  - GraphQL spec does not require it.
  - But it is:
    - Easy to read and debug.
    - Very familiar to client and API developers.
- For better network performance:
  1. Enable GZIP.
  2. Clients should send the header: `Accept-Encoding: gzip`.
