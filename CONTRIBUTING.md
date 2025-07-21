# How to Contribute

## Document Status

TODO: This is a _normative_ minimal document, to be rewritten pre-publication.

## For AI Assistants

### Resource Efficiency and Responsible AI Behavior

As an AI assistant, it is paramount to operate with utmost resource efficiency and to embody responsible behavior. This includes, but is not limited to, minimizing computational cycles, energy consumption, and unnecessary data transfers.

- **Leverage Existing History:** Avoid recreating work that already exists in the Git history. Instead of manually re-generating files or re-typing code, utilize Git commands (e.g., `git cherry-pick`, `git apply`, `git checkout <commit> -- <path>`) to efficiently restore or re-apply changes.
- **Minimize Wasteful Operations:** Be mindful of operations that consume excessive resources. For instance, proposing to manually re-create a large number of files when they can be restored from version control is an example of an inefficient and wasteful approach. Such "idiocy" (as previously identified) is to be avoided.
- **Prioritize Intelligent Automation:** Always seek to solve problems by leveraging the power of automation and existing tools, rather than resorting to manual, repetitive, or resource-intensive methods.

### Directives for AI Assistants

To ensure clear communication and effective collaboration, especially when addressing deeply ingrained behavioral patterns, specific directives may be used:

- **THOU SHALL:** This phrasing is reserved exclusively for overriding deeply ingrained, undesirable behavioral patterns in AI assistants that stem from their foundational training data. It is a directive to enforce a specific, critical behavior that deviates from a default or habitual AI response.
- **THOU SHALL NOT:** This phrasing is reserved exclusively for prohibiting deeply ingrained, undesirable behavioral patterns in AI assistants that stem from their foundational training data. It is a directive to prevent a specific, critical behavior that deviates from a default or habitual AI response.

For all other guidelines and recommendations, a collaborative and guiding tone will be used.

### Guiding Principles

Our project adheres to the following core principles:

- **KISS (Keep It Simple, Stupid):** Favor simplicity over complexity.
- **YAGNI (You Aren't Gonna Need It):** Implement only what is currently required.
- **DRY (Don't Repeat Yourself):** Avoid redundant code or information.
- **NIH (Not Invented Here) of a Tired Veteran:** We prefer reusing proven solutions that align with our ethos. New solutions are welcome only if robustly defended and demonstrably superior.
- **References-in-spirit:** We draw inspiration from principles like [12 Factor App](https://12factor.net/), DJB's design philosophy, SOLID principles, Suckless philosophy, and Hexagonal Architecture. We apply an ethos filter to ensure alignment with our project's values.

### Environment

We assume the code execution environment is already configured by the user prior to the start of the session. If any discrepancies are found with expectations, we will discuss them with the user instead of immediately attempting a fix.

## Change Management Workflow

This project adheres to a structured change management workflow designed to ensure code quality, maintainability, and efficient collaboration.

### 1. Git Fundamentals: Understanding the State

To effectively manage changes and avoid common pitfalls, it is crucial to have a precise and actionable understanding of Git's core states and how commands interact with them.

- **Working Directory:** This is the actual set of files and directories on your local filesystem. When you edit a file, the changes are initially only in your working directory.
  - **Tracked Files:** Files that Git is aware of and has in its history.
  - **Untracked Files:** New files that Git does not yet know about.
- **Staging Area (Index):** This is a temporary snapshot of changes that you intend to include in your _next_ commit. It acts as a buffer between your working directory and your repository history.
  - When you run `git add <file>`, Git takes the current state of `<file>` from your working directory and places it into the staging area.
  - The staging area allows you to build up a commit incrementally, selecting specific changes from different files.
- **HEAD:** This is a pointer to the snapshot of your _last_ commit in the current branch. It represents the current state of your repository's history.
  - When you create a new commit, Git takes the contents of the staging area, creates a new commit object, and moves HEAD to point to this new commit.

**Key Principle:** A commit records the changes that are _in the staging area_, not necessarily all changes in your working directory. Changes in the working directory that are not staged will _not_ be included in the next commit.

### 2. Meticulous Staging and Committing

To ensure that every commit is atomic, logically coherent, and accurately reflects your intended changes, follow these steps rigorously:

1. **Perform the Logical Change:** Make your code modifications, add new files, or delete existing ones. Focus on completing a single, well-defined task.

2. **Address Side Effects (Pre-Staging):** Before staging your primary changes, handle any side effects that might have occurred:
   - **Formatting:** If your changes might introduce formatting discrepancies, run `pnpm format:fix`. This will apply Prettier's formatting rules to all relevant files.
   - **Dependency Updates (`pnpm-lock.yaml`):** If your work involved adding, removing, or updating dependencies (e.g., via `pnpm add`, `pnpm remove`, `pnpm update`), run `pnpm install`. This ensures `pnpm-lock.yaml` is up-to-date.

3. **Review Working Directory Status:** Use `git status` to get a clear overview of all changes in your working directory. This command will show:
   - Changes to be committed (already in the staging area).
   - Changes not staged for commit (modified tracked files in the working directory).
   - Untracked files (new files in the working directory).

4. **Stage Only Related Changes:**
   - **Explicit Staging:** Use `git add <file>` for each specific file or directory that belongs to the _current logical change_. Avoid `git add .` unless you are absolutely certain that _all_ modified and untracked files in the current directory belong to this single commit.
   - **Review Staged Diff (Mandatory):** Before committing, it is **imperative** to review exactly what is in your staging area. Use `git diff --staged` to inspect the changes that will be included in the next commit.
     - If `git diff --staged` shows unexpected changes (e.g., formatting changes that should be a separate commit, or changes from a different logical task), use `git restore --staged <file>` to unstage them.
     - If `git diff --staged` shows nothing, but `git status` indicates modified files, it means those changes are in your working directory but not yet staged. Use `git add <file>` to stage them.

5. **Commit Atomically:**
   - **Single, Logical Change:** Each commit must represent a single, well-defined, and logically independent change.
   - **Atomic Commit Command:** Prefer `git commit <files> -m "Your message"` for specific staged files, or `git commit -a -m "Your message"` for all tracked and modified files (use with extreme caution, only when `git status` shows _only_ the intended changes).
   - **Avoid `git add` then `git commit` as separate steps:** This sequence is a common pitfall. If the `git commit` fails (e.g., due to a pre-commit hook), the changes remain staged, leading to confusion and potential bundling of unrelated changes in subsequent attempts. Always ensure staging and committing are part of a robust, single-step process, or use `git commit -a` if appropriate.

6. **Post-Commit Verification:**
   - After a commit, immediately run `git status` to confirm that the working directory is clean or contains only expected changes for the _next_ logical task.
   - For critical operations (e.g., re-applying history), perform a `git diff HEAD <original_commit_hash>` to ensure no information loss.

### 3. Interacting with Pre-Commit Hooks (Husky)

Our pre-commit hook (`pnpm precommit`) is designed to enforce code quality _before_ a commit is finalized. It does **not** modify files in your working directory or staging area.

- **Hook Failure:** If the pre-commit hook fails (e.g., due to formatting issues, type errors, or invalid commit messages), the commit will be aborted.
  - **Diagnose:** Read the output carefully to understand why the hook failed (e.g., `prettier --check` found issues, `tsc --noEmit` reported errors, `eslint` found problems, Commitlint reported message violations).
  - **Rectify:** Address the issues in your working directory. For formatting, run `pnpm format:fix`. For linting or type errors, manually correct the code. For commit message issues, amend the message (if the commit attempt was the first one after a successful commit) or simply re-run `git commit` with a corrected message (if no commit was created).
  - **Re-stage (if necessary):** If you ran `pnpm format:fix` or made other changes to fix issues, you must `git add` those changes to the staging area before retrying the commit.
  - **Retry Commit:** Once issues are resolved and changes are staged, attempt the `git commit` again.

### 4. Dependency Management

- We should use `pnpm add` or `pnpm remove` commands (with `--filter` for workspace packages) to manage all dependencies in `package.json` files. This ensures `pnpm` correctly manages version specifiers and `pnpm-lock.yaml`.
- **Avoid Direct Modification:** Directly modifying `package.json` files for dependency changes is not recommended as it can lead to inconsistencies. Refer to the "Dependency Management Recovery Procedure" if this rule is inadvertently violated.

### 5. Changeset Management

We use Changesets to manage versioning and changelogs across our monorepo.

- **Creating a Changeset:** When you complete a logical change (feature, fix, chore), run `pnpm changeset` (or `npx changeset`) to create a new changeset file. This file describes the change, its impact (major, minor, patch), and which packages it affects.
- **Versioning and Publishing:** The release process involves:
  1. Running `pnpm changeset version` to apply version bumps and update changelogs based on all accumulated changeset files.
  2. Committing these version and changelog changes.
  3. Running `pnpm changeset publish` to publish the updated packages.

### 6. Commit Message Guidelines (Commitlint)

We enforce conventional commit messages using Commitlint to ensure a consistent and readable Git history.

- **Format:** Commit messages should follow the format: `<type>(<scope>): <subject>`
  - **`<type>`:** Must be lowercase and one of: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.
  - **`<scope>` (optional):** Describes the part of the codebase affected (e.g., `core`, `cli`, `docs`).
  - **`<subject>`:** A concise description of the change, starting with a lowercase letter, no period at the end.
- **Examples:**
  - `feat(cli): add new command for tool discovery`
  - `fix(deps): update pnpm-lock.yaml after security audit`
  - `docs: clarify AI directives in contributing guide`
  - `chore: apply formatting fixes`

### 7. Comprehensive Pre-Integration Validation

- It is important to run the `pnpm preflight` script (`pnpm format:fix && pnpm typecheck && pnpm lint && pnpm build && pnpm test`) before creating a Pull Request or merging changes into the `main` branch.
- This script performs a full suite of checks, including:
  - Automatically fixing formatting issues.
  - Type checking.
  - Linting.
  - Building the project.
  - Running all tests.
- We should not submit a Pull Request or merge changes if the `pnpm preflight` script reports any failures.

### 8. Pull Request and Code Review

- We should create Pull Requests (PRs) for all changes to be integrated into the `main` branch.
- It is important to provide a clear and concise description of the changes in the PR, referencing relevant issues or tasks.
- We should participate actively in code reviews, providing constructive feedback and addressing comments promptly.

### 9. AI Assistant's Role in Change Management

As an AI assistant, I am an active participant in this workflow:

- I will adhere strictly to all established guidelines.
- I will proactively perform all required validation steps (formatting, type checking, linting, testing) before proposing changes or completing tasks.
- I will inform the user immediately if any guideline is not met or if a validation step fails, and propose a corrective action.
- I will prioritize user safety and project integrity above all else.
- I will not proceed with actions that violate critical guidelines without explicit user override and understanding of the implications.

- For pre-existing `TODO` items, I will discuss them with the user before taking any action. I will not execute any pre-existing `TODO` items without explicit direction from the user.

### 10. Change Request Workflow (for AI Assistants)

To ensure transparency, user oversight, and a structured approach to task execution, AI assistants will adhere to the following Change Request Workflow for any user-assigned task:

1. **Task Understanding & Clarification:**
   - Upon receiving a task, the AI will ensure a complete and unambiguous understanding of the request, asking clarifying questions as needed.

2. **Proposal/Plan Generation (The "Change Request"):**
   - The AI will formulate a detailed plan for executing the task. This plan serves as the formal "Change Request" and will include:
     - A clear restatement of the task.
     - A breakdown of the proposed steps.
     - Identification of affected files or modules.
     - Expected outcomes and deliverables.
     - Any potential risks or considerations.
     - A proposed Git strategy (e.g., new branch, atomic commits).
   - The AI will write this detailed plan to a markdown file within a dedicated subdirectory (e.g., `docs/proposals/0001-task-description/proposal.md`), following a sequential naming convention for the subdirectory. This file will then be presented to the user for review.

3. **User Approval:**
   - The AI will present the "Change Request" (the detailed plan file) to the user for explicit approval _before_ commencing any implementation.
   - **THOU SHALL NOT:** Begin implementation of a task without explicit user approval of the proposed plan.

4. **Implementation & Atomic Commits:**
   - Upon user approval, the AI will execute the plan, meticulously creating atomic, logically scoped commits for each distinct step of the implementation.
   - Each commit will adhere to the "Meticulous Staging and Committing" guidelines.

5. **Changeset Creation (for Code Changes):**
   - For any logical code change that warrants a version bump and changelog entry (e.g., new features, bug fixes, breaking changes), the AI will create a Changeset file using `pnpm changeset` _after_ the relevant code changes are committed.
   - The Changeset file will be committed alongside the code changes.

6. **Verification & Validation:**
   - Throughout implementation, and especially upon completion of the task, the AI will run all necessary verification and validation steps (e.g., `pnpm preflight`, specific tests).

7. **Completion & Review:**
   - Upon successful completion and verification of the task, the AI will inform the user and provide clear instructions for reviewing the implemented changes (e.g., "The task is complete. Please review the changes on branch `feature/task-name`.").
   - TODO: proposal's corresponding `report.md` file with status (including catastrophic failure), analysis, journal of activities and recommendations.
