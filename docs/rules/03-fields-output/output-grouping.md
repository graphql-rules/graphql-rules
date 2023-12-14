---
path: '/rules/output-grouping'
title: '3.3. Colocate related fields in custom types'
---

#### Problem:

In some cases, a Type is expected to have a different set of non-null fields depending on the value of another field. Consider a type representing claims received by phone or email:

```graphql
type Claim {
  text: String!
  phone: String
  operatorCode: String
  email: String
}
```

This type definition results in an object in 2 possible configurations from our business requirements:
- emailed claims have a NonNull `email` field but `null` `operatorCode` and `phone`
- claims received by phone have NonNull `operatorCode` and `phone` fields but `null` `email` field

It's easy to see how this would result in extra work by the client consuming the response as `null` checks would have to be made.  

#### Goal:

Define `Claim` in a way that maximizes the number of non-`null` fields. By doing so we reduce the number of `null` checks required on the client side.

#### Solutions:

In the original `Claim` type all fields are nullable except for `text`. API consumers will need to check every value before processing it.

##### Consider two solutions:

1. Create a new type with related fields 
2. Use [`union`](https://spec.graphql.org/June2018/#sec-Unions) types with fragments

##### Solution 1: Create a new type with related fields

Let's create a new type `ClaimByPhone` that contains NonNull `phone` and `operatorCode` fields. Then our schema can be represented as follows:

```graphql
type Claim {
  text: String!
  byPhone: ClaimByPhone
  byMail: ClaimByMail
}

type ClaimByPhone {
  phone: String!
  operatorCode: String!
}

type ClaimByMail {
  email: String!
}
```

Now if `byPhone` isn't `null` then it surely contains a `phone` and `operatorCode`, making interrelated fields mandatory.

##### Solution 2: Use union types with fragments

If you are not familiar with [Union types](https://spec.graphql.org/June2018/#sec-Unions) you can think of them as "either A or B but not both".

```graphql
# Basic interface for complaint
interface ClaimBase {
  text: String!
}

# Type for complaint came by phone
type ClaimByPhone implements ClaimBase {
  text: String!
  phone: String!
  operatorCode: String!
}

# Type for complaint came by email
type ClaimByMail implements ClaimBase {
  text: String!
  email: String!
}

# Union type for a complaint
union Claim = ClaimByPhone | ClaimByMail
```

Then the client requests `Сlaim` with fragments as follows:

```graphql
query {
  claim {
    ... on ClaimByPhone {
      text
      phone
      operatorCode
    }
    ... on ClaimByMail {
      text
      email
    }
  }
}
```

Both approaches make the schema more strict, readable, and easier for frontend developers to deal with related fields.
