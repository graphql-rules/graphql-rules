---
path: '/rules/input-non-null'
title: '4.3. Mark arguments as `required` if they are required to fulfill the request.'
---

All fields in GraphQL are `nullable` by default. Hence it's a good practice to mark arguments required for query execution with `GraphQLNonNull` or in case of SDL with an exclamation mark – `String!`. This will allow detecting certain errors on the client at static analysis stage instead of a runtime stage.

In addition, if an argument is defined as required a resolve function on the server might not need to check for its presence. Т.к.

For example, to get a list of articles a consumer has to specify the number of records to return:

```graphql
type Query {
  articles(limit: Int!): [Article]
}
```

You can specify the default value for the argument:

```graphql
type Query {
  articles(limit: Int! = 10): [Article]
}
```

In this case, even though an argument is required it can be omitted by the consumer while the backend gets its required argument set to 10. A combination of a required argument with a default value guards against cases when a consumer tries tricking the system by providing a null value - `query { articles(limit: null) }`. Thanks to the required definition the server will throw an error `Expected type Int!, found null.`.

Required arguments in GraphQL work good and you should use them to define your GraphQL schema in a stricter way.
