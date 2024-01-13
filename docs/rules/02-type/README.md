---
pageType: section
path: '/rules/type/'
title: '2. Type rules'
---

GraphQL specification defines 5 built-in scalar types - `String`, `Int`, `Float`, `Boolean` and `ID` (a string with a unique identifier). These types are JSON serializable and available in every programming language.

Be careful with the built-in scalar `Int` type:
- This is the `signed 32-bit integer`.
- If the integer interval value represents a value less than `-2^31` or greater than or equal to `2^31`, a __field error should be raised__.
- In numbers: `-2'147'483'648` / `2'147'483'647`.

These numbers in real life:
- Time (in milliseconds): __~24.86 days__
- Data Volume (in bytes): __~2.15 Gb__

If you return from the backend or pass via client an argument whose value is not within the `32-bit Int` interval - you'll get an error: __Int cannot represent non-32-bit signed integer value__.

However, when a scalar type is not representable in JSON by default (e.g. `Date`) the backend has to figure out a data format that can be serializable and transmittable via JSON. The backend also needs to deserialize the field received from a client.

In such cases, GraphQL allows you to create your own custom scalar types.

<!-- card-links -->

- [2.1. Use custom scalar types if you want to declare fields or args with specific semantic value.](./type-custom-scalars.md)
- [2.2. Use Enum for fields which contain a specific set of values.](./type-enumerable.md)
