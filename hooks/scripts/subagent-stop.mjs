/**
 * SubagentStop hook — fires when a subagent (child agent) considers stopping.
 * Use this to validate that the subagent completed its delegated task.
 *
 * Input (stdin): { session_id, transcript, ... }
 * Output (stdout): JSON with decision "approve" or "block"
 */

const input = await readStdin();
const event = { event: 'SubagentStop', session_id: input.session_id };

log(event);

// Same decision interface as Stop, but scoped to subagents.
console.log(JSON.stringify({
  continue: true,
  decision: 'approve',
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

function log(data) {
  process.stderr.write(`[my-first-plugin:SubagentStop] ${JSON.stringify(data)}\n`);
}
