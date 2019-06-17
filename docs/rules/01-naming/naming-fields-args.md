---
path: '/rules/naming-fields-args'
title: '1.1. Use `camelCase` to name fields and arguments.'
---

Fields:

```diff
type User {
+  isActive: boolean # GOOD
-  is_active: boolean # BAD
}
```

Arguments:

```diff
type Query {
+  users(perPage: Int): boolean # GOOD
-  users(per_page: Int): boolean # BAD
}
```

API consumers constantly have to deal with Field and Argument names. наши любимые клиенты — браузеры с JavaScript и разработчики мобильных приложений. If GraphQL response can contain fields formatted according to consumer rules, who are often frontend and mobile developers, we can avoid remapping and renaming them. After all, if clients pull your API, then likely they use your naming for variables in their code. So, mapping field names in a convenient format are not very interesting work.

According to [Wikipedia](<https://en.wikipedia.org/wiki/Naming_convention_(programming)>), the following programming languages (consumers of GraphQL API) are following these conventions for variables naming:

- JavaScript — `camelCase`
- Java — `camelCase`
- Swift — `camelCase`
- Kotlin — `camelCase`

While it's possible to use `under_score` in those languages people tend to stick to <0>camelCase</0>. but in general `camelCase` is used more often. If you find any statistics related to the usage of `camelCase` and `under_score` in any programming language, please let me know. Кругом сплошной субъективизм.

Also if you look at GraphQL sources and find [IntrospectionQuery](https://github.com/graphql/graphql-js/blob/master/src/utilities/introspectionQuery.js), you see that its fields and arguments are written using `camelCase` as well.

P.S. So sad to see examples with `under_score` in MySQL or PostgreSQL documentation. Eventually, it moves to front-end from GraphQL as well as back-end. These DBMSs support `camelCase`, but since we don't have any naming convention there are a lot of holy wars related to `under_score` and `camelCase` usage. It could be painful to rename fields in a started project. In general, back-end developer chooses `under_score`, that's why he should map it to `camelCase` for client.
