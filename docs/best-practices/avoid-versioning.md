# Avoid versioning

Here are some reasons about why you should not do it:

- We have lots of tools for the continuous evolution of a GraphQL schema.
- Most APIs version when there is limited control over the data that is returned from an API endpoint.
- Any change can be considered a breaking change, and breaking changes require a new version.

But in GraphQL:

- New capabilities can be added via new types and new fields on those types without creating a breaking change.
  - **Note**: A good GraphQL schema designer is always planning for future naming collisions.
- Client gets to decide what they wanted to receive as a response.
