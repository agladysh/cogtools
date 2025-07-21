# Project Roadmap

The project is currently in the conceptualization / ideation stage.

This document describes a tentative roadmap.

## Initial Project Setup

Continue configuring environment.

Use the [gemini-cli](https://github.com/google-gemini/gemini-cli/) project as a reference, where reasonable, to reduce cognitive load for other potential contributors.

Known tasks:

- [ ] Builder
- [ ] Linter
- [ ] Code formatter
- [ ] Tests
- [ ] Package publication

## AI-driven Development Cycle

Hook in `gemini-cli -p` to facilitate MANDATORY AI code SoTA review cycle. NPM scripts should chain everything as pre-actions from `test`
(though first see how gemini-cli project is set up).

Likely many calls (with custom GEMINI.md?) are expected, to cover a robust set of angles and review contexts.

### The Cycle

AI:

1. Scopes, defines and plans work. Designs and reviews code change proposal (including mentally modelling implementing and running it, as well as the quality of the code state after the change). Treats all that as living self-updating guide, not dogma.
2. Generates code
3. Formats-lints code (oft advised, but not required for humans, reduces AI cognitive load)
4. Reviews code initially pre-execution (implicit for humans who normally model code structure and execution wrile writing, required for AI, who do not, comparable to "returning to the freshly written untested code after a weekend for a human). Preliminary multi-angle review (TODO: Identify robust set of angles). (Implies that 2-4 is a cycle.) NB: Review also implies mentally modelling code execution etc.
5. Generates tests
6. Formats-lints tests.
7. Reviews tests initially pre-execution as above. (Implies 5-7 is a cycle.)
8. Reviews tests and code initially pre-execution as above (important to do 7 separately first to maintain focus). (Implies 2-8 is a cycle.)
9. Executes tests.
10. Reviews test failures. Is it environment, test, code or code change design wrong in any combination? Determines best course of action. Debugs and experiments to discern and determine as needed.
11. Implements change (or documents catastrophic failure and returns to item 1 of the cycle to re-implement from scratch). 9-11 is also a loop.
12. Once tests are passing, reviews the code and tests, and cleans it up from any debugging / experimentation residue.
13. Performs a final acceptance / code quality review, which might result in documenting the catastrophic failure and scrapping the whole effort.

Observe complexity, esp. wrt objective analysis and decision-making. Externalizing to a separate set of AI experts to analyze and recommend is important to keep cognitive load manageable. NB: Defining source of the cognitive load here: conflict of interest between all those hats. This is why it is not possible to have ideal system within a single conversation with an AI.

> [!NB]
> Ideally this would be encoded as a standalone "metacortex" (a mix of external tooling and cognitive tools) for TypeScript projects for Gemini CLI,
heavily relying on `gemini-cli-cogtools` implementation, and published on GitHub as a separate project.

### Composable GEMINI.md

To implement the above NB, we need to generate GEMINI.md. Ideally it would be a template. Several ways we can hook that (or maybe it is not even needed), need to look into it deeper.

### Managed `.gemini/` Directory

One of the options to implement what we're up to is to completely manage .gemini directory with our set of utilities.

## Concept

Continue refining the [Concept document](docs/spec/concept.md).

Known tasks:

- [ ] Describe envisioned FS layout in `.gemini/`
- [ ] Tools as YAML files and shell programs. Ideally YAML file would be a shell program too (meaning we split our utility to several, which is a good thing)
- [ ] Composable toolsets. Local and non-local (e.g. npm modules, but others too) tool sources. Which means we need a tool source id system (URNs would do)
- [ ] Overall set of utilities, their scopes and contracts

Well, the shell tool provider part of our utility is a tool source as well. Which implies there may be others, as long as they adher to the Gemini CLI discover/call protocol.
Which means our shell tool provider should not be special wrt itself (and, ideally, how it is provisioned in the `.gemini/settings` file).

Which is important, because some tool providers should be stateful (for performance and certain functional considerations).

An MCP server, of course, is a tool provider too. Which reinforces the managed `.gemini` idea. However, in this case narrowly it is not necessary, we might be able to rely on
support of shell variables in the `.gemini/settings` file.

## Other Complimentary Work

Placeholder for implied (known and unknown) work complimenting what is described above.

## Next

Placeholder for implied (known and unknown) work following what is described above.
