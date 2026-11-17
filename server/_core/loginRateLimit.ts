import type { Client } from "@libsql/client";
import { clearHits, countHits, recordHit } from "./rateLimit";

export { getClientIp } from "./rateLimit";

/**
 * Limits failed admin logins.
 * - Per IP: MAX_FAILURES_PER_IP failed attempts per WINDOW_MS, then blocked until the window passes.
 * - Global: MAX_FAILURES_GLOBAL failed attempts per WINDOW_MS across all IPs, to slow distributed guessing.
 */
export const WINDOW_MS = 15 * 60 * 1000;
export const MAX_FAILURES_PER_IP = 5;
export const MAX_FAILURES_GLOBAL = 50;
const GLOBAL_KEY = "__global__";

/** Returns seconds until retry is allowed, or 0 if the attempt may proceed. */
export async function checkLoginAllowed(client: Client, ip: string, now = Date.now()): Promise<number> {
  const [ipFailures, globalFailures] = await Promise.all([
    countHits(client, `ip:${ip}`, WINDOW_MS, now),
    countHits(client, GLOBAL_KEY, WINDOW_MS, now),
  ]);
  if (ipFailures >= MAX_FAILURES_PER_IP || globalFailures >= MAX_FAILURES_GLOBAL) {
    return Math.ceil(WINDOW_MS / 1000);
  }
  return 0;
}

export async function recordLoginFailure(client: Client, ip: string, now = Date.now()) {
  await Promise.all([
    recordHit(client, `ip:${ip}`, WINDOW_MS, now),
    recordHit(client, GLOBAL_KEY, WINDOW_MS, now),
  ]);
}

export async function clearLoginFailures(client: Client, ip: string) {
  await clearHits(client, `ip:${ip}`);
}
