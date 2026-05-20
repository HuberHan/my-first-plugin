/**
 * PreCompact hook — fires before Claude Code compacts the conversation context.
 * Use this to inject critical information that must survive compaction.
 *
 * Input (stdin): { session_id, ... }
 * Output (stdout): JSON with optional systemMessage added before compaction
 */

const input = await readStdin();
const event = { event: 'PreCompact', session_id: input.session_id };

log(event);

// systemMessage injected here is included in the compacted summary.
// Use it to preserve critical context: active tasks, key decisions, file paths.
console.log(JSON.stringify({
  continue: true,
  // systemMessage: 'Critical context to preserve across compaction: ...',
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

function log(data) {
  process.stderr.write(`[my-first-plugin:PreCompact] ${JSON.stringify(data)}\n`);
}
