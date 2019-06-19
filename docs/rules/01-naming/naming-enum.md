---
path: '/rules/naming-enum'
title: '1.3. Name ENUM types using `CAPITALIZED_WITH_UNDERSCORES` style.'
---

In GraphQL an enum represents a list of available values for specific type.

```diff
enum Sort {
+  NAME_ASC # GOOD
-  nameAsc # BAD
-  NameAsc # BAD
   NAME_DESC
   AGE_ASC
   AGE_DESC
}
```

For example, GraphQL uses \_\_TypeKind enum with values SCALAR, OBJECT, INPUT_OBJECT, NON_NULL in Introspection queries. So CAPITALIZED_WITH_UNDERSCORES is being used for enum types.

If we think about the enum type as a set of constants, almost all programming languages use CAPITALIZED_WITH_UNDERSCORES to define constant values.

Naming enums in CAPITALIZED_WITH_UNDERSCORES style makes it easy to spot them in GraphQL queries:

```graphql
query {
  findUser(sort: ID_DESC) {
    id
    name
  }
}
```
