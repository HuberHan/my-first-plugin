/**
 * SessionStart hook — fires when a Claude Code session begins.
 * Use this to load project context, set environment variables, or run setup tasks.
 *
 * Input (stdin): { session_id, cwd, ... }
 * Output (stdout): JSON with optional systemMessage
 */

import { log } from '../logger.mjs';

const input = await readStdin();

log('SessionStart', { session_id: input.session_id, cwd: input.cwd });

// Output: systemMessage is shown to Claude at session start
console.log(JSON.stringify({
  continue: true,
  systemMessage: `[my-first-plugin] SessionStart — session ${input.session_id ?? 'unknown'} began.`,
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

