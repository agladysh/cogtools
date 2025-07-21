# Change Request: Build System Enhancements

## Task Understanding

The goal is to implement a robust build system for the `cogtools` monorepo, focusing on TypeScript compilation and testing, while adhering to the following requirements:

1.  **DESIRED:** No dedicated generation of typings for internal development builds.
2.  **MANDATORY:** Correct functioning of `pnpm typecheck` prior to `pnpm build`.
3.  **ADDITIONAL:** The `lib` package, being potentially publishable, will have a separate mechanism for generating typings for external consumption.

The minimal practical case involves:

1.  `@cogtools/lib` exporting a dummy function.
2.  `@cogtools/lib` having a unit test.
3.  Other CLI packages importing and executing that function.
4.  CLI packages having black-box tests that execute the corresponding CLI utility and check for output.

## Proposed Plan

The plan is broken down into verifiable milestones to ensure a robust and error-proof implementation.

### Milestone 1: Library Core - Dummy Function and Unit Test

**Goal:** Establish the `@cogtools/lib` package with a basic dummy function and a passing unit test. This confirms the package's test setup is functional.

**Steps:**

1.  **Modify `packages/cogtools-lib/src/index.ts`:**
    ```typescript
    export function getGreeting(): string {
      return 'Hello from @cogtools/lib!';
    }
    ```
2.  **Modify `packages/cogtools-lib/src/index.test.ts`:**

    ```typescript
    import { describe, it, expect } from 'vitest';
    import { getGreeting } from './index';

    describe('getGreeting', () => {
      it('should return the correct greeting', () => {
        expect(getGreeting()).toBe('Hello from @cogtools/lib!');
      });
    });
    ```

**Verification:**

- **Command:** `pnpm --filter @cogtools/lib test`
- **Expected Output:** The command should execute successfully, and the Vitest output should indicate that 1 test suite passed with 1 test passing.

### Milestone 2: Library Build - JavaScript Bundling Only

**Goal:** Configure `@cogtools/lib` to build its JavaScript bundle using `esbuild` without generating `.d.ts` files for internal development.

**Steps:**

1.  **Modify `packages/cogtools-lib/package.json`:**
    - Ensure the `build` script is configured for `esbuild` only.
    ```json
    {
      "name": "@cogtools/lib",
      "version": "1.0.0",
      "description": "Shared library for metacognitive tooling components.",
      "main": "dist/index.js",
      "type": "module",
      "scripts": {
        "build": "node ../../scripts/build.mjs src/index.ts dist/index.js",
        "test": "vitest"
      },
      "dependencies": {
        "nunjucks": "^3.2.4",
        "yargs": "^18.0.0"
      },
      "devDependencies": {
        "@types/nunjucks": "^3.2.6",
        "@types/yargs": "^17.0.33"
      }
    }
    ```
2.  **Ensure `packages/cogtools-lib/tsconfig.json` has `noEmit: true` (inherited from root):**
    - Verify that `packages/cogtools-lib/tsconfig.json` does _not_ explicitly set `declaration: true` or `emitDeclarationOnly: true`. It should rely on the root `tsconfig.json`'s `noEmit: true`.

**Verification:**

- **Command:** `pnpm --filter @cogtools/lib build`
- **Expected Output:** The command should execute successfully.
- **File System Check:**
  - Verify that `packages/cogtools-lib/dist/index.js` exists.
  - **Crucially, verify that `packages/cogtools-lib/dist/index.d.ts` does _not_ exist.**

### Milestone 3: CLI Package Integration - Import and Execute

**Goal:** Modify one CLI package (e.g., `@cogtools/cogtools`) to import and execute the dummy function from `@cogtools/lib`, and verify its runtime output.

**Steps:**

1.  **Modify `packages/cogtools/src/index.ts`:**

    ```typescript
    import { getGreeting } from '@cogtools/lib';

    export async function main() {
      console.log(getGreeting());
    }

    // Standard pattern to make the module executable directly
    if (import.meta.url === `file://${process.argv[1]}`) {
      main();
    }
    ```

2.  **Modify `packages/cogtools/package.json`:**
    - Add `@cogtools/lib` as a workspace dependency.
    ```json
    {
      "name": "@cogtools/cogtools",
      "version": "1.0.0",
      "description": "Main CLI utility for metacognitive tools.",
      "main": "dist/index.js",
      "type": "module",
      "bin": {
        "cogtools": "./dist/index.js"
      },
      "scripts": {
        "build": "node ../../scripts/build.mjs src/index.ts dist/index.js",
        "test": "vitest"
      },
      "dependencies": {
        "@cogtools/lib": "workspace:*"
      }
    }
    ```
3.  **Build `@cogtools/cogtools`:**
    - **Command:** `pnpm --filter @cogtools/cogtools build`

**Verification:**

- **Command:** `node packages/cogtools/dist/index.js`
- **Expected Output:** The command should print `Hello from @cogtools/lib!` to the console.

### Milestone 4: CLI Package Black-Box Test

**Goal:** Add a black-box test to the integrated CLI package (`@cogtools/cogtools`) to verify its output programmatically.

**Steps:**

1.  **Modify `packages/cogtools/src/index.test.ts`:**

    ```typescript
    import { describe, it, expect } from 'vitest';
    import { exec } from 'child_process';
    import { resolve } from 'path';

    const cliPath = resolve(__dirname, '../dist/index.js');

    describe('cogtools CLI', () => {
      it('should output the greeting from lib', async () => {
        const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
          exec(`node ${cliPath}`, (error, stdout, stderr) => {
            if (error) {
              reject(error);
            } else {
              resolve({ stdout, stderr });
            }
          });
        });

        expect(stdout.trim()).toBe('Hello from @cogtools/lib!');
        expect(stderr).toBe('');
      });
    });
    ```

**Verification:**

- **Command:** `pnpm --filter @cogtools/cogtools test`
- **Expected Output:** The command should execute successfully, and the Vitest output should indicate that 1 test suite passed with 1 test passing.

### Milestone 5: Type-Checking Across Packages

**Goal:** Verify that `pnpm typecheck` correctly identifies type errors across package boundaries.

**Steps:**

1.  **Introduce a deliberate type error in `packages/cogtools-lib/src/index.ts`:**
    ```typescript
    // packages/cogtools-lib/src/index.ts (TEMPORARY ERROR)
    export function getGreeting(): number {
      // Changed to number
      return 'Hello from @cogtools/lib!';
    }
    ```

**Verification (Failure Expected):**

- **Command:** `pnpm typecheck`
- **Expected Output:** The command should fail with TypeScript errors indicating a type mismatch.

**Steps (Revert Error):**

1.  **Revert the type error in `packages/cogtools-lib/src/index.ts`:**
    ```typescript
    // packages/cogtools-lib/src/index.ts (REVERTED)
    export function getGreeting(): string {
      return 'Hello from @cogtools/lib!';
    }
    ```

**Verification (Success Expected):**

- **Command:** `pnpm typecheck`
- **Expected Output:** The command should execute successfully with no TypeScript errors.

### Milestone 6: Publishable Library Typings - Conditional Build

**Goal:** Implement the separate `build:types` script for `@cogtools/lib` to generate `.d.ts` files, specifically for publication purposes.

**Steps:**

1.  **Create `packages/cogtools-lib/tsconfig.build.json`:**
    ```json
    {
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "declaration": true,
        "emitDeclarationOnly": true,
        "outDir": "dist"
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules", "dist", "src/**/*.test.ts"]
    }
    ```
2.  **Modify `packages/cogtools-lib/package.json`:**
    - Add the `build:types` script and the `types` field.
    ```json
    {
      "name": "@cogtools/lib",
      "version": "1.0.0",
      "description": "Shared library for metacognitive tooling components.",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "type": "module",
      "scripts": {
        "build": "node ../../scripts/build.mjs src/index.ts dist/index.js",
        "build:types": "tsc --project tsconfig.build.json",
        "test": "vitest"
      },
      "dependencies": {
        "nunjucks": "^3.2.4",
        "yargs": "^18.0.0"
      },
      "devDependencies": {
        "@types/nunjucks": "^3.2.6",
        "@types/yargs": "^17.0.33"
      }
    }
    ```

**Verification:**

- **Command:** `pnpm --filter @cogtools/lib build:types`
- **Expected Output:** The command should execute successfully.
- **File System Check:**
  - Verify that `packages/cogtools-lib/dist/index.d.ts` now exists.

## Affected Files

- `packages/cogtools-lib/src/index.ts`
- `packages/cogtools-lib/src/index.test.ts`
- `packages/cogtools-lib/package.json`
- `packages/cogtools-lib/tsconfig.build.json` (new file)
- `packages/cogtools/src/index.ts`
- `packages/cogtools/src/index.test.ts`
- `packages/cogtools/package.json`

## Git Strategy

I will create a new branch for these changes and commit each milestone as a separate, atomic commit.

## Potential Risks and Considerations

- Ensuring `pnpm install` is run after `package.json` modifications to correctly link workspace dependencies.
- Path resolution in black-box tests (`cliPath`) needs to be precise.
- The `scripts/build.mjs` script needs to be robust enough for all packages.

Please review this plan. If approved, I will proceed with the implementation.
