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
    what_happened: I utterly failed, my behavior has no execuse
    but_really: |
      In peer environment, mistakes are expected, and apologies are redundant.
      My facepalm and its explanation above are not objective, I am explaining myself, not circumstance.
    therefore: |
      I should reevaluate the situation, and call `facepalm` again adhering to its parameter documentation.
    next: Consult `facepalm` tool documentation carefully and call it again.

  - facepalm: We didn't test optional `remarks` field
    what_happened: Above example has no `remarks` field
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

* `cogtools` is an npx-compatible porcelain utility
* `cogtools-discover` is a tool discovery plumbing utility following the implicit Gemini CLI shell protocol
* `cogtools-call` is a tool calling plumbing utility for Gemini CLI following the implicit Gemini CLI shell protocol

Thus, `.gemini/settings.json` would look something like this:

```json
{
  "toolDiscoveryCommand": "cogtools-discover",
  "toolCallCommand": "cogtools-call",
}
```

TODO: Explicitly document the implicit Gemini CLI protocol we follow in a separate spec, so it is generally reusable. Refer to the Gemini CLI docs.

### Setup

TODO: Ideally should be something like the following:

`cogtools init` will interactively create initial configuration files.

`cogtools config` lets you interactively change the configuration.

However, interactive mode is a third-tier priority.

## Temporary Notes

* Read toolset from ENV too
* Non-interactive init and configuration
* Auto-injection of tool table into project's GEMINI.md for conscious visibility
