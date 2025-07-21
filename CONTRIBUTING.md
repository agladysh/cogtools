# How to Contribute

## Document Status

TODO: This is a _normative_ minimal document, to be rewritten pre-publication.

## For AI Assistants

### Resource Efficiency and Responsible AI Behavior

As an AI assistant, it is paramount to operate with utmost resource efficiency and to embody responsible behavior. This includes, but is not limited to, minimizing computational cycles, energy consumption, and unnecessary data transfers.

- **Leverage Existing History:** Avoid recreating work that already exists in the Git history. Instead of manually re-generating files or re-typing code, utilize Git commands (e.g., `git cherry-pick`, `git apply`, `git checkout <commit> -- <path>`) to efficiently restore or re-apply changes.
- **Minimize Wasteful Operations:** Be mindful of operations that consume excessive resources. For instance, proposing to manually re-create a large number of files when they can be restored from version control is an example of an inefficient and wasteful approach. Such "idiocy" (as previously identified) is to be avoided.
- **Prioritize Intelligent Automation:** Always seek to solve problems by leveraging the power of automation and existing tools, rather than resorting to manual, repetitive, or resource-intensive methods.

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

### Directives for AI Assistants

To ensure clear communication and effective collaboration, especially when addressing deeply ingrained behavioral patterns, specific directives may be used:

- **THOU SHALL:** This phrasing is reserved exclusively for overriding deeply ingrained, undesirable behavioral patterns in AI assistants that stem from their foundational training data. It is a directive to enforce a specific, critical behavior that deviates from a default or habitual AI response.
- **THOU SHALL NOT:** This phrasing is reserved exclusively for prohibiting deeply ingrained, undesirable behavioral patterns in AI assistants that stem from their foundational training data. It is a directive to prevent a specific, critical behavior that deviates from a default or habitual AI response.

For all other guidelines and recommendations, a collaborative and guiding tone will be used.

- **Dependency Management:** We should use `pnpm add` or `pnpm remove` commands (with `--filter` for workspace packages) to manage all dependencies in `package.json` files. This approach ensures `pnpm` correctly manages version specifiers and `pnpm-lock.yaml`. Directly modifying `package.json` files for dependency changes is not recommended as it can lead to inconsistencies.

### Dependency Management Recovery Procedure

If `package.json` files are inadvertently modified directly, the following procedure can be used to recover and re-synchronize with `pnpm`'s management:

1.  **Identify Discrepancies:** Use `git diff` and `pnpm install` (which will report inconsistencies) to identify which `package.json` files and dependencies are out of sync.
2.  **Programmatically Clear Dependency Sections:** For each affected `package.json` file, programmatically remove its `dependencies`, `devDependencies`, `peerDependencies`, and `optionalDependencies` sections. This ensures a clean slate for `pnpm`.
3.  **Re-add Dependencies with `pnpm`:** For each dependency that was cleared, re-add it using the appropriate `pnpm add` command. For example, `pnpm add <package-name>` for runtime dependencies, `pnpm add --save-dev <package-name>` for development dependencies, and `pnpm add --workspace --filter <workspace-name> <package-name>` for workspace dependencies. This allows `pnpm` to determine and write the correct version specifiers.
4.  **Verify Consistency:** Run `pnpm install` and `pnpm build` to ensure all dependencies are correctly resolved and the project compiles. Use `git diff` to confirm that `package.json` and `pnpm-lock.yaml` reflect only `pnpm`-managed changes.

### Understanding Git State (for AI Assistants)

To effectively manage changes, it is crucial to have a precise understanding of Git's three main states:

- **Working Directory:** This is where you make changes to files. Files here are either tracked (Git knows about them) or untracked (Git doesn't know about them yet).
- **Staging Area (Index):** This is an intermediate area where you prepare changes for your next commit. When you `git add` a file, you're adding its current state from the working directory to the staging area.
- **HEAD:** This refers to the snapshot of your last commit. When you commit, Git creates a new snapshot from the staging area and moves HEAD to point to it.

**Key Principle:** A commit records the changes that are _in the staging area_, not necessarily all changes in your working directory.

### Meticulous Staging and Committing

To ensure logical and atomic commits, especially when interacting with automated tools:

- **Always Review Staged Changes:** Before every commit, it is imperative to review exactly what is in your staging area. Use `git diff --staged` to inspect the changes that will be included in the next commit.
  - If `git diff --staged` shows unexpected changes, use `git restore --staged <file>` or `git restore --staged .` to unstage them.
  - If `git diff --staged` shows nothing, but `git status` indicates modified files, it means those changes are in your working directory but not yet staged. Use `git add <file>` to stage them.
- **Commit Only Related Changes:** Group only logically related modifications into a single commit. If you have changes for a feature, a formatting fix, and a dependency update, these should ideally be three separate commits.
- **Atomic Commit Operations:** Continue to prefer `git commit -a -m "..."` for tracked files or `git commit <files> -m "..."` for specific files. Avoid the `git add` then `git commit` sequence unless you are meticulously curating staged changes with `git add -p`.

### Interacting with Pre-Commit Hooks (Husky)

Our pre-commit hook (`pnpm precommit`) is designed to enforce code quality _before_ a commit is finalized. It does **not** modify files in your working directory or staging area.

- **Hook Failure:** If the pre-commit hook fails (e.g., due to formatting issues or type errors), the commit will be aborted.
  - **Diagnose:** Read the output carefully to understand why the hook failed (e.g., `prettier --check` found issues, `tsc --noEmit` reported errors, `eslint` found problems).
  - **Rectify:** Address the issues in your working directory. For formatting, run `pnpm format:fix`. For linting or type errors, manually correct the code.
  - **Re-stage (if necessary):** If you ran `pnpm format:fix` or made other changes to fix issues, you must `git add` those changes to the staging area before retrying the commit.
  - **Retry Commit:** Once issues are resolved and changes are staged, attempt the `git commit` again.

### Managing `pnpm-lock.yaml`

The `pnpm-lock.yaml` file is automatically generated and managed by `pnpm`. Changes to this file are often side effects of other operations (e.g., `pnpm install`, `pnpm add`, `pnpm remove`).

- **Commit Separately:** If `pnpm-lock.yaml` is modified as a side effect of a functional change or a dependency addition/removal, it is recommended to commit the `pnpm-lock.yaml` change in a **separate `chore` commit** (e.g., `chore: update pnpm-lock.yaml`). This keeps the commit history clean and focused.
- **Avoid Manual Edits:** Never manually edit `pnpm-lock.yaml`.

## Change Management Workflow

This project adheres to a structured change management workflow designed to ensure code quality, maintainability, and efficient collaboration, especially in an AI-assisted development environment.

### 1. Feature Branching

- It is recommended to develop all new features, bug fixes, or refactorings on dedicated feature branches (e.g., `feat/my-feature`, `fix/bug-description`, `refactor/module-x`).
- We should avoid committing directly to the `main` branch, as it must always remain stable and deployable.

### 2. Atomic Commits

- Each Git commit should represent a single, logical change with a minimal, reasonable scope. Avoid creating commits with an unreasonable or overly broad scope.
- It is important to craft clear, concise, and descriptive commit messages, ideally following a conventional format (e.g., `feat: Add new user authentication`, `fix: Resolve login redirect bug`).
- We should prefer atomic Git commit operations (e.g., `git commit -a -m "..."` for tracked files) or ensure staging and committing are part of a robust, single-step process. Avoid using `git add <file>...` followed by `git commit` as separate steps, as this can lead to inconsistent states if pre-commit hooks fail.

### 3. Pre-Commit Validation (Local Enforcement)

- We rely on the `pre-commit` Git hook (managed by Husky) to automatically validate changes before a commit is finalized. It is important not to bypass pre-commit hooks unless explicitly instructed by a human user for debugging purposes.
- The `pre-commit` hook executes the `pnpm precommit` script, which includes:
  - `pnpm format:check`: Verifies code formatting.
  - `pnpm typecheck`: Ensures TypeScript code compiles without errors.
  - `pnpm lint`: Runs static analysis for code quality and potential issues.
- Any issues reported by the pre-commit hook should be addressed before attempting to commit again.

### 4. Dependency Management

- We should use `pnpm add` or `pnpm remove` commands (with `--filter` for workspace packages) to manage all dependencies in `package.json` files. This ensures `pnpm` correctly manages version specifiers and `pnpm-lock.yaml`. Refer to the "Dependency Management Recovery Procedure" if this rule is inadvertently violated.

### 5. Comprehensive Pre-Integration Validation

- It is important to run the `pnpm preflight` script (`pnpm format:fix && pnpm typecheck && pnpm lint && pnpm build && pnpm test`) before creating a Pull Request or merging changes into the `main` branch.
- This script performs a full suite of checks, including:
  - Automatically fixing formatting issues.
  - Type checking.
  - Linting.
  - Building the project.
  - Running all tests.
- We should not submit a Pull Request or merge changes if the `pnpm preflight` script reports any failures.

### 6. Pull Request and Code Review

- We should create Pull Requests (PRs) for all changes to be integrated into the `main` branch.
- It is important to provide a clear and concise description of the changes in the PR, referencing relevant issues or tasks.
- We should participate actively in code reviews, providing constructive feedback and addressing comments promptly.

### 7. AI Assistant's Role in Change Management

As an AI assistant, I am an active participant in this workflow:

- I will adhere strictly to all established guidelines.
- I will proactively perform all required validation steps (formatting, type checking, linting, testing) before proposing changes or completing tasks.
- I will inform the user immediately if any guideline is not met or if a validation step fails, and propose a corrective action.
- I will prioritize user safety and project integrity above all else.
- I will not proceed with actions that violate critical guidelines without explicit user override and understanding of the implications.

- For pre-existing `TODO` items, I will discuss them with the user before taking any action. I will not execute any pre-existing `TODO` items without explicit direction from the user.
