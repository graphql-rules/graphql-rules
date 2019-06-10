### 6.3. Consider the ability to perform mutations on multiple items (same type batch changes).

A rule adjusted after remark: Ivan Goncharov #42 date of last revision: 17.05.2019

```diff
type ArticleMutations {
-  deleteArticle(id: Int!): Payload
+  deleteArticle(id: [Int!]!): Payload
}

```

Client applications become smarter and more convenient. Often, a user is offered with batch operations – adding multiple records, mass deletion or sorting. It will be expensive to send operations one by one. Somehow aggregating them into a complex GraphQL query with several mutations, i.e. dynamically generating one common query on the client is a completely disgusting idea:

```graphql
mutation DeleteArticles { # BAD
  op1: deleteArticle(id: 1)
  op2: deleteArticle(id: 2)
  op3: deleteArticle(id: 5)
  op4: deleteArticle(id: 5)
}
```

If the GraphQL query is dynamically created in the runtime (the query body itself, not the collection of variables) – then most likely you are doing something wrong. The request form should be defined by the developers at the stage of writing the code. This allows linters and static analyzers to check queries; and allows you to "compile" a query (convert to AST) for Relay/Apollo. When dynamically generating a request on the client in the browser, all these checks and optimizations are lost.

Thanks to the GraphQL specification - List Input Coercion, you can declare the id argument as an array id: [Int!]!, then clients will be able to pass in their queries as a simple number and an array:

```graphql
mutation DeleteArticles {
  op1: deleteArticle(id: [1, 2, 5]) # works
  op2: deleteArticle(id: 7) # works too
}
```

The same works if you use variables (you can see [tests](./__tests__/list-coercion-test.js)):

```js
await graphql({
  schema,
  source: `
    mutation DeleteArticles($id: [Int!]!) {
      deleteArticle(id: $id)
    }
  `,
  variableValues: { id: 777 }, // Should be `Array`, but works with `Int` too
});
```

Also, sometimes it is important for backenders to understand that there is a mass operation. Т.к. You can optimize logic or side effects, such as sending 1 notification or 1000.