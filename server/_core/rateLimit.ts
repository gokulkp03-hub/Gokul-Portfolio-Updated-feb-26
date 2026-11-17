import type { IncomingMessage } from "http";
import type { client as dbClient } from "../db.js";

type Client = typeof dbClient;

/**
 * Fixed-window counters stored in the database. Serverless instances don't
 * share memory, so in-memory counters wouldn't limit anything.
 */

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
      .catch((err: unknown) => {
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

/** Number of hits recorded for `key` in its current window. */
export async function countHits(client: Client, key: string, windowMs: number, now = Date.now()): Promise<number> {
  await ensureTable(client);
  const rs = await client.execute({
    sql: "SELECT failures, window_start FROM login_attempts WHERE key = ?",
    args: [key],
  });
  const row = rs.rows[0];
  if (!row) return 0;
  if (now - Number(row.window_start) >= windowMs) return 0;
  return Number(row.failures);
}

/** Records one hit for `key`, starting a new window if the old one expired. */
export async function recordHit(client: Client, key: string, windowMs: number, now = Date.now()) {
  await ensureTable(client);
  await client.execute({
    sql: `INSERT INTO login_attempts (key, failures, window_start) VALUES (?, 1, ?)
          ON CONFLICT(key) DO UPDATE SET
            failures = CASE WHEN ? - window_start >= ? THEN 1 ELSE failures + 1 END,
            window_start = CASE WHEN ? - window_start >= ? THEN ? ELSE window_start END`,
    args: [key, now, now, windowMs, now, windowMs, now],
  });
}

export async function clearHits(client: Client, key: string) {
  await ensureTable(client);
  await client.execute({ sql: "DELETE FROM login_attempts WHERE key = ?", args: [key] });
}
