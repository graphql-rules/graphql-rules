---
path: '/rules'
title: 'GraphQL-scheme design'
---

[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)

# GraphQL-scheme design — make API comfortable, prevent pain and suffering

Rules and recommendations mentioned in this paper were results of 3-years experience of using GraphQL both on front-end and back-end side. Also, we use recommendations and experience of Caleb Meredith (PostGraphQL author, Facebook ex-employee) and Shopify engineers.

This article could be changed in the future, cause current rules are advisory and may be improved, changed, or even become antipattern. But what is written here, suffered time and pain from the use of horrible GraphQL-schemes.

If you think that any rule is a complete mess or it is not fully disclosed, or want to add your own – please open the issue or hit me on the telegram by nickname @nodkz. Errors and typos can be corrected by clicking on the pencil in the upper right corner. I've only just started to make the rules, but to finish the job and stick it all together, only collaborative work can help us.

## TL;DR of all rules

- **1. Naming rules**
  - [1.1.](./01-naming/naming-fields-args.md) Use `camelCase` for GraphQL-fields and arguments.
  - [1.2.](./01-naming/naming-types.md) Use `UpperCamelCase` for GraphQL-types.
  - [1.3.](./01-naming/naming-enum.md) Use `CAPITALIZED_WITH_UNDERSCORES` to name ENUM-types.
- **2. Type rules**
  - [2.1.](./02-types/type-custom-scalars.md) Use custom scalar types if you want to declare fields or args with specific semantic value.
  - [2.2.](./02-types/type-enumerable.md) Use Enum for fields which contain a specific set of values.
- **3. Field Rules (Output)**
  - [3.1.](./03-fields-output/output-semantic-names.md) Use semantic names for fields and avoid leaking of implementation details in fields names.
  - [3.2.](./03-fields-output/output-non-null.md) Use `Non-Null` field if field will always have a given field value.
  - [3.3.](./03-fields-output/output-grouping.md) Group as many related fields into custom Object type as possible.
- **4. Argument rules (Input)**
  - [4.1.](./04-fields-input/input-grouping.md) Group coupled arguments to the new input-type.
  - [4.2.](./04-fields-input/input-custom-scalar.md) Use strict scalar types for arguments, eg. `DateTime` instead of `String`.
  - [4.3.](./04-fields-input/input-non-null.md) Mark arguments as `required`, is they are required for query execution.
- **5. Rules of lists**
  - [5.1.](./05-list/list-filter.md) To filter the lists, use the `filter` argument, which contains all the available filters.
  - [5.2.](./05-list/list-sort.md) Use argument `sort` of type `Enum` or `[Enum!]` for listings sorting.
  - [5.3.](./05-list/list-limit-skip.md) Use `limit` with default value and `skip` to limit number of returned items in list.
  - [5.4.](./05-list/list-pagination.md) Use `page`, `perPage` args for pagination and return output type with `items` (array of elements) and `pageInfo` (meta-data).
  - [5.5.](./05-list/list-cursor-connection.md) For infinite lists (infinite scroll) use [Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm).
- **6. Mutation rules**
  - [6.1.](./06-mutations/mutation-namespaces.md) Use Namespace-types to group mutations within a single resource.
  - [6.2.](./06-mutations/mutation-business-operations.md) Go beyond CRUD – create small mutations for different business operations on resources.
  - [6.3.](./06-mutations/mutation-batch-changes.md) Consider the ability to perform mutations on multiple items (same type batch changes).
  - [6.4.](./06-mutations/mutation-required-args.md) Mutations should clearly describe all the mandatory arguments, there should be no options either-either.
  - [6.5.](./06-mutations/mutation-input-arg.md) In mutations, put all variables into one unique input argument.
  - [6.6.](./06-mutations/mutation-payload.md) Every mutation should have a unique payload type.
    - [6.6.1.](./06-mutations/mutation-payload-record.md) In the mutation response, return the modified resource and its `id`.
    - [6.6.2.](./06-mutations/mutation-payload-status.md) Return operation status in mutation response.
    - [6.6.3.](./06-mutations/mutation-payload-query.md) In the mutation response, return a field of type `Query`.
    - [6.6.4.](./06-mutations/mutation-payload-errors.md) In the mutation response, return the `errors` field with typed user errors.
- **7. Rules of linkages between types (relationships)**
  - [7.1.](./07-relations/relations-hairy-graphql.md) GraphQL schema should be "hairy"
- **10. Other rules**
  - [10.1.](./10-misc/misc-docs-markdown.md) Use markdown for documentation
- **A. Appendix**
  - [A-1](./a-appendix/#A-1) Useful links
- [Credits](./CREDITS.md)
