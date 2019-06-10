### 5.4. Use `page`, `perPage` args for pagination and return output type with `items` (array of elements) and `pageInfo` (meta-data).

Consider pagination as an alternative of limiting requested results by `limit` and `skip`.

It is better to use NonNull args `page` and `perPage` with some default values while implementing pagination:

```graphql
type Query {
  articles(page: Int! = 1, perPage: Int! = 20): [Article]
}
```

But if you focus only on the arguments `page` and `page`, the benefit of your pagination for clients will be no better than `limit` and `skip`. In order for a client application to render pagination properly, it needs to provide not only the list of items themselves but also additional metadata with at least a total number of pages and records. For pagination metadata, you must have the following generic type `PaginationInfo`:

```graphql
type PaginationInfo {
  # Total number of pages
  totalPages: Int!

  # Total number of items
  totalItems: Int!

  # Current page number
  page: Int!

  # Number of items per page
  perPage: Int!

  # When paginating forwards, are there more items?
  hasNextPage: Boolean!

  # When paginating backwards, are there more items?
  hasPreviousPage: Boolean!
}
```

The sacred meaning of all these fields in `PaginationInfo`, is that you can easily make pagination on the client without additional calculations. Also, **imagine lagging connection and a nervous user**. What if he clicked on pagination 50 times on different pages within 5 seconds then what will come from the server we barely can imagine, more than that, good luck with rendering it properly. That is why we need a detailed meta-info from the server.

In the case of providing metadata for pagination, we can no longer simply return an array of founded items. We will need to create a new type of ArticlePagination to return the results from the server. And here again there is a reason to develop a standard:

```graphql
type Query {
  articles(page: Int! = 1, perPage: Int! = 20): ArticlePagination
}

type ArticlePagination {
  # Array of objects.
  items: [Article]!

  # Information to aid in pagination.
  pageInfo: PaginationInfo!
}
```

ArticlePagination must have at least two fields:

- items — NonNull-array of elements
- pageInfo — NonNull-object with pagination metadata, totalPages, totalItems, page, perPage
