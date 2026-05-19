# my-first-plugin

A Claude Code plugin template for extending Claude with skills, commands, agents, and hooks.

## Overview

`my-first-plugin` is a starter template for building [Claude Code plugins](https://docs.anthropic.com/en/docs/claude-code/plugins). Use it as a scaffold when creating your own plugin to distribute via GitHub.

## Installation

Install via the Claude Code plugin system:

```bash
# Install from GitHub
/plugin install github:HuberHan/my-first-plugin
```

Or add it as a marketplace in your Claude Code settings.

## Plugin Structure

```
my-first-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest (required)
├── skills/
│   └── example-skill/
│       └── SKILL.md         # Model-invoked skill
├── commands/                # Slash commands (.md files)  [add as needed]
├── agents/                  # Subagent definitions       [add as needed]
├── hooks/
│   └── hooks.json           # Event handlers             [add as needed]
├── .mcp.json                # MCP server config          [add as needed]
├── CLAUDE.md                # Dev guidelines for Claude
├── LICENSE
└── README.md
```

## Components

### Skills (`skills/`)

Skills are contextual guidance files that Claude autonomously uses based on task context. Each skill lives in its own subdirectory with a `SKILL.md` file.

**Model-invoked skill** — activates automatically based on context:
```yaml
---
name: my-skill
description: Use when user asks to "do X" or mentions "keyword Y"
version: 1.0.0
---
```

**User-invoked skill** (slash command `/my-skill`):
```yaml
---
name: my-skill
description: Short description shown in /help
argument-hint: <required> [optional]
allowed-tools: [Read, Glob, Grep, Bash]
---
```

### Commands (`commands/`)

Legacy slash command format — place `command-name.md` files here. Prefer the `skills/` format for new plugins.

### Agents (`agents/`)

Subagent definitions — `.md` files that define specialized autonomous agents Claude can spawn.

### Hooks (`hooks/hooks.json`)

Event-driven automation — respond to events like `PreToolUse`, `PostToolUse`, `SessionStart`, etc.

## Development

See [CLAUDE.md](./CLAUDE.md) for development guidelines.

## Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes following the conventions in `CLAUDE.md`
4. Commit: `git commit -m "feat: add my feature"`
5. Push and open a pull request

## License

MIT — see [LICENSE](./LICENSE)
