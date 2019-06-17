---
path: '/rules/list-filter'
title: '5.1. Use `filter` argument to filter list'
---

Consider two approaches to organizing filtering. One where all arguments are on the same level:

```graphql
type Query {
  articles(authorId: Int, tags: [String], lang: LangEnum): [Article]
}
```

and another one where there is a single argument `filter` of type `ArticleFilter`:

```graphql
type Query {
  articles(filter: ArticleFilter): [Article]
}

input ArticleFilter {
  authorId: Int
  tags: [String]
  lang: LangEnum
}
```

Combining filter options inside one `filter` argument of type <0>ArticleFilter</0> is better. На это есть несколько причин:

- non-filter arguments (e.g. sorting, limit, offset, page number, cursor, language) are clearly separated from filter arguments
- consumers will get a `ArticleFilter` type for static analysis. This also reduces the likelihood of errors on the client
- it's much easier to reason about GraphQL API when fields have a small number of 3-5 arguments. You can locate the `filter` argument and drill down into the available options
- the same filter type can be reused in other places where articles (or other objects) are requested

Having a consistent name for a filter field across the schema is important. Without a standard teams can introduce multiple names in the same API such as `filter`, `where`, `condition` and `f` based on their background. Given that there are SQL and NoSQL databases, caches and other services, then **the most appropriate name for the filtering argument is `filter` **. It is clear and suitable for everyone! А вот этот `where` в основном для SQL-бэкендеров.
