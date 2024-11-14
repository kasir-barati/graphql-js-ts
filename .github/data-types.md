# Data types

- Specify the types for your API using the GraphQL schema language.
- Supports the [scalar types](./glossary.md#scalarValueDefinition) and we can use them directly in our schema:
  - `Int`.
  - `Float`.
  - `String`.
  - `Boolean`.
  - `ID` (intended to convey meaning rather than dictate a format).
- By default, every type is nullable.
- Defined mandatory fields by adding exclamation mark at the end of a field name.
- `[String]` means a list of strings.
- Just return plain old JavaScript objects in APIs that return scalar types.

Code: https://github.com/kasir-barati/graphql/tree/main/apps/scalar-types

# Passing arguments

- Define the arguments in the schema language.
- Typechecking happens automatically. No need to write extra code to:
  - Enforce mandatory/optional fields.
  - Enforce basic type enforcements.
- Still need to do more validation, things like a string is a strong password, or email validation? Then you need to write your own custom validator.

Code: https://github.com/kasir-barati/graphql/blob/122a487b29ec9c4b8610fe87498dfc6bae7463e1/apps/scalar-types/src/main.ts#L16
