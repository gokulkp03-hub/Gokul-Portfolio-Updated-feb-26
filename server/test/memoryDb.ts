import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../../drizzle/schema";

/**
 * In-memory SQLite database with the current schema, for tests.
 * Use with `vi.mock("./db", () => createMemoryDbModule())` so tests never
 * touch whatever DATABASE_URL points at (which may be production).
 */
export async function createMemoryDbModule() {
  const client = createClient({ url: ":memory:" });
  const api = await import("drizzle-kit/api");
  const statements = await api.generateSQLiteMigration(
    await api.generateSQLiteDrizzleJson({}),
    await api.generateSQLiteDrizzleJson(schema as Record<string, unknown>)
  );
  for (const statement of statements) {
    await client.execute(statement);
  }
  const db = drizzle(client, { schema });
  return {
    client,
    db,
    getDb: async () => db,
    upsertUser: async () => {},
    getUserByOpenId: async () => null,
  };
}
