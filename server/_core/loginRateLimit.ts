import type { IncomingMessage } from "http";
import type { Client } from "@libsql/client";

/**
 * Database-backed limiter for failed admin logins. It lives in the database,
 * not in memory, because serverless instances don't share memory.
 *
 * - Per IP: MAX_FAILURES_PER_IP failed attempts per WINDOW_MS, then blocked until the window passes.
 * - Global: MAX_FAILURES_GLOBAL failed attempts per WINDOW_MS across all IPs, to slow distributed guessing.
 */
export const WINDOW_MS = 15 * 60 * 1000;
export const MAX_FAILURES_PER_IP = 5;
export const MAX_FAILURES_GLOBAL = 50;
const GLOBAL_KEY = "__global__";

let tableReady: Promise<unknown> | null = null;

function ensureTable(client: Client) {
  if (!tableReady) {
    tableReady = client
      .execute(
        `CREATE TABLE IF NOT EXISTS login_attempts (
          key TEXT PRIMARY KEY,
          failures INTEGER NOT NULL,
          window_start INTEGER NOT NULL
        )`
      )
      .catch(err => {
        tableReady = null; // retry on the next request
        throw err;
      });
  }
  return tableReady;
}

export function getClientIp(req: IncomingMessage): string {
  // Vercel sets x-real-ip and overwrites x-forwarded-for, so clients can't spoof them.
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp) return realIp;
  const fwd = req.headers["x-forwarded-for"];
  const first = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(",")[0]?.trim();
  return first || req.socket?.remoteAddress || "unknown";
}

async function currentFailures(client: Client, key: string, now: number): Promise<number> {
  const rs = await client.execute({
    sql: "SELECT failures, window_start FROM login_attempts WHERE key = ?",
    args: [key],
  });
  const row = rs.rows[0];
  if (!row) return 0;
  if (now - Number(row.window_start) >= WINDOW_MS) return 0;
  return Number(row.failures);
}

/** Returns seconds until retry is allowed, or 0 if the attempt may proceed. */
export async function checkLoginAllowed(client: Client, ip: string, now = Date.now()): Promise<number> {
  await ensureTable(client);
  const [ipFailures, globalFailures] = await Promise.all([
    currentFailures(client, `ip:${ip}`, now),
    currentFailures(client, GLOBAL_KEY, now),
  ]);
  if (ipFailures >= MAX_FAILURES_PER_IP || globalFailures >= MAX_FAILURES_GLOBAL) {
    return Math.ceil(WINDOW_MS / 1000);
  }
  return 0;
}

async function bump(client: Client, key: string, now: number) {
  // Start a new window if the old one expired, otherwise increment.
  await client.execute({
    sql: `INSERT INTO login_attempts (key, failures, window_start) VALUES (?, 1, ?)
          ON CONFLICT(key) DO UPDATE SET
            failures = CASE WHEN ? - window_start >= ? THEN 1 ELSE failures + 1 END,
            window_start = CASE WHEN ? - window_start >= ? THEN ? ELSE window_start END`,
    args: [key, now, now, WINDOW_MS, now, WINDOW_MS, now],
  });
}

export async function recordLoginFailure(client: Client, ip: string, now = Date.now()) {
  await ensureTable(client);
  await Promise.all([bump(client, `ip:${ip}`, now), bump(client, GLOBAL_KEY, now)]);
}

export async function clearLoginFailures(client: Client, ip: string) {
  await ensureTable(client);
  await client.execute({ sql: "DELETE FROM login_attempts WHERE key = ?", args: [`ip:${ip}`] });
}
