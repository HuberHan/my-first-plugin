/**
 * SessionEnd hook — fires when a Claude Code session ends.
 * Use this for cleanup, state persistence, or logging session summaries.
 *
 * Input (stdin): { session_id, ... }
 * Output (stdout): JSON (ignored by Claude Code, session is ending)
 */

import { log } from '../logger.mjs';

const input = await readStdin();

log('SessionEnd', { session_id: input.session_id });

console.log(JSON.stringify({ continue: true }));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

