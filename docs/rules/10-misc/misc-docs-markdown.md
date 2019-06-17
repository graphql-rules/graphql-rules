---
path: '/rules/misc-docs-markdown'
title: '10.1. Use markdown for documentation'
---

Rule suggested by Ivan Goncharov

Documentation is an excellent GraphQL advantage. In order to make it actual, its description creates directly in the code of GraphQL types. Documentation is available through the introspection.

By [the GraphQL specification](https://graphql.github.io/graphql-spec/draft/#sec-Descriptions), you can use `markdown` for the `description` property of types, fields, and arguments.

Most GraphQL clients (GraphiQL, Playground, Altair, VSCode plugins) can correctly display `markdown` to end users.
