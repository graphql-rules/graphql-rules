---
path: '/rules/type-enumerable'
title: '2.2. Use Enum for fields that contain a fixed set of values.'
---

A lot of times schemas include fields that represent a finite set of values. For example `order status`, `country code`, `payment type`. Using a `String` or `Int` types doesn't help your consumers to understand which values may be received.

Of course, you can enumerate possible values in schema documentation but this is not advisable since GraphQL has a type `Enum`.

Incoming values of `Enum` type are checked during the query validation step. They can also be checked during development with the help of linters and static analyzers. Using Enum types makes GraphQL API clearer and reduces the number of runtime validation errors.

```diff
type User {
-  status: String # BAD
+  status: StatusEnum # GOOD
}

+ enum StatusEnum {
+   ACTIVE
+   PENDING
+   REJECTED
+ }
```
