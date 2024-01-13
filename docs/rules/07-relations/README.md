---
pageType: section
path: '/rules/relations/'
title: '7. Rules of linkages between types (relationships)'
---

The conceptual difference between GraphQL and REST API is that the implementation of the logic of obtaining related resources was transferred from the client to the server. While with REST API clients are wondering (without hypermedia) how to request related resources, writing a layer of gluing/pre-dragging data on the client. With GraphQL, people who perfectly understand their data domain are engaged in that business, and they do that much faster and more efficiently. Especially when the related resources are fetched within the server, the client does not spend a lot of time on long round-trips between the client and the server for subqueries. And you are not limited to 4 browser connections per domain since inside the server you can send at least 200 simultaneous requests if you have enough power.

<!-- card-links -->

- [7.1. GraphQL schema should be "hairy"](./relations-hairy-graphql.md)
