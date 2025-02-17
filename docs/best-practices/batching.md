# Batching technique:

- Related to the topic of ["N+1" issue](../improve-dev-exp/filtering-using-prisma-nestjs-graphql.md#shouldWeUseResolveField).
- Multiple requests for data from a backend are collected over a short period of time and then dispatched in a single request to an underlying database or microservice by using a tool like [DataLoader](https://github.com/graphql/dataloader).
- **Note**: Most database engines have built-in baching mechanisms.

## Dataloader

- [Lee Byron](https://www.linkedin.com/in/lee-byron/) and his colleague had a meeting with engineers at Pinterest.
- They saw some common themes and patterns that they had solved at Facebook and were current issues at Pinterest.
- So they started to develop this lib.
- Responsible for:
  - **Batching**: Fetching .
  - **Caching**: Instead of loading same data from DB for different part of a GraphQL query we'll do it once, and use the cached value going forward.

### NestJS + Dataloader

1. ```shell
   pnpm add dataloader
   ```
2. ```shell
   nx g @nx/node:app --framework nest --directory apps/dataloader-example
   nest g module dataloader
   nest g interface dataloader
   ```
3. Create a new function that load the data in batch in your repository level like what we did [here](../../apps/dataloader-example/src/post/post.repository.ts#L13) and [here](../../apps/dataloader-example/src/user/user.repository.ts#L13).
4. You also need to add a new method to your service layer as we did [here](../../apps/dataloader-example/src/post/post.service.ts#L14) for example.
5. ```shell
   nest g service dataloader --no-spec
   ```

   Lastly you need to create a data loader for the things that needs to be batched together.

   > [!CAUTION]
   >
   > Note that we do not need to make this service request scoped, i.e. we do not need to annotate the newly created service with `@Injectable({ scope: Scope.REQUEST })`. As you can see it clearly in your terminal that `DataloaderService`'s constructor is being called again and again for each new request :slightly_smiling_face:.
   >
   > You can see it by running `apps/dataloader-example` app and checking the logs ([code](../../apps/dataloader-example/src/dataloader/dataloader.service.ts#L17)).

Provide a function that is your batch function:

- This batch function is responsible for going to the database and doing whatever needs to happen.
- Take an array of IDs and return an array of promises which in turn resolve the requested values for each ID.

> [!NOTE]
>
> When calling the Dataloader to load data (e.g. `user.loader(1)`), **Dataloader will batch this query with other calls** that **happened in the same tick of event loop**.

You can also pass an options to it:

- Turn on an off batching and or caching.
- `cacheKeyFn` in case your key ain't scalar type.
- `cacheMap`:
  - By default it's an ES6 `Map` object.
  - Will be thrown away when our Dataloader instance get garbage collected.
  - The default behavior is ok when you're creating a new Dataloader instance on every request.

> [!TIP]
>
> My implementation in `apps/dataloader-example` was purely experimental and in a real world app I believe using a lib would be much better. Something like: [`@strv/nestjs-dataloader`](https://www.npmjs.com/package/@strv/nestjs-dataloader) (**although they've changed the license from MIT to BSD-3!**) or [`nestjs-dataloader`](https://github.com/krislefeber/nestjs-dataloader).

### Caching in Dataloader

- It does return same `Promise` object when you call it with the same key more than once.

### Event Loop + Dataloader + `Promise`

- Promises work in JS because of microtasks.
- At the end of a run loop, there is a microtask queue (learn more [here](https://github.com/kasir-barati/awesome-js-ts/tree/main/apps/hodgepodge-container/src/event-loop#microtask)) and by the time we reach the end of a frame of execution JS will goes through microtasks queue and will execute all of them.

> [!CAUTION]
>
> NodeJS has two Microtasks queues. So in order to run something after promises you need to make sure that you're calling `process.nextTick` after all promises are resolved.
>
> <table>
>   <tr>
>     <td>
> <pre lang="javascript">
> <code>
> console.log('Start...');
> setTimeout(() => console.log('Timeout'), 0);
> function a() {
>   return new Promise((res) => res());
> }
> function b() {
>   return new Promise((res) => {
>     console.log('Next ticking!');
>     process.nextTick(res);
>   });
> }
> b().then(
>   console.log.bind(this, 'First promise call is next ticked!'),
> );
> a().then(console.log.bind(this, 'Second promise call'));
> console.log('...Finished');
> </code>
> </pre>
>     </td>
>     <td>
> <pre lang="javascript">
> <code>
> console.log("Start...");
> setTimeout(() => console.log("Timeout"), 0);
> function a() {
>   return new Promise((res) => res());
> }
> function b() {
>   return new Promise((res) => {
>     console.log("Next ticking!");
>     process.nextTick(res);
>   });
> }
> // Assume this is placed somewhere else in your codebase
> (async () => {
>   await b();
>   console.log("First promise call is next ticked!");
> })();
> // Assume this is placed somewhere else in your codebase
> (async () => {
>   await a();
>   console.log("Second promise call");
> })();
> console.log("...Finished");
> </code>
> </pre>
>     </td>
>   </tr>
>   <tr>
>     <td>
> <pre lang="shell">
> <code>
> Start...
> Next ticking!
> ...Finished
> Second promise call
> First promise call is next ticked!
> Timeout
> </code>
> </pre>
>     </td>
>     <td>
> <pre lang="shell">
> <code>
> Start...
> Next ticking!
> ...Finished
> Second promise call
> First promise call is next ticked!
> Timeout
> </code>
> </pre>
>     </td>
>   </tr>
> </table>

## Ref

- [DataLoader – Source code walkthrough](https://youtu.be/OQTnXNCDywA?si=G7Gezs13lp--vzJv).
