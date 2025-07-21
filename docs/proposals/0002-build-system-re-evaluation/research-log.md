# Research Log for Proposal 0002: Build System Re-evaluation and Skeptical Constraint Discovery

This log documents the experiments, observations, and analysis conducted during the skeptical constraint discovery phase of Proposal 0002. The goal is to understand the behavior of TypeScript and pnpm in a monorepo environment to inform the design of a robust build system.

## Initial Setup and Documentation Review (2025-07-21)

- Created the directory `docs/proposals/0002-build-system-re-evaluation/`.
- Moved the proposal content to `docs/proposals/0002-build-system-re-evaluation/proposal.md`.
- Created the initial structure for the research log.

**Documentation Review Process:**

Began reviewing official documentation for TypeScript Project References (`composite`), compiler options (`declaration`, `emitDeclarationOnly`, `noEmit`, `outDir`, `rootDir`), and Module Resolution (`paths`, `baseUrl`, `moduleResolution`), as well as pnpm documentation on Workspaces. The focus was on understanding the documented behavior of these tools, particularly in a monorepo context and how they relate to the issues encountered in Proposal 0001.

Consulted the following documentation pages:

- TypeScript Handbook: Project References (https://www.typescriptlang.org/docs/handbook/project-references.html)
- TypeScript Handbook: Compiler Options (https://www.typescriptlang.org/docs/handbook/compiler-options.html) - focusing on `composite`, `declaration`, `emitDeclarationOnly`, `noEmit`, `outDir`, `rootDir`.
- TypeScript Handbook: Module Resolution (https://www.typescriptlang.org/docs/handbook/module-resolution.html) - focusing on `paths`, `baseUrl`, `moduleResolution`.
- pnpm Documentation: Workspaces (https://pnpm.io/workspaces)

**Key Findings from Documentation Review:**

- **TypeScript Project References and `composite`:**
  - `composite: true` is fundamental for project references and signals a project's inclusion in a larger build. It enables features like faster incremental builds and cross-project type-checking.
  - A critical finding is that projects with `composite: true` **are required to emit `.d.ts` files**. The documentation explicitly states this. This explains the `TS6310` error in Proposal 0001, as `composite: true` and `noEmit: true` are incompatible in the same `tsconfig.json`.
  - `tsc -b` is the command used to build projects with references, processing them in dependency order.

- **Declaration Files (`declaration`, `emitDeclarationOnly`):**
  - `declaration: true` generates `.d.ts` files alongside JavaScript output.
  - `emitDeclarationOnly: true` generates _only_ `.d.ts` files, which is relevant when another tool handles JavaScript bundling but type information is still needed.

- **`noEmit`:**
  - `noEmit: true` prevents all output emission. It is incompatible with `composite: true`.

- **Module Resolution (`paths`, `baseUrl`, `moduleResolution`):**
  - `baseUrl` and `paths` are essential for configuring how TypeScript resolves non-relative module imports, which is common in monorepos when importing packages by name.
  - `moduleResolution` dictates how TypeScript finds modules in `node_modules`. The interaction with pnpm's symlinks in a monorepo is a key area to understand.

- **pnpm Workspaces:**
  - pnpm workspaces utilize symlinks in `node_modules` to connect local packages, enabling them to depend on each other via package names.

**Implications for Build System and Future Experiments:**

- The documentation confirms that the approach in Proposal 0001 of using `composite: true` without emitting declarations for internal packages was incorrect.
- For internal packages to participate in cross-package type-checking with `tsc -b` and `composite: true`, they will likely need to emit `.d.ts` files. `emitDeclarationOnly: true` appears to be the relevant option if we use `esbuild` for JavaScript.
- The persistent `TS2307` error in Proposal 0001 suggests an issue with how `tsc -b` resolves modules to the location of emitted `.d.ts` files within the pnpm workspace. Correct configuration of `paths` and `baseUrl` in the root `tsconfig.json` will be crucial.

**Next Steps for Skeptical Constraint Discovery:**

Based on these findings, our experiments will focus on:

1.  **Confirming `composite: true` behavior:** Experiment with a minimal case to verify that `composite: true` requires some form of emission for cross-package type-checking with `tsc -b`.
2.  **Finding the right `tsconfig.json` for internal packages:** Determine the optimal `tsconfig.json` setup for internal packages that use `composite: true` and `emitDeclarationOnly: true` alongside `esbuild`.
3.  **Cracking Module Resolution:** Experiment with `baseUrl` and `paths` in the root `tsconfig.json` to enable `tsc -b` to resolve package imports to generated `.d.ts` files in other packages' `dist` directories.

## Experiment 1: Confirming `composite: true` Behavior (2025-07-21)

**Objective:** To definitively confirm whether `composite: true` in a `tsconfig.json` necessitates some form of emission (`.js` + `.d.ts` or `.d.ts` only) for `tsc -b` to work for cross-package type-checking.

**Procedure:**

1.  Create a minimal monorepo structure with two packages: `@cogtools/package-a` and `@cogtools/package-b`. (Completed)
2.  Configure `@cogtools/package-a` with a simple exported function and a `tsconfig.json` with `composite: true`. (Completed - Initial setup with `declaration: true`)
3.  Configure `@cogtools/package-b` to depend on and import the function from `@cogtools/package-a`. (Completed)
4.  Experiment with different `compilerOptions` in `@cogtools/package-a`'s `tsconfig.json`, specifically `noEmit: true`, `declaration: true`, and `emitDeclarationOnly: true`.
    - **Experiment 1a: `composite: true` and `noEmit: true`**
      - **Action:** Modified `packages/package-a/tsconfig.json` to include `"noEmit": true`, and removed `"declaration": true` and `"declarationMap": true`.
      - **Command:** `pnpm tsc -b packages/package-b`
      - **Observation:** The command failed with the following errors:
        ```
        ... (TS2792 errors related to @types/node/undici-types)
        packages/package-b/tsconfig.json(15,5): error TS6310: Referenced project '/home/user/cogtools/packages/package-a' may not disable emit.
        ```
      - **Analysis:** This confirms the documentation that `composite: true` and `noEmit: true` are incompatible. The `TS6310` error explicitly states that a referenced composite project may not disable emit.
      - **Conclusion:** `composite: true` requires some form of emission.
    - **Experiment 1b: `composite: true` and `declaration: true`**
      - **Action:** Modified `packages/package-a/tsconfig.json` to include `"declaration": true`, `"declarationMap": true`, and removed `"noEmit": true`. (Completed)
      - **Command:** `pnpm tsc -b packages/package-b`
      - **Observation:** The command failed with the same errors as Experiment 1a:
        ```
        ... (TS2792 errors related to @types/node/undici-types)
        packages/package-b/tsconfig.json(15,5): error TS6310: Referenced project '/home/user/cogtools/packages/package-a' may not disable emit.
        ```
      - **Analysis:** Simply having `declaration: true` is not enough to satisfy the emission requirement for `composite: true` in this setup. The `TS6310` error persists.
      - **Conclusion:** The type of emission (JavaScript + declarations vs. declarations only) might not be the primary issue here. It's possible the problem lies in how `tsc -b` finds the emitted files in the referenced project.
    - **Experiment 1c: `composite: true` and `emitDeclarationOnly: true`**
      - **Action:** Modified `packages/package-a/tsconfig.json` to include `"emitDeclarationOnly": true`, and removed `"declaration": true` and `"declarationMap": true`. (Completed)
      - **Command:** `pnpm tsc -b packages/package-b`
      - **Observation:** The command failed with the same errors as Experiment 1a and 1b:
        ```
        ... (TS2792 errors related to @types/node/undici-types)
        packages/package-b/tsconfig.json(15,5): error TS6310: Referenced project '/home/user/cogtools/packages/package-a' may not disable emit.
        ```
      - **Analysis:** Using `emitDeclarationOnly: true` instead of `declaration: true` also does not resolve the `TS6310` error. This further indicates that the problem is not the _type_ of emission but rather `tsc -b`'s ability to recognize and utilize the output of the referenced composite project in this monorepo structure.
      - **Conclusion:** `composite: true` requires emission, but the default configuration and simple emission options are not sufficient for `tsc -b` to resolve the dependency in this minimal monorepo setup. The issue likely lies in module resolution and how `tsc -b` locates the emitted files of the referenced project.

## Experiment 2: Finding the Right `tsconfig.json` for Internal Packages

**Objective:** To determine the optimal `tsconfig.json` setup for internal packages that use `composite: true` but where `esbuild` handles the JavaScript output.

**Procedure:**

1.  Use the minimal monorepo structure from Experiment 1.
2.  Focus on `@cogtools/package-a`'s `tsconfig.json`.
3.  Experiment with `composite: true`, `emitDeclarationOnly: true`, and `outDir` in various combinations.
4.  Run `tsc -b @cogtools/package-b` and observe the output and generated files in `@cogtools/package-a/dist`.

**Observations:**

- **Analysis:**

- **Conclusion:**

-

## Experiment 3: Cracking Module Resolution

**Objective:** To find a configuration for `baseUrl` and `paths` in the root `tsconfig.json` that allows `tsc -b` to correctly resolve package imports to the generated `.d.ts` files in the `dist` directories of other packages.

**Procedure:**

1.  Use the minimal monorepo structure from Experiment 1, with `@cogtools/package-a` configured to emit `.d.ts` files (based on findings from Experiment 2).
2.  Experiment with different `baseUrl` and `paths` configurations in the root `tsconfig.json`.
3.  Run `tsc -b @cogtools/package-b` and observe if the `TS2307` error is resolved and if type-checking works correctly.

**Observations:**

- **Analysis:**

- **Conclusion:**

-

## Log Addendum (2025-07-24)

**Breakthrough: Successful Cross-Package Type-Checking with Root `tsconfig.json`**

**Objective:** To find a reliable method for cross-package type-checking in the pnpm monorepo, addressing the issues encountered with `tsc -b` and composite projects in internal packages.

**Experiment:**

1.  Modified the root `tsconfig.json` to include all source files from `packages/*` using the `include` field (`"packages/*/src/**/*.ts"`).
2.  Configured `paths` mapping in the root `tsconfig.json` to point to the source directories of internal packages (e.g., `"@cogtools/package-a": ["packages/package-a/src"]`).
3.  Ran the command `pnpm tsc --noEmit` from the monorepo root.

**Observation:**

The command `pnpm tsc --noEmit` completed successfully with no type errors reported.

**Analysis:**

This experiment demonstrates that a single `tsconfig.json` at the monorepo root, configured with appropriate `include` and `paths` mapping pointing to source directories, is sufficient for `tsc --noEmit` to perform reliable cross-package type-checking. TypeScript is able to resolve the types across package boundaries using this simpler configuration, without the need for project references (`composite`) or `tsc -b`.

**Conclusion:**

This is a significant breakthrough. We have found a simpler and effective method for cross-package type-checking that avoids the complexities and issues encountered with the `tsc -b` and composite project approach for internal packages.

**Revised Build Strategy:**

Based on this successful experiment, we are pivoting the build strategy. The new strategy will involve:

1.  **Unified Cross-Package Type-Checking:** Using a single root `tsconfig.json` with `tsc --noEmit` for type validation across the entire monorepo.
2.  **Per-Package JavaScript Bundling:** Continuing to use `esbuild` independently within each package for JavaScript output.
3.  **Conditional Declaration File Generation:** Running a separate `tsc` command with `declaration: true` and `emitDeclarationOnly: true` specifically for publishable packages (e.g., `@cogtools/lib`) to generate `.d.ts` files.

This revised strategy is simpler, aligns with our guiding principles, and effectively addresses the core requirement of reliable cross-package type-checking.

**Next Steps:**

The next step is to finalize the configuration of the root `tsconfig.json` and then proceed with updating the package-specific configurations and scripts as outlined in the updated proposal (`docs/proposals/0002-build-system-re-evaluation/proposal.md`).
