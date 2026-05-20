/**
 * Shared debug logger for my-first-plugin hooks.
 *
 * Enable by setting the env var in ~/.claude/settings.json:
 *   { "env": { "MY_FIRST_PLUGIN_DEBUG": "true" } }
 *
 * Or per-session: MY_FIRST_PLUGIN_DEBUG=true claude
 */

const DEBUG = process.env.MY_FIRST_PLUGIN_DEBUG === 'true';

/**
 * Log a lifecycle event to stderr (only when DEBUG is enabled).
 * @param {string} event  — lifecycle event name, e.g. 'PreToolUse'
 * @param {object} data   — relevant context data
 */
export function log(event, data = {}) {
  if (!DEBUG) return;
  const ts = new Date().toISOString();
  process.stderr.write(`[${ts}] [my-first-plugin:${event}] ${JSON.stringify(data)}\n`);
}
