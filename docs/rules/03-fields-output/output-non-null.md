---
path: '/rules/output-non-null'
title: '3.2. Make the fields `NonNull` if data is returned in any situation.'
---

Defining a field in your schema as `NonNull` means that GraphQL promises to always return a value when the field is queried. It allows clients to do fewer response validation checks in their code and improves static analysis. Event if backend does not return data on a required (NonNull) field, GraphQL will return an error stating that there is no data. In this case, the parent object value will be set to null. If the parent object is also a required field (NonNull) then the error will propagate higher. In any case, the consumer will not receive an object (GraphQL type) without a data for a required (NonNull) field.

This rule also applies to arrays.

```graphql
type MyLists {
  list1: [String] # [], [null], null
  list2: [String]! # [], [null]
  list3: [String!] # [], null
  list4: [String!]! # []                <-- BETTER!
}
```

If you intend to always return an array mark it as `[SomeType]!` (`new GraphQLNonNull(new GraphQLList(SomeType))`). By default, all fields in GraphQL are "nullable" (can be set to null), so users need to first check if array exists before iterating over it. This makes code harder to read and comprehend. Therefore, if you always return an array mark the field as NonNull. At the same time, the array itself may contain null elements, if you always return an array of non-null elements, then mark it as `[SomeType!]!` (`new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SomeType)))`).

One last example, consider a `Boolean` field. By default, it is "nullable" and can be in 3 states: true, false and null which is rarely desirable.

```graphql
type MyBool {
  bool1: Boolean # true, false, null
  bool2: Boolean! # true, false
}
```
