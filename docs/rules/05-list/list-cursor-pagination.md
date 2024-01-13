---
path: '/rules/list-cursor-pagination/'
title: '5.5. For infinite lists (infinite scroll) use Relay Cursor Connections Specification.'
---

[Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm)

Pagination has a drawback. When items are adding or removing frequently, then when the user goes to the next page you may encounter problems:

- under-fetching is when an item is removed from the top of the list, and the client skips the entry that "escaped" to the previous page when going to the next page
- over-fetching is when new records are added to the top of the list, and when you go to the next page, the client re-sees the records that were on the previous page

To solve this problem, Facebook developed the Relay Cursor Connections Specification. It is ideal for creating infinite scroll lists. And if there is a specification, it means there is a certain standard which can be followed by the team of developers not to reinvent the bicycles over again.

However, the appearance of the infinite scroll GraphQL queries is not very good looking and at first glance, it looks unclear and requires an additional explanation for the clients:

```graphql
{
  articles(first: 10, after: "opaqueCursor") {
    edges {
      cursor
      node {
        # Only at the 3rd level of nesting we get the record data
        id
        name
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
```

Therefore, if you have the opportunity to add both, regular and Infinite Scroll one then they will only thank you for the opportunity to choose the type they prefer.
