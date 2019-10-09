---
path: '/rules/output-semantic-names'
title: '3.1. Give descriptive names to fields.'
---

The rule goes without saying. Field names should communicate domain-specific meaning and not the implementation details. It's really stupid and simple rule. Consider the following type:

```diff
type Meeting {
-  body_html: String # BAD
+  description: HTML # GOOD
}
```

Whoever sees the type `Meeting` for the first time will be guessing what is exactly stored in the `bodyHtml` field. While backend developers can add a description to fields it is much easier and more clear to have a name that doesn't require additional explanation. A name that clearly communicates its domain meaning. So in the database it can still be `bodyHtml` while in API it will have nice and concise `description` field with a proper `HTML` type saying everything without additional explanations.
