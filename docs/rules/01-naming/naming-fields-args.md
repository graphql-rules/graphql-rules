---
path: '/rules/naming-fields-args/'
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

API consumers constantly have to deal with Field and Argument names. If a GraphQL response can contain fields formatted according to consumer rules, who are often frontend and mobile developers, we can avoid remapping and renaming them. After all, if clients pull your API, then it'll be likely that they use your naming for variables in their code. So, mapping field names in a convenient format is not very interesting work.

According to [Wikipedia](<https://en.wikipedia.org/wiki/Naming_convention_(programming)>), the following programming languages (consumers of GraphQL API) are following these conventions for variable naming:

- JavaScript — `camelCase`
- Java — `camelCase`
- Swift — `camelCase`
- Kotlin — `camelCase`

While it's possible to use `under_score` in those languages, people tend to stick to `camelCase`. If you find any statistics related to the usage of `camelCase` and `under_score` in any programming language, please let us know.

Also, if you look at GraphQL sources and find [IntrospectionQuery](https://github.com/graphql/graphql-js/blob/master/src/utilities/introspectionQuery.js), you see that its fields and arguments are written using `camelCase` as well.

This rule can be validated using `graphql-eslint`, read more about [`naming-convention`](https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/naming-convention.md) rule.
