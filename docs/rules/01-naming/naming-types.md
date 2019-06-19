---
path: '/rules/naming-types'
title: '1.2. Use UpperCamelCase for naming GraphQL types.'
---

Naming types differ from naming fields.

```diff
-  type blogPost { # bad
-  type Blog_Post { # also bad
+ type BlogPost { # good
   title: String!
  }
```

GraphQL comes with built-in scalar types: `String`, `Int`, `Boolean`, `Float`. All of them are named using `UpperCamelCase`.

Internal GraphQL Introspection Types such as `__Type`, `__Field`, `__InputValue` also follow this convention with 2 underscores at the beginning.

A lot of projects are using the statically typed nature of GraphQL to generate internal type definitions, many of whom use it for static analysis. Both Flowtype and TypeScript use `UpperCamelCase` to name complex types.

According to [Wikipedia](<https://en.wikipedia.org/wiki/Naming_convention_(programming)>), we should use `UpperCamelCase` in JavaScript, Java, Swift, and Kotlin for classes and type declarations.
