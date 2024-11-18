# Lifecycle of a request

1. Document parsing.
2. Validation using the type system: is it valid when checked against the API's schema?
   - [Validation errors you might encounter](./common-errors.md#common-validation-errors).
3. [Execution](./execution-from-inside.md).
4. Mirror the returned data from resolver into the requested shape.
   - GraphQL place each resolved field into a key-value map with the field name (or alias) as the key and the resolved value as the value.
   - It starts from leaves and works its way back up to the root (this why our responses resemble our requests).
   - Scalar coercion converts values into the types expected by the schema (e.g. `enum`s will be coerced).
   - GraphQL waits for promises to be resolved before trying to construct the response (just look at my [`createUser` resolver](https://github.com/kasir-barati/graphql/blob/63439cd4029023736636e039a1ddea2686b974b3/apps/todo-backend/src/resolvers/user.resolver.ts#L10-L17), I do NOT have `await` and it is working just fine).
5. Return response:
   - GraphQL returns a JSON as a response for query operation which contains:
     - A `data` key:
       - This is mandated by GraphQL spec ([ref](https://spec.graphql.org/draft/#sec-Data)).
       - May include partial data for the requested fields if errors were raised during the execution of some field resolvers (learn more [here](./common-errors.md#field-errors)).
     - An `error` key:
       - Learn about different reasons that an error might occur [here](./common-errors.md).
     - An `extension` key:
       - No restriction on what can goes inside it.
       - Spec only tell that it <b title="In other word it is optional.">can</b> be sent back as a top-level key.
       - Depends on the GraphQL implementation.
       - Can contain additional info about response, things like:
         - [Rate limit consumption](./glossary.md#rateLimitConsumptionDefinition).
         - [Telemetry data](./glossary.md#telemetryDataDefinition).
   - At least one of `data` or `errors` will be present on the response.
