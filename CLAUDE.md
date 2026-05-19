# my-first-plugin — Development Guidelines

This file contains instructions for Claude instances working on this plugin and for human contributors.

## Plugin Purpose

`my-first-plugin` is a Claude Code plugin. It extends Claude Code via skills, commands, agents, and/or hooks.

## Directory Structure

```
my-first-plugin/
├── .claude-plugin/plugin.json   # Plugin manifest — update version on releases
├── skills/<name>/SKILL.md       # Model-invoked or user-invoked skills
├── commands/<name>.md           # Legacy slash command format (prefer skills/)
├── agents/<name>.md             # Subagent definitions
├── hooks/hooks.json             # Event hook configuration
└── .mcp.json                    # MCP server integrations
```

## Conventions

### Naming

- Use **kebab-case** for all directory and file names
- Skill directory names must match the `name` field in their `SKILL.md` frontmatter
- Command files must be named `<command-name>.md`

### Skills

Every skill MUST have a `SKILL.md` with valid YAML frontmatter:

```yaml
---
name: skill-name           # required — matches directory name
description: |             # required — controls when Claude uses this skill
  Use when the user asks to "do X", mentions "Y", or needs help with Z.
version: 1.0.0             # recommended
---
```

The `description` field drives automatic activation — write it as a precise trigger condition.

### Versioning

- Follow [Semantic Versioning](https://semver.org/)
- Update `version` in `.claude-plugin/plugin.json` for every release
- Keep a `CHANGELOG.md` (when the plugin matures)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new-skill for X
fix: correct frontmatter in commands/foo.md
docs: update README installation instructions
chore: bump version to 0.2.0
```

## Adding a New Skill

1. Create directory: `skills/<skill-name>/`
2. Create `skills/<skill-name>/SKILL.md` with frontmatter and body
3. Test: install the plugin locally and verify Claude activates the skill for expected queries
4. Update `README.md` if the skill is user-facing

## Adding a New Command

Prefer the `skills/` format. For a slash command `/foo`:

```
skills/foo/SKILL.md   ← preferred
commands/foo.md       ← legacy (functionally identical)
```

## Testing

- Install the plugin locally via Claude Code: `/plugin install path:/path/to/my-first-plugin`
- Verify skills activate for their trigger phrases
- Verify commands appear in `/help` output
- Test hook scripts with `${CLAUDE_PLUGIN_ROOT}` expansion

## Do Not Commit

- `.omc/state/` — runtime session state (excluded by `.gitignore`)
- `.env` files with secrets
- Binary files or large media unless absolutely necessary
