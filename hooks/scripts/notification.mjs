/**
 * Notification hook — fires when Claude Code sends a notification to the user.
 * Use this to forward notifications to external systems (Slack, email, webhook, etc.).
 *
 * Input (stdin): { message, session_id, ... }
 * Output (stdout): JSON (notification already sent; output is informational only)
 */

import { log } from '../logger.mjs';

const input = await readStdin();

log('Notification', { session_id: input.session_id, message: input.message?.slice(0, 80) });

// Notification hooks are informational — Claude has already sent the notification.
// Use this to forward to external channels or log for observability.
console.log(JSON.stringify({ continue: true }));

// ─── helpers ────────────────────────────────────────────────────────────────

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  try { return raw ? JSON.parse(raw) : {}; } catch { return { raw }; }
}

