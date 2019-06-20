---
pageType: section
path: '/rules/mutation-payload'
title: '6.6. Every mutation should have a unique payload type.'
---

Use a unique payload type for every mutation. This way you'll be able to expand mutation response with additional fields later. While having a unique payload type per mutation, will make sure that you won't break other mutations when editing the current one.

Even if you want to return only one record from your mutation, don't be tempted to return that type directly. By returning data directly (without a wrapper in the Payload-type), you deprive yourself of the possibility in the future to easily add additional fields for the return. GraphQL version-less API works well when the types are expanding, not changing. Using a unique payload type is an investment in the future of the API.

```diff
type Mutation {
-  createPerson(input: ...): Person               # BAD
+  createPerson(input: ...): CreatePersonPayload  # GOOD
}

+ type CreatePersonPayload {
+   recordId: ID
+   record: Person
+   # ... any other fields you like
+ }
```

It is important to note that the fields returned in your Payload type must be nullable (optional). Т.е. if you will return an error, for example, in the field `userErrors`, then you can not guarantee the availability of data in the field `record`. This point may come up when clients will start asking you to make these fields mandatory, because static analysis forces them to do additional checks for data. You calmly have to tell them that they need to do the check, because the data may actually be missing.

<!-- card-links -->

- [6.6.1. In the mutation response, return the modified resource and its `id`.](./mutation-payload-record.md)
- [6.6.2. Return operation status in mutation response.](./mutation-payload-status.md)
- [6.6.3. In the mutation response, return a field of type `Query`.](./mutation-payload-query.md)
- [6.6.4. In the mutation response, return the `errors` field with typed user errors.](./mutation-payload-errors.md)
