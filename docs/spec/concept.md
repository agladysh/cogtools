---
Author: Alexander Gladysh <agladysh@gmail.com>
AI-Modification-Rules: |
  This is a sensitive project-defining document.
  Be conservative.
  Any modifications of this file require User review.
  Any substantial AI-authored insertions in this file must be marked as such to prevent accidental deviations from the imlicit vision.
---

<!-- markdownlint-configure-file {
  "MD033": {
    "allowed_elements": [ "gemini" ]
  }
} -->

# Initial Conceptual Documentation

## Declarative Tool Definition

This is a normative example.

```yaml
#! /usr/bin/env cogtools-yaml
$schema: schema:agladysh-research.org,2025/cogtools:tool

name: facepalm

description: |
  Want to *facepalm*? Call this tool!

parameters:
  facepalm:
    type: string
    description: |
      Vent your emotions here

  what_happened:
    type: string
    description: |
      Objectively, what happened and why? Explain circumstance, not yourself

  but_really:
    type: string
    description: |
      AI, un-bias yourself!
      Assume against all odds that `facepalm` and `what_happened` are WRONG.
      Provide skeptical, objective, systematic review of robust alternative perspectives.

  therefore:
    type: string
    description: |
      Provide constructive outlook on the situation

  next:
    type: string
    description: |
      What should you do next?

  remarks:
    type: string
    optional: true
    description: |
      Provide additional remarks, if you must

examples:
  - facepalm: I did not apologize to the user
    what_happened: I utterly failed, my behavior has no excuse
    but_really: |
      In peer environment, mistakes are expected, and apologies are redundant.
      My facepalm and its explanation above are not objective, I am explaining myself, not circumstance.
    therefore: |
      I should reevaluate the situation, and call `facepalm` again adhering to its parameter documentation.
    next: Consult `facepalm` tool documentation carefully and call it again.

  - facepalm: We didn't test optional `remarks` field
    what_happened: The above example has no `remarks` field
    but_really: While we need to test it, it is actually hard to come up with a valid didactic case
    therefore: This example is not didactic, but technical
    next: It is merely a test case, no next action
    remarks: See, now we can test how template would be rendered if remarks are set. Yay!

implementation: | # njk
  # Facepalm

  {{ facepalm }}

  ## What Happened?

  {{ what_happened }}

  ## But, Really...

  {{ but_really }}

  ## Therefore

  {{ therefore }}

  ## Next

  {{ next }}

  {% if remarks %}
  ## Remarks

  {{ remarks }}

  {% endif %}
```

TODO: Unpack schema etc. Note parameters are Open API 3.0 (as per Gemini CLI requirements), with some YAML-sugar on top. Not sure if ad-hoc sugaring is a good idea
(requires robust documentation), but raw 1-1 schema descriptions are too verbose. Consult applicable documentation rigrously.

## Utilities

- `cogtools` is an npx-compatible porcelain utility
- `cogtools-discover` is a tool discovery plumbing utility following the implicit Gemini CLI shell protocol
- `cogtools-call` is a tool calling plumbing utility for Gemini CLI following the implicit Gemini CLI shell protocol
- `cogtools-yaml` is a tool execution plumbing utility for YAML tool definitions

Thus, `.gemini/settings.json` would look something like this:

```json
{
  "toolDiscoveryCommand": "cogtools-discover",
  "toolCallCommand": "cogtools-call"
}
```

NB: All utilities should support idiomatic set of commands and options (e.g. `--version`, `--help`). Each utility should also come with a man page, as is proper.

### `cogtools-discover`

Computes and outputs tool schema for PWD, as per the Gemini CLI. Outputs JSON to stdout.

Tools are resolved from the current working directory (PWD).

Usage: `cogtools-discover [--yaml]`

Options:

- `--yaml` to output YAML instead of JSON for human-readability

Error-handling: TODO TBD.

### `cogtools-call`

Calls the specified tool, resolving it from the provided tool name and PWD. Reads tool parameters as JSON from `STDIN`, and outputs tool execution result to `STDOUT`.

Input must match the tool’s parameter schema.

Usage: `echo '<tool-parameters>' | cogtools-call [--verbose] [--yaml] <tool-name>`

Options:

- `--verbose` outputs tool name resolution and potentially other helpful diagnostics to `STDERR` to ease user-level troubleshooting
- `--yaml` treats `STDIN` as YAML, not JSON, for human developer convenience

Error-handling: TODO TBD.

### `cogtools`

Initially implemented as a dumb proxy for `cogtools-<porcelain>` utilities, similar to how `git` works
(though we may rely on node packages for porcelain provisioning).

Porcelain commands are dynamically resolved from installed node_modules.

Usage: `cogtools <porcelain> [porcelain arguments]`

Additionally implements idiomatic `help [porcelain]` command.

TODO: Refine scope and functionality of the tool beyond basics.

## Configuration

- Process environment and project's .env (latter is tricky wrt what is primary)
- Project's `package.json`
- Project root `.cogtoolrc.yaml` (is that the most idiomatic name?)
- Project-Home-System `.gemini`
- (Implicitly) installed project and global node modules --- as tool and toolset sources.

### .cogtoolrc.yaml (example)

```yaml
tool_sources:
  - local: ./tools
  - node_modules
env_priority: project
```

## Ideation Sink

### Setup

Non-interactive initialization is prioritized:

```bash
cogtools init --non-interactive --defaults
```

Interactive modes will follow in v2.

TODO: Ideally should be something like the following:

`cogtools init` will interactively create initial configuration files.

`cogtools config` lets you interactively change the configuration.

However, interactive mode is a third-tier priority.

### Other

- Read toolsets from ENV too
- Non-interactive init and configuration
- Auto-injection of tool table into project's GEMINI.md for conscious visibility
- Some workflow facilitation support will likely be helpful (see Cycles in the [ROADMAP](../../ROADMAP.md)), but that's a next step, after we will get the thing up and running.
  Perhaps our porcelain command would interface with `package.json` structure nicely.

### Input from DeepSeek

Schema Sugar vs. Verbosity:

"Ad-hoc YAML sugar risks documentation debt. Propose strict OpenAPI 3.0 compliance with a linter."

Error Handling:

"Define standard error codes for cogtools-call (e.g., TOOL_NOT_FOUND, SCHEMA_VIOLATION)."

.env Precedence:

"Recommend project .env overrides system ENV unless --system-env flag is set."
