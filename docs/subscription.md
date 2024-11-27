# Subscription

- In GraphQL you can:
  - Fetch data using `Query` operation type.
  - Modify/insert data using `Mutation` operation type.
- But if you need to push data from the server to the clients, that choose to listen to real time messages from the server, you need to use `Subscription` operation type.
- More complex to implement, so first [make sure that you need it](#making-sure-that-i-need-subscription).
- Subscription: long-lasting GraphQL read operations that can update their result whenever a particular server-side event occurs.
  - Done through [the WebSocket protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

## How `Subscription` operation type works

- They're similar to `query` operation types.
- It defines top-level **fields that clients can subscribe to**:
  ```graphql
  type Subscription {
    # messageCreated field will update its value whenever a new Message is
    # created on the backend, thus pushing the Message to subscribing clients.
    messageCreated: Message
  }
  ```
- Open a channel in the backend on the server.
- A result is sent to the client every time a particular event happens on the server.

![Client specifies a set of fields to be delivered to the client, but instead of immediately returning a single answer, a channel is opened and a result is sent to the client every time a particular event happens on the server](./assets/server-clien-graphql-subscription.png)

> [!IMPORTANT]
>
> Each `subscription` operation can subscribe to only one top-level field of the `Subscription` type. Meaning the following subscription operation is not valid:
>
> ```graphql
> subscription IndexPageEvents {
>   notificationCreated {
>     id
>   }
>   postCreated {
>     author
>     comment
>   }
> }
> ```

## Making sure that I need subscription

> [!NOTE]
> In the majority of cases, your client should not use subscriptions to stay up to date with your backend, **instead**:
>
> - **Short polling**: Poll [intermittently](https://dictionary.cambridge.org/dictionary/english/intermittently) with queries.
> - Re-execute queries on demand, when a user performs a relevant action (e.g. clicking on a refresh button).

Scenarios where we need it:

- **Large objects, small, incremental changes**:
  - Short polling a large object is expensive, especially here since most of the object's fields have not changed.
  - Instead:
    1. Fetch the object's initial state with a query.
    2. Server proactively push updates to individual fields as they occur.
- **Low-latency, real-time updates**:
  - Clients in a chat app want to receive new messages ASAP.

## `@apollo/server`

- **No** built-in support for subscriptions.

### Subscription resolvers

- Return an object.
- Define a subscribe function.
- Publish an event whenever the return value of a subscription should be updated.
  - It can be triggered by:
    - A mutation.
    - A cron job.
    - etc.
- You can [see how it is done in NodeJS + ExpressJS + Apollo server here](https://github.com/kasir-barati/graphql/tree/main/apps/server-statistics).
- To filter data you can use `withFilter` function.
  - Runs before the `resolve` function.
  - Returns early if the filter does **NOT** pass.
  - Accepts two functions:
    - The first is your usual subscribe which has to return an `AsyncIterator` object.
    - The second function though is where you write extra logic to narrow what should be sent to the client based on their query.

> [!TIP]
>
> Here you can see how `withFilter` should **NOT** be used in [AS](./glossary.md#asAcronymStandsFor):
>
> ![Inside the withFilter you should not change the resolved value, just filter it. For changing it use resolve function](./assets/wrong-usage-of-with-filter.png)

### NestJS + Apollo server

- Has a single top-level property.
  - Key: the name of the subscription.
    - This name is either:
      - Inherited from the name of the subscription handler method (e.g., `commentAdded`).
      - Is provided explicitly by passing an option with the key name as the second argument to the `@Subscription()` decorator.

1. We need to enable it in our Apollo server.
   - We need a 3rd-party lib for it called [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).
2. You need to [enable CORS in your NestJS app](https://docs.nestjs.com/security/cors).
   - [Learn more about how to configure you're CORS](https://www.apollographql.com/docs/apollo-server/security/cors#specifying-origins).
3. [Set up HTTP body parsing](https://docs.nestjs.com/faq/raw-body). In NestJS it is by default activated.
4. ```diff
    GraphQLModule.forRoot<ApolloDriverConfig>({
     driver: ApolloDriver,
     autoSchemaFile: join(__dirname, 'src', 'schema.gql'),
     sortSchema: true,
   +  subscriptions: {
   +    'graphql-ws': true,
   +  },
   })
   ```
5. Use `@Subscription` to annotate your handler.
6. ```shell
   pnpm add graphql-subscriptions
   ```

   - Provides a simple publish/subscribe API.
   - We usually need to back it with an external store such as Redis, or RabbitMQ, or anything other database ([See a more complete list here](https://github.com/apollographql/graphql-subscriptions?tab=readme-ov-file#pubsub-implementations)).
     - ```shell
       pnpm add graphql-redis-subscriptions @nestjs/config ioredis class-transformer class-validator
       ```
     - For docker I am using [this `compose` file](https://github.com/kasir-barati/docker/blob/main/docker-compose-files/redis).
     - ```shell
       cd libs/shared && nest g module pubsub
       ```

7. To publish an event, we use the `pubsub.publish` method.
   - Often used within a mutation to trigger a client-side update when a part of the object graph has changed.
