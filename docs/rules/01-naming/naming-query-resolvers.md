---
path: '/rules/naming-query-resolvers/'
title: '1.4. Avoid using `get` in your Query resolvers.'
---

The rule goes without saying. Avoid using `get` in your Query resolvers. A resolver is a function that **resolves** a value for a field in a schema, so using `get` is redundant and likely inherited from RESTful API naming conventions. But keep action verbs in Mutations - like **deletePost**, **createPost**.

```diff
query {
  post {
-    getLikedByUsers(first: Int) # BAD
+    likedByUsers(first: Int) # GOOD
  }
}
```

Frontend developers with the query above in their code will use it something like this (and it's obvious that `getLikedByUsers` looks a little bit awkward):

```diff
export function Example() {
  const { data } = useQuery();
-  return <div>{data.post.getLikedByUsers}</div>
+  return <div>{data.post.likedByUsers}</div>
}
```
