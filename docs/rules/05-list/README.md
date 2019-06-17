---
path: '/rules/list'
title: '5. Rules of lists'
---

I never saw an API that does not return a list of items. Or it's page by page or something built on cursors for infinite lists. Lists should be filtered, sorted, and the number of returned items should be limited. GraphQL itself does not limit the freedom of implementation, but in order to form a certain uniformity, it is necessary to have a standard.

- **5. Rules of lists**
  - [5.1.](./list-filter.md) To filter the lists, use the `filter` argument, which contains all the available filters.
  - [5.2.](./list-sort.md) Use argument `sort` of type `Enum` or `[Enum!]` for listings sorting.
  - [5.3.](./list-limit-skip.md) Use `limit` with default value and `skip` to limit number of returned items in list.
  - [5.4.](./list-pagination.md) Use `page`, `perPage` args for pagination and return output type with `items` (array of elements) and `pageInfo` (meta-data).
  - [5.5.](./list-cursor-connection.md) For infinite lists (infinite scroll) use [Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm).
