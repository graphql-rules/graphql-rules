---
pageType: section
path: '/rules/naming'
title: '1. Naming rules'
---

GraphQL uses regexp `/[_A-Za-z][_0-9A-Za-z]*/` to validate property and type names. In other words, GraphQL lets you use multiple styles, such as, `camelCase`, `under_score`, `UpperCamelCase` and `CAPITALIZED_WITH_UNDERSCORES`. Notice that that `kebab-case` is not supported.

The support for multiple naming conventions leads to a question of which one to use.

We could refer to [Eye Tracking's](http://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf) research, that tried to analyze `camelCase` and `under_score`. However, it didn't find any favorites.

In the absence of conclusive research, we suggest to follow the rules: Давайте будем разбираться в каждом конкретном случае.

<!-- card-links -->

- [1.1. Use `camelCase` for GraphQL fields and arguments.](./naming-fields-args.md)
- [1.2. Use `UpperCamelCase` for GraphQL types.](./naming-types.md)
- [1.3. Use `CAPITALIZED_WITH_UNDERSCORES` to name ENUM types.](./naming-enum.md)
