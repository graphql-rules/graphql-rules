---
path: '/rules/mutation-namespaces'
title: '6.1. Use Namespace-types to group mutations within a single resource.'
---

In most GraphQL schemas it's scary to look at the mutations. Medium sized APIs may easily contain 50-100 mutations, and all that on the same level. Trying to find the required operation in such list is quite hard.

Shopify recommends sticking to this naming pattern `collectionAction`. It helps to group operations under one resource at least alphabetically. Some are against such approach and force `actionCollection` pattern instead.

Either way, there is a better approach - Namespace-types. Namespace types are the types that contain a set of operations against one resource. If you imagine the path of request using dot-notation it will look like `Mutation.collection.action`.

Implementation in Node.js is quite trivial. Here are some examples, using different libraries:

Implementation using starndard `graphql`:

```js
// Create Namespace type for Article mutations
const ArticleMutations = new GraphQLObjectType({
  name: 'ArticleMutations',
  fields: () => {
    like: {
      type: GraphQLBoolean,
      resolve: () => { /* resolver code */ },
    },
    unlike: {
      type: GraphQLBoolean,
      resolve: () => { /* resolver code */ },
    },
  },
});

// Add `article` to regular mutation type with small magic
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    article: {
      type: ArticleMutations,
      resolve: () => ({}), // ✨✨✨ magic! which allows to proceed call of sub-methods
    }
  },
});
```

Same, but using `graphql-tools`.

```js
const typeDefs = gql`
type Mutation {
    article: ArticleMutations
  }

  type ArticleMutations {
    like: Boolean
    unlike: Boolean
  }
`;

const resolvers = {
  Mutation: {
    article: () => ({}), // ✨✨✨ magic! which allows to proceed call of sub-methods
  }
  ArticleMutations: {
    like: () => { /* resolver code */ },
    unlike: () => { /* resolver code */ },
  },
};
```

Using `graphql-compose`:

```js
schemaComposer.Mutation.addNestedFields({
  'article.like': {
    // ✨✨✨ magic! Just use dot-notation with `addNestedFields` method
    type: 'Boolean',
    resolve: () => {
      /* resolver code */
    },
  },
  'article.unlike': {
    type: 'Boolean',
    resolve: () => {
      /* resolver code */
    },
  },
});
```

After these changes, clients will easily see what kind of operations are available against `article` "resource/model". And their requests to the server will look like:

```graphql
mutation {
  article {
    like(id: 15)
  }

  ### Forget about ugly mutations names!
  # articleLike
  # likeArticle
}
```

If a client will make a series of mutations (this is an antipattern - you need to make general mutation), they will be able to do the same thing with nested mutations using aliases. In detail, you can check out this test, where mutations like/unlike are working asynchronously with execution timeout. In short here are the results:

```js
await graphql({
  schema,
  source: `
  mutation {
    op1: article { like(id: 1) }
    op2: article { like(id: 2) }
    op3: article { unlike(id: 3) }
    op4: article { like(id: 4) }
  }
`,
});

expect(serialResults).toEqual([
  'like 1 executed with timeout 100ms',
  'like 2 executed with timeout 100ms',
  'unlike 3 executed with timeout 5ms',
  'like 4 executed with timeout 100ms',
]);
```

So, in conclusion, to remove the clutter in your mutations, use Namespace-types to group mutations under one resource!
