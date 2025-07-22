# Proposal 0002: Build System Re-evaluation and Refined Strategy

- Proposal Status: Implemented and Verified

## Task Description

This proposal outlines a revised strategy for the project's build system, informed by the skeptical constraint discovery conducted in the accompanying research log. The previous attempt (Proposal 0001) and initial investigation into `tsc -b` revealed complexities with project references and emission requirements that are not necessary to achieve the core objective.

Instead, this proposal focuses on establishing a robust, reliable, and maintainable build configuration by leveraging a simpler approach for cross-package type-checking and integrating it with `esbuild` for JavaScript bundling and a dedicated step for generating declaration files for publishable packages.

## Revised Build Strategy

The refined build strategy consists of three key components:

1.  **Unified Cross-Package Type-Checking:** A single TypeScript configuration at the monorepo root will be used with `tsc --noEmit` to perform comprehensive type-checking across all packages. This approach has been verified in the research log to correctly resolve types across package boundaries using `include` and `paths` mapping pointing to source directories.
2.  **Per-Package JavaScript Bundling with `esbuild`:** Each package will use `esbuild` independently to build its JavaScript bundle. This aligns with the project's existing tooling and provides flexibility for package-specific bundling needs.
3.  **Conditional Declaration File Generation:** Declaration files (`.d.ts`) will be generated only for packages intended for publication (e.g., `@cogtools/lib`). This will be a separate build step for those specific packages, using `tsc` with `declaration: true` and `emitDeclarationOnly: true`.

This strategy prioritizes simplicity (KISS, YAGNI) and avoids the complexities of `tsc -b` and composite projects when a simpler mechanism for type-checking is effective. It also aligns with the goal of not committing build artifacts for internal packages.

## Implementation Plan with Verifiable Steps

This plan breaks down the implementation into smaller, verifiable steps.

1.  **Refine Root `tsconfig.json` for Unified Type-Checking:**
    - **Action:** Update `tsconfig.json` at the monorepo root.
    - **Details:** Add `"include": ["packages/*/src/**/*.ts"]` to include all source files.
    - **Details:** Configure `paths` mapping to point to the source directories of internal packages. For `@cogtools/lib`, add `"@cogtools/lib": ["packages/cogtools-lib/src"]` within the `paths` object under `compilerOptions`.
    - **Verification:** Run `pnpm typecheck`. The command should now attempt to type-check files across packages. Initially, there might be errors related to missing configurations in package `tsconfig.json` files, but the root configuration should be accepted by `tsc`.

2.  **Simplify Package `tsconfig.json` files:**
    - **Action:** Modify `tsconfig.json` in each package (`packages/*/tsconfig.json`).
    - **Details:** Remove `"composite": true` and any `references` arrays. Ensure `compilerOptions.outDir` is correctly set for where `esbuild` will output files.
    - **Verification:** Run `pnpm typecheck`. The errors from the previous step should change or be resolved as package configurations are simplified. Type-checking should still be attempted across packages via the root `tsconfig.json`.

3.  **Configure Package `package.json` Scripts for esbuild:**
    - **Action:** Update the `build` script in each package's `package.json` (`packages/*/package.json`).
    - **Details:** Modify the script to use `esbuild` for bundling, specifying the entry point (`src/index.ts` or similar) and the output path (`dist/index.js` or similar), ensuring the `type: "module"` in `package.json` is respected.
    - **Verification:** Run `pnpm --filter <package-name> build` for each package. Verify that JavaScript bundles are generated in the correct `dist` directories and that they are in the correct module format.

4.  **Add Conditional Declaration File Generation Script:**
    - **Action:** Add a new script (`build:types`) to the `package.json` of publishable packages (initially `@cogtools/lib`).
    - **Details:** The script should be `tsc --emitDeclarationOnly --outDir dist`.
    - **Verification:** Run `pnpm --filter @cogtools/lib run build:types`. Verify that only `.d.ts` files are generated in `packages/cogtools-lib/dist`, and that no JavaScript files are emitted by this script.

5.  **Integrate with Root `package.json` Scripts:**
    - **Action:** Update the root `package.json` scripts (`build`, `typecheck`, `preflight`).
    - **Details:** Set the root `typecheck` script to `tsc --noEmit`.
    - **Details:** Set the root `build` script to run the `esbuild` scripts for all packages and the `build:types` script for publishable packages. This might involve using `pnpm -r build` and `pnpm --filter @cogtools/lib run build:types` or similar orchestration.
    - **Details:** Update the `preflight` script to ensure it correctly runs `format:fix`, `typecheck`, `lint`, `build`, and `test` in the appropriate order.
    - **Verification:** Run `pnpm typecheck` from the root (should pass if previous steps were successful). Run `pnpm build` from the root (should generate all JS bundles and publishable `.d.ts` files). Run `pnpm preflight` (should pass all checks).

6.  **Verify Minimal Practical Case:**
    - **Action:** Ensure the dummy function in `@cogtools/lib` is imported and used in `@cogtools/cogtools` (this was done in Proposal 0001 and the changes are in the `.diff` in the report). Add or confirm existing unit and black-box tests for this functionality.
    - **Verification:** Run `pnpm test` from the root. All tests, including those for the minimal practical case, should pass. Manually execute the compiled `@cogtools/cogtools` CLI (`node packages/cogtools/dist/index.js`) to confirm it runs without runtime errors related to module resolution or types.

## Verification (Overall)

The success of this proposal will be ultimately verified by a clean run of `pnpm preflight` from the monorepo root, confirming that formatting, type-checking, linting, building, and testing all pass with the new build system.

## Next Steps

We will begin the implementation with Step 1: refining the root `tsconfig.json` for unified type-checking.

## Core Requirements (Revised)

Based on the project's needs and the lessons learned from Proposal 0001 and the skeptical constraint discovery, the core requirements for the build system are:

- **Reliable Cross-Package Type-Checking:** The build system must guarantee that `pnpm typecheck` correctly identifies type errors across package boundaries. This will be achieved using a unified root `tsconfig.json` and `tsc --noEmit`.
- **Conditional Declaration File Generation:** Declaration files (`.d.ts`) must be generated for publishable packages (e.g., `@cogtools/lib`) for external consumption. Internal packages will not commit build artifacts, including `.d.ts` files.
- **Integration with `esbuild`:** The build system must integrate seamlessly with `esbuild` for generating JavaScript bundles for all packages, with `esbuild` being run independently for each package.
- **Alignment with Guiding Principles:** The chosen solution must align with the project's guiding principles, including KISS (Keep It Simple, Stupid), YAGNI (You Aren't Gonna Need It), and others.
- **Minimal Practical Case Verification:** The build system must be verifiable using the minimal practical case involving a dummy function in `@cogtools/lib` imported and executed by `@cogtools/cogtools`, including both unit and black-box tests.
