## 6. Mutation rules

No matter how many schemes I saw, most of the mess is in the Mutations. The following rules will allow you to make your API dry, clean and comfortable.

- **6. Mutation rules**
  - [6.1.](./mutation-namespaces.md) Use Namespace-types to group mutations within a single resource.
  - [6.2.](./mutation-business-operations.md) Go beyond CRUD – create small mutations for different business operations on resources.
  - [6.3.](./mutation-batch-changes.md) Consider the ability to perform mutations on multiple items (same type batch changes).
  - [6.4.](./mutation-required-args.md) Mutations should clearly describe all the mandatory arguments, there should be no options either-either.
  - [6.5.](./mutation-input-arg.md) In mutations, put all variables into one unique input argument.
  - [6.6.](./mutation-payload.md) Every mutation should have a unique payload type.
    - [6.6.1.](./mutation-payload-record.md) In the mutation response, return the modified resource and its `id`.
    - [6.6.2.](./mutation-payload-status.md) Return operation status in mutation response.
    - [6.6.3.](./mutation-payload-query.md) In the mutation response, return a field of type `Query`.
    - [6.6.4.](./mutation-payload-errors.md) In the mutation response, return the `errors` field with typed user errors.
