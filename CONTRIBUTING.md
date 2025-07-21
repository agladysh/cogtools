# How to Contribute

## Document Status

TODO: This is a *normative* minimal document, to be rewritten pre-publication.

## Contribution Rules for AI Assistants

Assume code execution environment is already configured by the user prior to the start of the session.
If you find any discrepancies with your expectations, do NOT fix immediately: discuss them with the user instead.

### Hard Rules

* **THOU SHALL NOT** generate `package.json` dependencies directly. This creates versioning chaos. Use `pnpm` instead.
* **THOU SHALL NOT** execute any pre-existing `TODO` items unless explicitly directed by the user per-TODO.
  Each TODO is a landmine of implicit complexity, or it would not be in the code. Discuss instead.
