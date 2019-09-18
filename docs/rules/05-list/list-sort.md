---
path: '/rules/list-sort'
title: '5.2. Use argument `sort` of type `Enum` or `[Enum!]` to sort lists.'
---

It is common to allow users to sort lists by a single or even multiple fields.

The first thing the team has to do is choose a name for a sort argument. The following popular names can be used — `sort`, `order`, `orderBy`. Т.к. The word `order` can be treated differently in many contexts (food order, alphabetical order, etc.). Also, it's mainly used in relational databases. Then the best choice of the name for the sort field is `sort`. It can be clearly understood and appreciated by everyone.

Since the argument name is defined, then you must select the type for the sorting argument:

- If we take String, it will be difficult for the client to specify the correct values and we do not get the ability to validate parameters by means of GraphQL.
- You can create an input-type `input ArticleSort { field: SortFieldsEnum, order: AscDescEnum }` — structure from which you can select the field name and a sort type. But this approach will not work if you have a full-text sort or proximity sort. They simply do not have a DESC (reverse sort) value.
- What remains is to use Enum to enumerate the list of available sorts (e.g. `enum ArticleSort { ID_ASC, ID_DESC, TEXT_MATCH, CLOSEST }). In this case, you can explicitly specify the available sorting methods.

Also, if you carefully read how enum types are declared on the server, in addition to the ID_ASC key, you can set the value of id ASC (for SQL), or { id: 1 } (for NoSQL). Т.е. clients see the unified key ID_ASC, but on the server, in the resolve-method, you get a ready value for substitution in the request. Conversion of the sort key takes place inside the Enum-type, which in turn will make the code of your resolve-method smaller and cleaner.

And now, to be able to sort by several fields, we just need to be able to pass an array of values to sort. As a result, we get the following sort declaration:

```graphql
type Query {
  articles(sort: [ArticleSort!]): [Article]
}

enum ArticleSort {
  ID_ASC
  ID_DESC
  TEXT_MATCH
  CLOSEST
}
```
