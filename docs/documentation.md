# Documentation

- AKA descriptions.
- Add documentation to the types, fields, and arguments.
- Encouraged to do it in all cases.

  Unless the name of the type, field, or argument is self-descriptive.

- Use markdown syntax.
- Can be multiline or single line.

```graphql
"""
A todo resource
"""
type Todo {
  "It is a unique identifier, and it is an UUID."
  id: String!
  "This will be shown to the user while overviewing all todos."
  title: String!
  """
  This where creator or the user who where assigned to do this todo can come jot down whatever they need, it can be:
  - Details of the todo.
  - It can hold things like what user wants to do next.

  Sky is limit, go wild!
  """
  content: String!
  status: Status
}

"""
Todo's status
"""
enum Status {
  """
  Todo was created, note that user cannot change the status back to created when they once changed it to in-progress.
  """
  CREATED
  """
  It is on preparation for being closed and completed. From here todo's status can only be changed to paused or finished.
  """
  IN_PROGRESS
  """
  Todo was in-progress bu something came up and user had to stops it for sometime until the can come back to it and change its status back to in-progress.
  """
  PAUSED
  "Todo completed"
  FINISHED
}

"""
The query type, represents all of the entry points into our object graph
"""
type Query {
  """
  Fetches all todos.
  """
  getTodos(
    "Filter todos based on their status if you like"
    status: [Status!]
  ): [Todo!]
}
```

> [!TIP]
>
> We have also what is commonly called comments, but how they are different from descriptions?
>
> Comments are things that ain't meant to be seen by client :).
