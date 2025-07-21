# Initial Conceptual Documentation

## Declarative Tool

```yaml
$schema: schema:agladysh-research.org,2025/gemini-cli-cogtools:tool

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

## Setup

TODO: Ideally should be something like the following:

`gemini-cli-cogtools init` will interactively create initial configuration files.

`gemini-cli-cogtools config` lets you interactively change the configuration.

## Temporary Notes

* Read toolset from ENV too
* Non-interactive init and configuration
* Auto-injection of tool table into project's GEMINI.md for conscious visibility
