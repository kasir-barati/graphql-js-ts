# Field Resolver

`nx serve field-resolver`

```graphql
query {
  findOneProduct(id: "some id") {
    id
    greetMe {
      message
      someField
    }
  }
}
```
