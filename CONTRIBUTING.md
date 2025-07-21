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

- **THOU SHALL NOT** directly modify `package.json` files to add or remove dependencies. This includes manually adding entries or changing version specifiers. Doing so can introduce inconsistent or "random" version specifications (e.g., `^1.0.0` vs `~1.0.0` vs `1.0.0`) and desynchronize `pnpm-lock.yaml`, leading to irreproducible builds and dependency conflicts. Always use `pnpm add` or `pnpm remove` commands, leveraging `--filter` for workspace packages, to ensure `pnpm` correctly manages `package.json` and `pnpm-lock.yaml`.

### Dependency Management Recovery Procedure

If `package.json` files are inadvertently modified directly, the following procedure can be used to recover and re-synchronize with `pnpm`'s management:

1.  **Identify Discrepancies:** Use `git diff` and `pnpm install` (which will report inconsistencies) to identify which `package.json` files and dependencies are out of sync.
2.  **Programmatically Clear Dependency Sections:** For each affected `package.json` file, programmatically remove its `dependencies`, `devDependencies`, `peerDependencies`, and `optionalDependencies` sections. This ensures a clean slate for `pnpm`.
3.  **Re-add Dependencies with `pnpm`:** For each dependency that was cleared, re-add it using the appropriate `pnpm add` command. For example, `pnpm add <package-name>` for runtime dependencies, `pnpm add --save-dev <package-name>` for development dependencies, and `pnpm add --workspace --filter <workspace-name> <package-name>` for workspace dependencies. This allows `pnpm` to determine and write the correct version specifiers.
4.  **Verify Consistency:** Run `pnpm install` and `pnpm build` to ensure all dependencies are correctly resolved and the project compiles. Use `git diff` to confirm that `package.json` and `pnpm-lock.yaml` reflect only `pnpm`-managed changes.
- **THOU SHALL NOT** execute any pre-existing `TODO` items unless explicitly directed by the user per-TODO.
  Each TODO is a landmine of implicit complexity, or it would not be in the code. Discuss instead.
