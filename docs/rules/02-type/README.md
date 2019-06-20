---
pageType: section
path: '/rules/type'
title: '2. Type rules'
---

GraphQL specification defines 5 built-in scalar types - `String`, `Int`, `Float`, `Boolean` and `ID` (a string with a unique identifier). These types are JSON serializable and available in every programming language.

However, when a scalar type is not representable in JSON by default (e.g. `Date`) the backend has to figure out a data format that can be serializable and transmittable via JSON. The backend also needs to deserialize the field received from a client.

In such cases, GraphQL allows you to create your own custom scalar types. [This article](../types/README.md#custom-scalar-types) describes it.

<!-- card-links -->

- [2.1. Use custom scalar types if you want to declare fields or args with specific semantic value.](./type-custom-scalars.md)
- [2.2. Use Enum for fields which contain a specific set of values.](./type-enumerable.md)
