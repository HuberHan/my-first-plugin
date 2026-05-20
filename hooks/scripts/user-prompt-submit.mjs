/**
 * UserPromptSubmit hook — fires when the user submits a prompt.
 * Use this to inject context, validate input, or block specific requests.
 *
 * Input (stdin): { prompt, session_id, ... }
 * Output (stdout): JSON with optional systemMessage injected before Claude responds
 */

const input = await readStdin();
const event = { event: 'UserPromptSubmit', prompt: input.prompt?.slice(0, 80), session_id: input.session_id };

log(event);

// Return systemMessage to inject context before Claude processes the prompt.
// Set continue: false to block the prompt entirely.
console.log(JSON.stringify({
  continue: true,
  // systemMessage: 'Additional context to inject here',
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

function log(data) {
  process.stderr.write(`[my-first-plugin:UserPromptSubmit] ${JSON.stringify(data)}\n`);
}
