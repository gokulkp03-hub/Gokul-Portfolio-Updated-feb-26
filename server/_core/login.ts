import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { ENV } from "./env";

export function registerLoginRoutes(app: Express) {
  app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const adminUsername = ENV.adminUsername;
    const adminPassword = ENV.adminPassword;

    if (!adminPassword || !adminUsername) {
      console.error("[Login] Admin credentials are not fully set in .env.");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    if (username !== adminUsername || password !== adminPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    try {
      const openId = process.env.OWNER_OPEN_ID;
      if (!openId) {
         console.error("[Login] OWNER_OPEN_ID environment variable is not set.");
         res.status(500).json({ error: "Server configuration error" });
         return;
      }

      await db.upsertUser({
        openId: openId,
        name: "Admin",
        email: null,
        loginMethod: "password",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, {
        name: "Admin",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("[Login] Login failed", error);
      res.status(500).json({ error: "Login process failed" });
    }
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.status(200).json({ success: true });
  });
}
