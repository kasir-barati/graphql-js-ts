# Most of the times fields are nullable

In a typical type system in most programming languages the concept of `null` is being differentiated from common types:

- A common type: e.g. `String`.
- Nullable version of a common type:
  - E.g. `String?` in Kotlin.
  - `string | null` in TypeScript.

A common type does not include `null` by default, you want it? you need to explicitly add it.

But **Un**like these type systems, GraphQL types are nullable by default unless you explicitly declare it as non-nullable using `String!`.

> [!NOTE]
>
> Each field being by default nullable is because there are many things that can go awry in a networked service backed by databases and other services.

> [!IMPORTANT]
>
> When designing a GraphQL schema, keep in mind when `null` is an appropriate value for a failed field, and if it is **NOT**, use non-null types.
