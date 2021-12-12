---
path: '/rules/mutation-payload-query'
title: '6.6.3. In the mutation response, return a field of type Query.'
---

If your mutations return a Payload type, be sure to add a query field with the Query type to it.

```diff
type Mutation {
  likePost(id: 1): LikePostPayload
}

type LikePostPayload {
   record: Post

+  query: Query
}
```

This will allow the client in one round-trip not only to call mutation but also to get a wagon of data to update their application. For example, we like some likePost article and then immediately in the response through the query field we can request any data that is available to us in the API (in our example, a list of recent articles with activity `lastActivePost`).

```graphql
mutation {
  likePost(id: 1) {
    record {
      id
      title
      likes
    }
    query {
      lastActivePosts {
        id
        title
        likes
      }
    }
  }
}
```

If the mutation returns a query, then the wildest profit is opened for clients – the ability to immediately request any data for your application after some terrible mutation in one HTTP request. And if the client uses Relay or ApolloClient with named fragments, updating half of the application becomes easy. No need to write a second request for data and somehow throw them in the right place. Everything is updated magically itself, you just need to write a mutation with existing fragments from your application:

```graphql
mutation {
  likePost(id: 1) {
    query {
      ...LastActivePostsComponent
      ...ActiveUsersComponent
    }
  }
}
```

On the server side, you can add the query in the Payload-type as follows:

Implementation using standard `graphql`:

```js
const QueryType = new GraphQLObjectType({ name: 'Query', fields: ... });
const MutationType = new GraphQLObjectType({ name: 'Mutation', fields: () => {
  likePost: {
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    type: new GraphQLObjectType({
      name: 'LikePostPayload',
      fields: {
        record: { type: PostType },
        recordId: { type: GraphQLInt },
        query: { type: new GraphQLNonNull(QueryType) }, // ✨✨✨ magic – add 'query' field with 'Query' root-type
      },
    }),
    resolve: async (_, { id }, context) => {
      const post = await context.DB.Post.find(id);
      post.like();
      return {
        record: post,
        recordId: post.id,
        query: {}, // ✨✨✨ magic - just return empty Object
      };
    },
  }
}});
```

Same, but using `graphql-tools`.

```js
const typeDefs = gql`
  type Query { ...}
  type Post { ... }
  type Mutation {
    likePost(id: Int!): LikePostPayload
  }
  type LikePostPayload {
    recordId: Int
    record: Post
    # ✨✨✨ magic – add 'query' field with 'Query' root-type
    query: Query!
  }
`;

const resolvers = {
  Mutation: {
    likePost: async (_, { id }, context) => {
      const post = await context.DB.Post.find(id);
      post.like();
      return {
        record: post,
        recordId: post.id,
        query: {}, // ✨✨✨ magic - just return empty Object
      };
    },
  },
};
```

Using `graphql-compose`:

```js
schemaComposer.Mutation.addFields({
  likePost: {
    args: { id: 'Int!' },
    type: `type LikePostPayload {
      record: Post
      recordId: Int
      # ✨✨✨ magic – add 'query' field with 'Query' root-type
      query: Query!
    }`,
    resolve: async (_, { id }, context) => {
      const post = await context.DB.Post.find(id);
      post.like();
      return {
        record: post,
        recordId: post.id,
        query: {}, // ✨✨✨ magic - just return empty Object
      };
    },
  }
});
```

This rule can be validated using `graphql-eslint`, read more about [`require-field-of-type-query-in-mutation-result`](https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/require-field-of-type-query-in-mutation-result.md) rule.
