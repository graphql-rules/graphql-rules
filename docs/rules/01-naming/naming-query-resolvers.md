---
path: '/rules/naming-query-resolvers'
title: '1.4. Avoid using `get` in your Query resolvers.
---

The rule goes without saying. Avoid using `get` in your Query resolvers. A resolver is a function that **resolves** a value for a field in a schema, so using `get` is redundant and likely inherited from RESTful API naming conventions. But keep action verbs in Mutations - like **delete**, **create**.

```diff
post {
-  getLikedByUsers(first: Int) # BAD
+  likedByUsers(first: Int) # GOOD
}
```
