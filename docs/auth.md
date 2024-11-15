# Authentication

- Easiest way to implement auth in GraphQL service is to use `graphql-http` + middlewares.`
- Do it like you do normally in your ExpressJS or NestJS app inside a middleware.
- The `request` object is accessible as the second arg in your resolver.
- E.g. to access IP in your resolver you can follow these steps:

  ![Attach IP to the resolver context argument](./assets/attach-ip-from-express-to-context.png)

- And for securing your GraphQL with JWT we have a couple of options:
  - [PassportJS](https://www.passportjs.org/).
  - [express-js](https://github.com/auth0/express-jwt).
  - [expressjs-session](https://github.com/expressjs/session).

Code:
