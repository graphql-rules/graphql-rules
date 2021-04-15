---
path: '/rules/input-grouping'
title: '4.1. Put coupled arguments into own input-types.'
---

It is quite often that certain arguments are logically connected. For example, a list of articles `[Article]` can be filtered by `lang`, `userId` and `rating` fields and sized using `limit` field. It is not advisable to have those arguments on the same level:

- it makes harder for an API consumer to understand the relationship between arguments
- in the future, you might encounter issues when the argument name is already taken

Instead of having arguments on the same level group them. For example, arguments related to filtering can be grouped into `filter` argument of `ArticleFilter` type:

```graphql
type Query {
  articles(filter: ArticleFilter, limit: Int): [Article]
}

input ArticleFilter {
  lang: String
  userId: Int
  rating: MinMaxInput
}

input MinMaxInput {
  min: Int
  max: Int
}
```

The same rule applies to fields within input types. Consider filtering by `rating` field. Instead of two separate arguments `ratingMin` and `ratingMax`, a new input-type `MinMaxInput` is introduced.

By grouping related arguments into sub-types the schema is easier to comprehend and ready to be extended in the future.
