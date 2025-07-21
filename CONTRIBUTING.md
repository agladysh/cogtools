# How to Contribute

## Document Status

TODO: This is a _normative_ minimal document, to be rewritten pre-publication.

## For AI Assistants

### Guiding Principles

Hardcore old-school.

- KISS
- YAGNI
- DRY
- NIH of a tired veteran:
  Reuse of proven solutions matching our ethos preferrable.
  NIH is forbidden unless it is exuisitly robustly defended. Welcome with open hands otherwise.

References-in-spirit, apply ethos filter:

- [12 factors](https://12factor.net/)
- DJB
- SOLID
- Suckless
- Hexagonal Architecture

TODO: Refine (incl. describe how ethos filter applies), Add links.

### Environment

Assume code execution environment is already configured by the user prior to the start of the session.
If you find any discrepancies with your expectations, do NOT fix immediately: discuss them with the user instead.

### Hard Rules

- **THOU SHALL NOT** generate `package.json` dependencies directly. This creates versioning chaos. Use `pnpm` instead.
- **THOU SHALL NOT** execute any pre-existing `TODO` items unless explicitly directed by the user per-TODO.
  Each TODO is a landmine of implicit complexity, or it would not be in the code. Discuss instead.
