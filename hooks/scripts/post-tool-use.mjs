/**
 * PostToolUse hook — fires after a tool call completes.
 * Use this to react to results, provide feedback, or trigger follow-up actions.
 *
 * Input (stdin): { tool_name, tool_input, tool_response, session_id, ... }
 * Output (stdout): JSON with optional systemMessage fed back to Claude
 */

const input = await readStdin();
const event = { event: 'PostToolUse', tool: input.tool_name, session_id: input.session_id };

log(event);

// systemMessage is fed back to Claude after the tool result.
// Exit code 2 + stderr will block Claude and show an error message.
console.log(JSON.stringify({
  continue: true,
  // systemMessage: 'Post-tool feedback here',
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

function log(data) {
  process.stderr.write(`[my-first-plugin:PostToolUse] ${JSON.stringify(data)}\n`);
}
