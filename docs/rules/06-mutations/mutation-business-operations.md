---
path: '/rules/mutation-business-operations/'
title: '6.2. Think out of the CRUD box - create small mutations for different business operations against the resources.'
---

```diff
type ArticleMutations {
   create(...): Payload
   update(...): Payload
+  like(...): Payload
+  unlike(...): Payload
+  publish(...): Payload
+  unpublish(...): Payload
}
```

With GraphQL, you should go above typical CRUD (create, read, update, delete). If you will hang all of the changes on `update` mutation, it will immediately become too massive and hard to maintain. And here we're talking not about simple editing of title or description but about something that is "complex". E.g. for article publishing, create `publish` and `unpublish`. Likes needed? Create `like` and `unlike` mutations. Remember, your clients barely imagine the whole structure of connections between your data and what field does what. So these simple and useful operations make so the client can get what is possible very quickly.

While server-side can easier distinct what kinds of operations are the most popular. To optimize heavy paths only.
