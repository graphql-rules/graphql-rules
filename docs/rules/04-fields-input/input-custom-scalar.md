---
path: '/rules/input-custom-scalar/'
title: '4.2. Use strict scalar types for arguments'
---

Try using a stricter type for input data. For example, define a new scalar type `DateTime` instead of using a `String`. As you might know, GraphQL has 5 built-in scalar types and `date` isn't one of them. However, GraphQL allows to create a custom scalar type with type description and implement your own type validation, serialization and deserialization rules.

```diff
type Mutation {
-  setTime(date: String):   SetTimePayload  # BAD
+  setTime(date: DateTime): SetTimePayload  # GOOD
}
```

When creating a custom scalar type we only need to define conversion rules once.

Strict scalar types, such as DateTime, can provide consumers with valuable information. For example, they can encourage frontend developers to use stricter UI components such as date widgets instead of plain text fields.

Here is the example of scalar type creation in Node.js:

```js
import { GraphQLScalarType, GraphQLError } from 'graphql';

export default new GraphQLScalarType({
  // 1) --- DEFINE TYPE METADATA ---
  // Each type needs it own unique name
  name: 'DateTime',
  // Good practice is to define your type decription, so it can be displayed in the documentation
  description: 'A string which represents a date and time',

  // 2) --- DEFINE HOW TO RETURN TYPE TO THE CONSUMER ---
  // You need to implement 'serialize' function that would convert
  // value to the suitable json-value so it can be sent to your consumer
  serialize: (v: Date) => v.getTime(), // return 1536417553

  // 3) --- DEFINE HOW TO RECEIVE TYPE FROM THE CONSUMER ---
  // To receive value from the client ,validate it and convert it to desired type/object
  // you need to define two functions

  // 3.1) first one is `parseValue`, is used when consumer sent value through GraphQL variable:
  // {
  //   variableValues: { "date": 1536417553 }
  //   source: `query ($date: DateTimestamp) { setDate(date: $date) }`
  // }
  parseValue: (v: integer) => new Date(v),

  // 3.2) second is `parseLiteral`, is used when consumer sent value in GraphQL request body:
  // {
  //   source: `query { setDate(date: 1536417553) }`
  // }
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      throw new GraphQLError('Field error: value must be Integer');
    } else if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // ast value is always in string format
    }
    return null;
  },
});
```
