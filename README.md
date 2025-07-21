# Metacognitive Tooling Scaffolding for AI Agents

The `@cogtools/cogtools` utility provides a declarative way to provide metacognitive tools for AI agents.

Metacognitive tools provide pre-made  thought-forms for an AI, guiding and shaping is cognition.

Initial scope is Gemini in the [Gemini CLI](https://github.com/google-gemini/gemini-cli) environment.

The same approach should work in other environments, supporting `.gemini` directories, for example,
in the [Gemini Code Assist](https://codeassist.google/).

## Project Status

This project is in active development. Use at your own risk.

See [Concept](docs/spec/concept.md) meanwhile.

## Background

Gemini CLI's LLM toolset is [configurable](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md)
in `.gemini/settings.json`.

Users may provide tools either by configuring MCP servers, or directly, via command-line integration.

Users also may set up semi-rudimentary
[Gemini CLI Extensions](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md) in `.gemini/` directories.

## Installation

> [!NOTE]
> The examples below use `pnpm` as a package manager.
>
> TODO: Provide instructions for other package managers.

```shell
pnpm install -g @agladysh/cogtools
```

TODO: Document `pnpx` use (provided it is meaningful).

## Configuration

TODO: Document

## Advanced Usage

TODO: Describe coding a tool in-place (as a shell-executable), as well as loading it as a module.

## Development

TODO: Document

## License

MIT. See [LICENSE](LICENSE) for more information.
