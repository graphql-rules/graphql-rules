---
path: '/rules/list-limit-skip'
title: '5.3 Use `limit` with a default value and `skip` to limit the number of returned items in a list.'
---

There is a simple solution to limit the number of items in the list. Use arguments called `limit` and `skip`. Provide a default value for `limit` is also considered a best practice. Use NonNull constraint for `limit` to avoid the `null` passed as an argument value.

```graphql
type Query {
  articles(limit: Int! = 20, skip: Int): [Article]
}
```
