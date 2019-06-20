---
pageType: section
path: '/rules/mutation'
title: '6. Mutation rules'
---

No matter how many schemes I saw, most of the mess is in the Mutations. The following rules will allow you to make your API dry, clean and comfortable.

<!-- card-links -->

- [6.1. Use Namespace-types to group mutations within a single resource.](./mutation-namespaces.md)
- [6.2. Go beyond CRUD – create small mutations for different business operations on resources.](./mutation-business-operations.md)
- [6.3. Consider the ability to perform mutations on multiple items (same type batch changes).](./mutation-batch-changes.md)
- [6.4. Mutations should clearly describe all the mandatory arguments, there should be no options either-either.](./mutation-required-args.md)
- [6.5. In mutations, put all variables into one unique input argument.](./mutation-input-arg.md)
- [6.6. Every mutation should have a unique payload type.](./mutation-payload.md)
  - [6.6.1. In the mutation response, return the modified resource and its `id`.](./mutation-payload-record.md)
  - [6.6.2. Return operation status in mutation response.](./mutation-payload-status.md)
  - [6.6.3. In the mutation response, return a field of type `Query`.](./mutation-payload-query.md)
  - [6.6.4. In the mutation response, return the `errors` field with typed user errors.](./mutation-payload-errors.md)
