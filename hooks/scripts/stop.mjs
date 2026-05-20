/**
 * Stop hook — fires when the main Claude agent considers stopping.
 * Use this to validate task completion before allowing Claude to finish.
 *
 * Input (stdin): { session_id, transcript, ... }
 * Output (stdout): JSON with decision "approve" or "block"
 */

import { log } from '../logger.mjs';

const input = await readStdin();

log('Stop', { session_id: input.session_id });

// decision: "approve" — allow Claude to stop
// decision: "block"   — force Claude to continue (provide reason)
console.log(JSON.stringify({
  continue: true,
  decision: 'approve',
  // To block: change decision to 'block' and add a reason field:
  // reason: 'Tests have not been run yet — please run tests before stopping.',
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

