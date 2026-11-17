import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as db from "../server/db.js";
import { serializeSessionCookie, SESSION_MAX_AGE_SECONDS } from "../server/_core/cookies.js";
import { ENV } from "../server/_core/env.js";
import { safeEqual, verifyPasswordHash } from "../server/_core/password.js";
import {
  checkLoginAllowed,
  clearLoginFailures,
  getClientIp,
  recordLoginFailure,
} from "../server/_core/loginRateLimit.js";
import jwt from "jsonwebtoken";

function credentialsMatch(username: string, password: string): boolean {
  // Always evaluate both checks so timing doesn't reveal which one failed.
  const userOk = safeEqual(username, ENV.adminUsername);
  const passOk = ENV.adminPasswordHash
    ? verifyPasswordHash(password, ENV.adminPasswordHash)
    : safeEqual(password, ENV.adminPassword);
  return userOk && passOk;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' || req.url?.split("?")[0] !== '/api/login') {
    return res.status(404).json({ error: "Not found" });
  }

  const { username, password } = req.body || {};

  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  if (!ENV.adminUsername || (!ENV.adminPasswordHash && !ENV.adminPassword)) {
    console.error("[Login] ADMIN_USERNAME and ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD) must be set. Login is disabled.");
    return res.status(503).json({ error: "Admin login is not configured" });
  }

  const secret = process.env.JWT_SECRET;
  const openId = process.env.OWNER_OPEN_ID;
  if (!secret || !openId) {
    console.error("[Login] JWT_SECRET and OWNER_OPEN_ID must be set. Login is disabled.");
    return res.status(503).json({ error: "Admin login is not configured" });
  }

  const ip = getClientIp(req);

  try {
    const retryAfter = await checkLoginAllowed(db.client, ip);
    if (retryAfter > 0) {
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ error: "Too many failed attempts. Try again in 15 minutes." });
    }

    if (!credentialsMatch(username, password)) {
      await recordLoginFailure(db.client, ip);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await clearLoginFailures(db.client, ip);

    await db.upsertUser({
      openId,
      name: "Admin",
      email: null,
      loginMethod: "password",
      lastSignedIn: new Date(),
    });

    const jwtToken = jwt.sign(
      { id: openId, name: "Admin", role: "admin" },
      secret,
      { expiresIn: SESSION_MAX_AGE_SECONDS, algorithm: "HS256" }
    );

    res.setHeader('Set-Cookie', serializeSessionCookie(req, jwtToken));
    res.setHeader('Cache-Control', 'no-store');
    // The token lives only in the HttpOnly cookie; it is deliberately not returned to JS.
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Login] Login failed", error);
    return res.status(500).json({ error: "Login process failed" });
  }
}
