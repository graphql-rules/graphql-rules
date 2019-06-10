### 3.3. Colocate related fields in custom types

#### Problem:

In some cases, a Type is expected to have a different set of non-null fields depending on the value of another field. Consider a `Claim` that can be filed either by mail or by phone. The `operatorCode` field stores code of the operator who received the call and null if the Claim was filed by an email. Т.е. оно всегда заполнено если указан телефон, и пустое если жалоба пришла по почте.

```graphql
type Claim {
  text: String!
  phone: String
  operatorCode: String
  email: String
}
```

#### Goal:

Define `Claim` in a way that maximizes the number of non-null fields. By doing that we reduce the number of null checks required on the client side.

#### Solutions:

In the original Claim type all fields are nullable except for <0>text</0> API consumers will need to check every value before processing it.

##### Consider two solutions:

1. Create a new type with related fields 2) Use union types with fragments

##### Solution 1: Create a new type with related fields

Выносите взаимосвязанные поля на уровень ниже в новый output-тип. Let's create a new type `ClaimByPhone` that contains `phone` and `operatorCode` both of which are NonNull. Then our scheme can be represented as follows:

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

Now if `byPhone` isn't null then it surely contains a phone number and operator code. It becomes possible to make interrelated fields mandatory.

##### Solution 2: Use union types with fragments

If you are not familiar with Union types you can think of them as "either A or B but not both". You can find more details about Union types [here](https://github.com/nodkz/conf-talks/tree/master/articles/graphql/types#union-types).

```graphql
# Basic type for complaint
type ClaimBase {
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

Then the client requests Сlaim with fragments as follows:

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

Both approaches make the scheme more strict and easier for frontend developers to deal with related fields.
