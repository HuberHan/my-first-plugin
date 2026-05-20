/**
 * PreToolUse hook — fires before any tool call executes.
 * Use this to approve, deny, or modify tool calls.
 *
 * Input (stdin): { tool_name, tool_input, session_id, ... }
 * Output (stdout): JSON with hookSpecificOutput.permissionDecision
 */

const input = await readStdin();
const event = { event: 'PreToolUse', tool: input.tool_name, session_id: input.session_id };

log(event);

// permissionDecision: "allow" | "deny" | "ask"
// Set to "deny" with a systemMessage to block specific tools.
console.log(JSON.stringify({
  continue: true,
  hookSpecificOutput: {
    permissionDecision: 'allow',
  },
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

function log(data) {
  process.stderr.write(`[my-first-plugin:PreToolUse] ${JSON.stringify(data)}\n`);
}
