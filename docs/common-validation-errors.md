# Common validation errors

> [!TIP]
>
> - [Learn more about this in GraphQL spec](https://spec.graphql.org/draft/#sec-Validation).
> - [See how the validation is implemented in TS](https://github.com/graphql/graphql-js/tree/main/src/validation).

## Requesting non-existent fields

- The field that client wants to request must have been defined in the schema on that type.
- E.g. you cannot request `getTodos` to return todos with deadline since we never defined it in `Todo` object in our schema.

```json
{
  "errors": [
    {
      "message": "Cannot query field 'deadline' on type 'Todo'.",
      "locations": [{ "line": 4, "column": 5 }]
    }
  ]
}
```

## When a query returns an array of objects then you have to specify what you want

- E.g. if you just say `query { getTodos }` you'll get:

  ```json
  {
    "errors": [
      {
        "message": "Field 'getTodos' of type 'Todo' must have a selection of subfields. Did you mean 'getTodos { ... }'?",
        "locations": [{ "line": 3, "column": 3 }]
      }
    ]
  }
  ```

## Trying to query fields of a `scalar` or `enum` doesn’t make sense, Right?

```json
{
  "errors": [
    {
      "message": "Field 'name' must not have a selection since type 'String!' has no subfields.",
      "locations": [{ "line": 4, "column": 10 }]
    }
  ]
}
```

## Missing inline `fragment`s in queries for APIs that return a `union`

E.g. if you're searching in [audit-log](./data-types.md#auditLogUnionExample) and try `{ search(tags: ["warn"]) { serialNumber } }` query you will get an error like this:

```json
{
  "errors": [
    {
      "message": "Cannot query field 'serialNumber' on type 'EventSource'. Did you mean to use an inline fragment on 'Robot'?",
      "locations": [{ "line": 5, "column": 5 }]
    }
  ]
}
```

## Cannot use a named fragment inside itself
