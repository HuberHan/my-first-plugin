/**
 * SubagentStop hook — fires when a subagent (child agent) considers stopping.
 * Use this to validate that the subagent completed its delegated task.
 *
 * Input (stdin): { session_id, transcript, ... }
 * Output (stdout): JSON with decision "approve" or "block"
 */

import { log } from '../logger.mjs';

const input = await readStdin();

log('SubagentStop', { session_id: input.session_id });

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

