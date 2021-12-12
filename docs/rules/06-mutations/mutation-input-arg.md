---
path: '/rules/mutation-input-arg'
title: '6.5. In mutations, put all variables into one unique input argument.'
---

Try to use one input argument in mutations. It is much easier to use on the client side. The client will need to pass just one variable, not a wagon for each argument in the mutation.

```graphql
# Good:
mutation ($input: UpdatePostInput!) {
  updatePost(input: $input) { ... }
}

# Not so good – it's harder to write a query (duplication of variables)
mutation ($id: ID!, $newText: String, ...) {
  updatePost(id: $id, newText: $newText, ...) { ... }
}
```

If the mutation has at the top level only one or two arguments, then it's become more readable. At the same time, without additional costs, except for a few additional keystrokes, the nesting of the arguments allows you to fully use the capabilities of GraphQL, as a version-less API. Nesting gives you the ability to expand the types over time as well as the avoid conflicts in the naming of the fields.

Also, static typing with Typescript or Flowtype makes it much easier to track changes in your API when your code binds to a single complex type rather than a set of disparate arguments.

Think of putting arguments into one common input argument as an investment in future changes to your GraphQL API.

At the same time do not skimp on the types – for each mutation, start your Input-type with a unique name. This will allow you to change mutations without looking at the fact that the new semantics can break other mutations.

Also, as of the end of 2018, the GraphQL specification does not have the ability to deprecate arguments (mark them as obsolete). But deprecating field inside the type of input is possible. This is another reason to use the input argument with nesting.

This rule can be validated using `graphql-eslint`, read more about [`input-name`](https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/input-name.md) rule.
