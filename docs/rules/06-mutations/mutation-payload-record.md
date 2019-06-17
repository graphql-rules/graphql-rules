---
path: '/rules/mutation-payload-record'
title: '6.6.1. In the mutation response, return the modified resource and its id.'
---

In the Payload type of mutation, the modified resource must be returned. It is best if the field that returns the modified resource will have a fixed name – a record. Then clients will be able to automatically read the results of your mutation and do not waste time searching for the field in which the changed resource is returned.

It is also advisable not to be lazy and provide a recordId field that returns the ID of the changed resource. For example, when creating a new record, if you requested only the recordId field, it will not pull the entire object, but simply return the id of the created record.

```diff
type CreatePersonPayload {
+  recordId: ID!
+ record: Person
  # ...  any other fields you like
}
```
