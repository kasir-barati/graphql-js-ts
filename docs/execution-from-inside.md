# Execution from inside

- Each field defined in a [type system](./glossary.md#typeSystemDefinitionInGraphql) behaves like a function.
- Each field returns the next type.
- Each field on each type is backed by a resolver function.

  - E.g. when [here](https://github.com/kasir-barati/graphql-js-ts/blob/63439cd4029023736636e039a1ddea2686b974b3/apps/scalar-types/src/main.ts#L30) we are returning a `RandomDie` and inside that type we have `roll` and `rollOnce` which are also considered resolvers.

    Though we never really passed them explicitly as resolver to our `rootApi` variable.

- The execution stops when you return a scalar/enum type -- [like `Todo` object type](https://github.com/kasir-barati/graphql-js-ts/blob/63439cd4029023736636e039a1ddea2686b974b3/apps/todo-backend/src/schema.ts#L10-L20).

![Execution flowchart](./assets/execution-cycle.png)

## Resolvers

<a href="#fourArgumentsOfAnyResolverFunction" id="fourArgumentsOfAnyResolverFunction">#</a> A resolver function receives four arguments:

```ts
async function getTodo(
  // The previous object.
  // For a field inside the root Query type, this argument mostly won't be used.
  obj,
  // Arguments provided to the field in the GraphQL operation
  // getTodo(id: ID!)
  args: { id: string },
  // Provided to every resolver.
  // Holds important contextual information, things like:
  // - Access to a database.
  // - The currently logged in user.
  context: { db: PrismaClient },
  // Used in advanced use-cases.
  // Holds field-specific* info and the schema details.
  // *Things relevant to the current operation.
  info,
) {
  const todo = await context.db.todo.find({
    where: { id: args.id },
  });
  const graphqlTodoObject = new GraphqlTodo(todo);

  return graphqlTodoObject;
}
class GraphqlTodo {
  public id: string;
  public title: string;
  public content: string;
  public createdAt: Date;
  public updatedAt: Date;
  public CreatedBy: { id: string; username: string };
  public createdById: string;
  public AssignedTo: { id: string; username: string };
  public assignedToId: string;

  constructor(todo: PrismaTodo) {
    this.id = todo.id;
    this.title = todo.title;
    this.content = todo.content;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
    this.CreatedBy = todo.CreatedBy;
    this.createdById = todo.createdById;
    this.AssignedTo = todo.AssignedTo;
    this.assignedToId = todo.assignedToId;
  }
}
```

> [!TIP]
>
> A very important note about `args` and `info` in a resolver:
>
> ![The args parameter is populated by the arguments passed to the field being resolved -- any arguments passed to other fields will not be included in the args parameter.](./assets/args-info-and-variables.png)
>
> &mdash; [Ref](https://stackoverflow.com/a/55716584/8784518).

<a href="trivialResolvers">#</a> Note that we do not need to define trivial resolvers like `getTodoName` which does something like this:

```ts
function getTodoName(obj: GraphqlTodo, args, context, info) {
  return obj.name;
}
```

Most of the times when we have not defined a resolver the lib we're using to build our GraphQL service assume that there is a property/method named exactly the same as the field. Thus it automatically calls that one.
