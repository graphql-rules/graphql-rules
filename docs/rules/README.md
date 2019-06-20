---
pageType: section
path: '/rules'
title: 'GraphQL-scheme design — make API comfortable, prevent pain and suffering'
---

Rules and recommendations mentioned in this paper were results of 3-years experience of using GraphQL both on front-end and back-end side. Also, we use recommendations and experience of Caleb Meredith (PostGraphQL author, Facebook ex-employee) and Shopify engineers.

This article could be changed in the future, cause current rules are advisory and may be improved, changed, or even become antipattern. But what is written here, suffered time and pain from the use of horrible GraphQL-schemes.

If you think that any rule is a complete mess or it is not fully disclosed, or want to add your own – please open the [issue](https://github.com/graphql-rules/graphql-rules/issues). Errors and typos can be corrected via GitHub pull requests. I've only just started to make the rules, but to finish the job and stick it all together, only collaborative work can help us.

- [1. Naming rules](./01-naming/README.md)
  - [1.1. Use `camelCase` for GraphQL-fields and arguments.](./01-naming/naming-fields-args.md)
  - [1.2. Use `UpperCamelCase` for GraphQL-types.](./01-naming/naming-types.md)
  - [1.3. Use `CAPITALIZED_WITH_UNDERSCORES` to name ENUM-types.](./01-naming/naming-enum.md)
- [2. Type rules](./02-type/README.md)
  - [2.1. Use custom scalar types if you want to declare fields or args with specific semantic value.](./02-type/type-custom-scalars.md)
  - [2.2. Use Enum for fields which contain a specific set of values.](./02-type/type-enumerable.md)
- [3. Field Rules (Output)](./03-fields-output/README.md)
  - [3.1. Use semantic names for fields and avoid leaking of implementation details in fields names.](./03-fields-output/output-semantic-names.md)
  - [3.2. Use `Non-Null` field if field will always have a given field value.](./03-fields-output/output-non-null.md)
  - [3.3. Group as many related fields into custom Object type as possible.](./03-fields-output/output-grouping.md)
- [4. Argument rules (Input)](./04-fields-input/README.md)
  - [4.1. Group coupled arguments to the new input-type.](./04-fields-input/input-grouping.md)
  - [4.2.Use strict scalar types for arguments, eg. `DateTime` instead of `String`.](./04-fields-input/input-custom-scalar.md)
  - [4.3. Mark arguments as `required`, is they are required for query execution.](./04-fields-input/input-non-null.md)
- [5. Rules of lists](./05-list/README.md)
  - [5.1. To filter the lists, use the `filter` argument, which contains all the available filters.](./05-list/list-filter.md)
  - [5.2. Use argument `sort` of type `Enum` or `[Enum!]` for listings sorting.](./05-list/list-sort.md)
  - [5.3. Use `limit` with default value and `skip` to limit number of returned items in list.](./05-list/list-limit-skip.md)
  - [5.4. Use `page`, `perPage` args for pagination and return output type with `items` (array of elements) and `pageInfo` (meta-data).](./05-list/list-pagination.md)
  - [5.5. For infinite lists (infinite scroll) use Relay Cursor Connections Specification.](./05-list/list-cursor-connection.md)
- [6. Mutation rules](./06-mutations/README.md)
  - [6.1. Use Namespace-types to group mutations within a single resource.](./06-mutations/mutation-namespaces.md)
  - [6.2. Go beyond CRUD – create small mutations for different business operations on resources.](./06-mutations/mutation-business-operations.md)
  - [6.3. Consider the ability to perform mutations on multiple items (same type batch changes).](./06-mutations/mutation-batch-changes.md)
  - [6.4. Mutations should clearly describe all the mandatory arguments, there should be no options either-either.](./06-mutations/mutation-required-args.md)
  - [6.5. In mutations, put all variables into one unique input argument.](./06-mutations/mutation-input-arg.md)
  - [6.6. Every mutation should have a unique payload type.](./06-mutations/mutation-payload.md)
    - [6.6.1. In the mutation response, return the modified resource and its `id`.](./06-mutations/mutation-payload-record.md)
    - [6.6.2. Return operation status in mutation response.](./06-mutations/mutation-payload-status.md)
    - [6.6.3. In the mutation response, return a field of type `Query`.](./06-mutations/mutation-payload-query.md)
    - [6.6.4. In the mutation response, return the `errors` field with typed user errors.](./06-mutations/mutation-payload-errors.md)
- [7. Rules of linkages between types (relationships)](./07-relations/README.md)
  - [7.1. GraphQL schema should be "hairy"](./07-relations/relations-hairy-graphql.md)
- [10. Other rules](./10-misc/README.md)
  - [10.1. Use markdown for documentation](./10-misc/misc-docs-markdown.md)
- **A. Appendix**
  - [A-1 Useful links](./a-appendix/README.md#A-1)
- [Credits](./CREDITS.md)
