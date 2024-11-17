# Queries

- So we now know how to query a GraphQL server to some extend:
  - [Simplest form](../apps/expressjs-hello-world-e2e/src/expressjs-hello-world/expressjs-hello-world.spec.ts#L5).
  - [Select from sub fields of an object](../apps/todo-backend-e2e/src/todo-backend/create-todo.spec.ts#L16).
  - [Fetch a specific resource](../apps/profile-e2e/src/profile/profile.spec.ts#L11).
- Thing you can see:

  - [Response's shape is exactly the same as your query](./intro.md#query-what-you-need).
  - You can abstract away a lot of data transformation from clients to backend to centralize it for a smoother dev exp and user exp:

    ![Centralized data transformation](./assets/centralized-data-transformation-in-backend.png)

    > [!NOTE]
    >
    > You can define any custom type, but you should define it in a representable way, in a format suitable for communication between the client and server.

  - You **cannot query for the same field with different arguments**. [Solution? **Aliases**](../apps/todo-backend-e2e/src/todo-backend/get-todo.spec.ts#L26):

    They let you rename the result of a field to anything you want. **Another use case** is when your client wants to rename fields to something that is tailor to their specific programming language.
