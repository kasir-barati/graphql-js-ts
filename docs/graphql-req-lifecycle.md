# Lifecycle of a request

1. Document parsing.
2. Validation using the type system: is it valid when checked against the API's schema?
   - [Validation errors you might encounter](./common-validation-errors.md).
3. [Execution](./execution-from-inside.md).
4. Mirror the returned data from resolver into the requested shape.
   - GraphQL place each resolved field into a key-value map with the field name (or alias) as the key and the resolved value as the value.
   - It starts from leaves and works its way back up to the root (this why our responses resemble our requests).
   - Scalar coercion converts values into the types expected by the schema (e.g. `enum`s will be coerced).
   - GraphQL waits for promises to be resolved before trying to construct the response (just look at my [`createUser` resolver](https://github.com/kasir-barati/graphql/blob/63439cd4029023736636e039a1ddea2686b974b3/apps/todo-backend/src/resolvers/user.resolver.ts#L10-L17), I do NOT have `await` and it is working just fine).
