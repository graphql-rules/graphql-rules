---
path: '/rules/type-custom-scalars/'
title: '2.1. Use custom scalar types to declare fields and arguments with certain semantic value.'
---

If a field returns `String` your clients can't understand whether or not a field has semantic value. For example, a `String` type allows you to send pretty much anything including plain text, HTML, 255 chars string and base64.

Use custom scalar types to make your API transparent to your consumers. Examples: `HTML`, `String255`, `Base64`, `DateString`.

They allow backend developers to write validation, serialization and deserialization logic once. It means more code reuse and simpler resolvers.

On the other hand, frontend developers can write components to represent custom data and reuse them for specific scalar types.

```diff
type Article {
-  description: String
+  description: HTML
}
```

In this case, it's easier to understand that `description` field holds HTML and we need to render it as is instead of escaping it.
