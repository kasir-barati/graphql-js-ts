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

# Request errors

- Client has made a syntax error.
- `location` key tells you where is the syntax issue located in your query.
- No `data` key inside the response since GraphQL service returned the response before our request reaches its destined resolver.

# Field errors

- Raised if something unexpected happens during execution.
- E.g. [here](https://github.com/kasir-barati/graphql/blob/bf70d551f86c33e6c6b50a69c30576cd6c738729/apps/scalar-types-e2e/src/scalar-types/__snapshots__/scalar-types.spec.ts.snap#L3-L28) we are mocking what will our server returns when something goes wrong in the middle of execution.
- GraphQL will attempt to continue executing the other fields and return a partial response.
- `data` key + `errors` key in the returned response.

# Network errors

- They ain't specific to GraphQL.
- Your lib of choice for GraphQL might have retries mechanisms implemented, so you just need to configure it.
