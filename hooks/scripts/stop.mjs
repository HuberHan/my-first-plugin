/**
 * Stop hook — fires when the main Claude agent considers stopping.
 * Use this to validate task completion before allowing Claude to finish.
 *
 * Input (stdin): { session_id, transcript, ... }
 * Output (stdout): JSON with decision "approve" or "block"
 */

const input = await readStdin();
const event = { event: 'Stop', session_id: input.session_id };

log(event);

// decision: "approve" — allow Claude to stop
// decision: "block"   — force Claude to continue (provide reason)
console.log(JSON.stringify({
  continue: true,
  hookSpecificOutput: {
    decision: 'approve',
    // reason: 'Tests have not been run yet — please run tests before stopping.',
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
  process.stderr.write(`[my-first-plugin:Stop] ${JSON.stringify(data)}\n`);
}
