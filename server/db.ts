import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../drizzle/schema";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const url = process.env.DATABASE_URL || "file:./dev.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });

export async function getDb() {
  return db;
}

export async function upsertUser(user: {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role?: string;
  lastSignedIn?: Date;
}): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  try {
    const data = {
      openId: user.openId,
      name: user.name || null,
      email: user.email || null,
      loginMethod: user.loginMethod || null,
      role: user.role || "user",
      lastSignedIn: user.lastSignedIn || new Date(),
    };

    // Check if user exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.openId, user.openId))
      .get();

    if (existing) {
      await db
        .update(users)
        .set(data)
        .where(eq(users.openId, user.openId));
    } else {
      await db.insert(users).values(data);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  return db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .get() || null;
}
