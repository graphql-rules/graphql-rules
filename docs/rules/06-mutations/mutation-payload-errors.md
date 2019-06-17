---
path: '/rules/mutation-payload-errors'
title: '6.6.4. In the mutation response, return the errors field with typed user errors.'
---

In the resolver, you can throw the exhibition, and then the error flies to the global level, but you can not do so for the following reasons:

- global-level errors are used for parsing errors and other server-side errors
- on the client side, it is hard to parse this array of global errors
- the client does not know what errors can occur, they are not typed and are absent in the scheme.

```diff
type Mutation {
  likePost(id: 1): LikePostPayload
}

type LikePostPayload {
   record: Post

+  errors: [LikePostProblems!]
}
```

Mutations should return user errors and business logic error immediately in the Payload of the mutation into the field `errors`. All errors must be described with the suffix Problem. And for the mutation itself, you need to have a Union-type of errors, where possible user errors will be listed. This will make it easy to identify errors on the client side and immediately understand what can go wrong. Moreover, it will allow the client to request additional metadata about the error.

First, you need to create an interface for errors and you declare a couple of global errors. The interface is required to be able to read a text message no matter what error is returned. But each specific error can already be extended with additional values, for example, in the error SpikeProtectionProblem the wait field is added:

```graphql
interface ProblemInterface {
  message: String!
}

type AccessRightProblem implements ProblemInterface {
  message: String!
}

type SpikeProtectionProblem implements ProblemInterface {
  message: String!
  # Timout in seconds when the next operation will be executed without errors
  wait: Int!
}

type PostDoesNotExistsProblem implements ProblemInterface {
  message: String!
  postId: Int!
}
```

Well, then you can describe our mutation likePost with the return of user errors:

```graphql
type Mutation {
  likePost(id: Int!): LikePostPayload
}

union LikePostProblems = SpikeProtectionProblem | PostDoesNotExistsProblem;

type LikePostPayload {
  recordId: Int
  # `record` is nullable! If there is an error we may return null for Post
  record: Post
  errors: [LikePostProblems!]
}
```

Thanks to the union-type LikePostProblems now through introspection clients will know what errors could be returned when you call the mutation likePost. For example, for such a request, they can read the name of the error from the \_\_typename field for any type of error. Also thanks to the interface they can also read the message from any type of errors:

```graphql
mutation {
  likePost(id: 666) {
    errors {
      __typename
      ... on ProblemInterface {
        message
      }
    }
  }
}
```

And if clients are smart, you can request additional fields for the necessary errors:

```graphql
mutation {
  likePost(id: 666) {
    recordId
    record {
      title
      likes
    }
    errors {
      __typename
      ... on ProblemInterface {
        message
      }
      ... on SpikeProtectionProblem {
        message
        wait
      }
      ... on PostDoesNotExistsProblem {
        message
        postId
      }
    }
  }
}
```

And get a response from the server in this shape:

```js
{
  data: {
    likePost: {
      errors: [
        {
          __typename: 'PostDoesNotExistsProblem',
          message: 'Post does not exists!',
          postId: 666,
        },
        {
          __typename: 'SpikeProtectionProblem',
          message: 'Spike protection! Please retry later!',
          wait: 20,
        },
      ],
      record: { likes: 0, title: 'Post 666' },
      recordId: 666,
    },
  },
}
```
