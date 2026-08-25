import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as db from "../server/db";
import { getSessionCookieOptions } from "../server/_core/cookies";
import { ENV } from "../server/_core/env";
import jwt from "jsonwebtoken";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST' && req.url === '/api/login') {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const adminUsername = ENV.adminUsername;
    const adminPassword = ENV.adminPassword;

    if (!adminPassword || !adminUsername) {
      console.error("[Login] Admin credentials are not fully set in .env.");
      return res.status(500).json({ error: "Server configuration error" });
    }

    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    try {
      const openId = process.env.OWNER_OPEN_ID;
      if (!openId) {
         console.error("[Login] OWNER_OPEN_ID environment variable is not set.");
         return res.status(500).json({ error: "Server configuration error" });
      }

      await db.upsertUser({
        openId: openId,
        name: "Admin",
        email: null,
        loginMethod: "password",
        lastSignedIn: new Date(),
      });

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not configured");

      const jwtToken = jwt.sign(
        { id: openId, name: "Admin", role: "admin" },
        secret,
        { 
          expiresIn: (process.env.JWT_EXPIRY || "1d") as jwt.SignOptions["expiresIn"],
          algorithm: "HS256"
        }
      );

      const cookieOptions = getSessionCookieOptions(req);
      const isSecure = cookieOptions.secure ? 'Secure;' : '';
      const sameSite = cookieOptions.sameSite ? `SameSite=${cookieOptions.sameSite};` : '';
      
      res.setHeader('Set-Cookie', `auth_token=${jwtToken}; Path=/; Max-Age=86400; HttpOnly; ${isSecure} ${sameSite}`);
      return res.status(200).json({ success: true, token: jwtToken });
    } catch (error) {
      console.error("[Login] Login failed", error);
      return res.status(500).json({ error: "Login process failed" });
    }
  }

  return res.status(404).json({ error: "Not found" });
}
