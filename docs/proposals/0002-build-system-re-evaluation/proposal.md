# Proposal 0002: Build System Re-evaluation and Refined Strategy

## Task Description

This proposal outlines a revised strategy for the project's build system, informed by the skeptical constraint discovery conducted in the accompanying research log. The previous attempt (Proposal 0001) and initial investigation into `tsc -b` revealed complexities with project references and emission requirements that are not necessary to achieve the core objective.

Instead, this proposal focuses on establishing a robust, reliable, and maintainable build configuration by leveraging a simpler approach for cross-package type-checking and integrating it with `esbuild` for JavaScript bundling and a dedicated step for generating declaration files for publishable packages.

## Revised Build Strategy

The refined build strategy consists of three key components:

1.  **Unified Cross-Package Type-Checking:** A single TypeScript configuration at the monorepo root will be used with `tsc --noEmit` to perform comprehensive type-checking across all packages. This approach has been verified to correctly resolve types across package boundaries using `include` and `paths` mapping pointing to source directories.
2.  **Per-Package JavaScript Bundling with `esbuild`:** Each package will use `esbuild` independently to build its JavaScript bundle. This aligns with the project's existing tooling and provides flexibility for package-specific bundling needs.
3.  **Conditional Declaration File Generation:** Declaration files (`.d.ts`) will be generated only for packages intended for publication (e.g., `@cogtools/lib`). This will be a separate build step for those specific packages, using `tsc` with `declaration: true` and `emitDeclarationOnly: true`.

This strategy prioritizes simplicity (KISS, YAGNI) and avoids the complexities of `tsc -b` and composite projects when a simpler mechanism for type-checking is effective. It also aligns with the goal of not committing build artifacts for internal packages.

## Process Outline

1.  **Refine Root `tsconfig.json`:** Configure the root `tsconfig.json` to include all source files from packages and set up accurate `paths` mapping to the source directories of internal packages.
2.  **Update Package `tsconfig.json` files:** Simplify package-specific `tsconfig.json` files, removing project references and composite-related options where no longer needed for type-checking.
3.  **Configure Package `package.json` scripts:** Update `package.json` scripts in each package to use `esbuild` for JavaScript bundling and add a separate script for conditional declaration generation in publishable packages.
4.  **Integrate with Root Scripts:** Update root `package.json` scripts (`build`, `typecheck`, `preflight`) to orchestrate the new build process, including running `tsc --noEmit` for type-checking and triggering package-specific build steps.
5.  **Verify Implementation:** Ensure the implemented build system correctly performs type-checking, JavaScript bundling, and conditional declaration generation, using the minimal practical case and other relevant tests.

## Verification

The success of this proposal will be verified by:

- Successfully running `pnpm typecheck` from the root, confirming no type errors are reported (or that expected errors are reported when deliberately introduced).
- Successfully running `pnpm build` for individual packages and from the root, confirming correct JavaScript bundles are generated.
- Successfully running the declaration generation script for publishable packages and verifying the presence and correctness of `.d.ts` files in their `dist` directories.
- Ensuring the minimal practical case (dummy function in `@cogtools/lib` consumed by `@cogtools/cogtools`) works correctly with the new build system, including unit and black-box tests.
- Running `pnpm preflight` successfully to confirm all checks pass.

## Next Steps

We will begin by refining the root `tsconfig.json` according to the revised build strategy.

## Core Requirements (Revised)

Based on the project's needs and the lessons learned from Proposal 0001 and the skeptical constraint discovery, the core requirements for the build system are:

- **Reliable Cross-Package Type-Checking:** The build system must guarantee that `pnpm typecheck` correctly identifies type errors across package boundaries. This will be achieved using a unified root `tsconfig.json` and `tsc --noEmit`.
- **Conditional Declaration File Generation:** Declaration files (`.d.ts`) must be generated for publishable packages (e.g., `@cogtools/lib`) for external consumption. Internal packages will not commit build artifacts, including `.d.ts` files.
- **Integration with `esbuild`:** The build system must integrate seamlessly with `esbuild` for generating JavaScript bundles for all packages, with `esbuild` being run independently for each package.
- **Alignment with Guiding Principles:** The chosen solution must align with the project's guiding principles, including KISS (Keep It Simple, Stupid), YAGNI (You Aren't Gonna Need It), and others.
- **Minimal Practical Case Verification:** The build system must be verifiable using the minimal practical case involving a dummy function in `@cogtools/lib` imported and executed by `@cogtools/cogtools`, including both unit and black-box tests.
