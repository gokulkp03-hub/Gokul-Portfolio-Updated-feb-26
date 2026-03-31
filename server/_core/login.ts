import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { ENV } from "./env";
import jwt from "jsonwebtoken";
import { loginIpLimiter, loginIdentifierLimiter } from "./limiters";

export function registerLoginRoutes(app: Express) {
  app.post("/api/login", loginIpLimiter, loginIdentifierLimiter, async (req: Request, res: Response) => {
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
      // Set token inside cookie using a name checked by our middleware
      res.cookie("auth_token", jwtToken, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 }); // 1 day default

      res.status(200).json({ success: true, token: jwtToken });
    } catch (error) {
      console.error("[Login] Login failed", error);
      res.status(500).json({ error: "Login process failed" });
    }
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie("auth_token", cookieOptions);
    res.status(200).json({ success: true });
  });
}
