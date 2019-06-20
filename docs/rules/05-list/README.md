---
pageType: section
path: '/rules/list'
title: '5. Rules of lists'
---

I never saw an API that does not return a list of items. Or it's page by page or something built on cursors for infinite lists. Lists should be filtered, sorted, and the number of returned items should be limited. GraphQL itself does not limit the freedom of implementation, but in order to form a certain uniformity, it is necessary to have a standard.

<!-- card-links -->

- [5.1. To filter the lists, use the `filter` argument, which contains all the available filters.](./list-filter.md)
- [5.2. Use argument `sort` of type `Enum` or `[Enum!]` for listings sorting.](./list-sort.md)
- [5.3. Use `limit` with default value and `skip` to limit number of returned items in list.](./list-limit-skip.md)
- [5.4. Use `page`, `perPage` args for pagination and return output type with `items` (array of elements) and `pageInfo` (meta-data).](./list-pagination.md)
- [5.5. For infinite lists (infinite scroll) use `Relay Cursor Connections Specification`](./list-cursor-connection.md)
