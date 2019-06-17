---
path: '/rules/mutation-payload-status'
title: '6.6.2 Return operation status as part of mutation response.'
---

Every mutation is an operation that modifies data. So it would be great to have an indicator that shows whether operation was successfully or not. One common pattern in REST-world is to use [HTTP status code](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP). In GraphQL we can use a similar approach.

GraphQL doesn't depend on protocol - it can be used with http, WebSocket, telnet, ssh and other. One GraphQL-mutation can contain multiple operations that can be completed with different statuses and have different errors. Developers that came from REST-world suffer absence of HTTP status code, and someone even try to reinvent it in GraphQL-server. So why not to add `status` field in your mutation response then?!

```diff
type CreatePersonPayload {
   record: Person
+  status: CreatePersonStatus! # fail, success, etc. Or 201, 403, 404 etc.
   # ... any other fields you like
}
```

Field `status` could be `Enum` with the limited range of possible values. This Enum could be unique per mutation / business entity or shared across application - it depends.
