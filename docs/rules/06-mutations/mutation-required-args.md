---
path: '/rules/mutation-required-args'
title: '6.4. Mutations should clearly describe all the mandatory arguments, there should be no options either-either.'
---

There are tasks when it is necessary to take different input parameters depending on certain input values. The problem is that in this case, it is necessary to specify the input parameters as optional, which can lead to errors, because the client does not know for sure which parameters are required in this or that case.

For example, your API allows you to send different emails using `mutation sendEmail (type: PASSWORD_RESET, params: JSON)`. In order to select a template, you pass an Enum argument with a letter type and pass some parameters for it.

The problem with this approach is that the client does not know in advance exactly what parameters should be passed for a particular type of letters. In addition, if in the future we will need to refactor the scheme, the static typing will not allow us to catch errors on the client.

It is better to break mutations into several pieces with a rigid description of the arguments. For example: `sendEmailPasswordReset(login: String!, note: String)`. At the same time, do not forget to mark the arguments as mandatory, if the operation does not work without them.

There are also situations where you have to pass either one argument or the other. For example, we can send an email to reset your password if you specify login or email – `sendResetPassword(login: String, email: String)`.

In that case, we cannot make both arguments in our mutation mandatory. The fact, that required argument is not sent we will know only in runtime. While the client will not immediately understand that it is necessary to transfer either login or e-mail. What happens if you pass both arguments from different users?

To solve this problem, just create two mutations, that will strictly describe mandatory arguments:

```diff
type Mutation {
-  sendResetPassword(login: String, email: Email)
+  sendResetPasswordByLogin(login: String!)  # login NonNull
+  sendResetPasswordByEmail(email: Email!)   # email NonNull
}
```

Do not try to safe on mutations and try to avoid weak typing at all cost.

If you're just getting started with GraphQL, You might think that the problem can be solved with union inputs, however, they haven't been delivered to GraphQL yet. In the official repository of GraphQL, there is a discussion on adding union input types which you can follow here. You should understand that after union inputs will be added some similar tasks will be better to solve with their help. In the discussion, you can find examples of tasks from developers who are in need of them.
