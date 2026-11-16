import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", async () => (await import("./test/memoryDb")).createMemoryDbModule());

import * as db from "./db";
import { hashPassword, verifyPasswordHash } from "./_core/password";
import { MAX_FAILURES_PER_IP } from "./_core/loginRateLimit";

type MockRes = {
  statusCode: number;
  body: any;
  headers: Record<string, string>;
  status(code: number): MockRes;
  json(body: unknown): MockRes;
  setHeader(name: string, value: string): void;
};

function mockRes(): MockRes {
  return {
    statusCode: 0,
    body: undefined,
    headers: {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
  };
}

let ipCounter = 0;
function mockReq(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return {
    method: "POST",
    url: "/api/login",
    body,
    headers: { "x-forwarded-proto": "https", "x-real-ip": ip },
  };
}

const ENV_KEYS = ["ADMIN_USERNAME", "ADMIN_PASSWORD", "ADMIN_PASSWORD_HASH", "JWT_SECRET", "OWNER_OPEN_ID"];
let savedEnv: Record<string, string | undefined>;

async function loadHandler() {
  // env.ts reads process.env at import time, so re-import after changing it.
  vi.resetModules();
  vi.doMock("../server/db", () => db);
  return (await import("../api/login")).default as (req: any, res: any) => Promise<unknown>;
}

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map(k => [k, process.env[k]]));
  for (const k of ENV_KEYS) delete process.env[k];
  process.env.JWT_SECRET = "test-secret";
  process.env.OWNER_OPEN_ID = "owner";
});

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
});

describe("password hashing", () => {
  it("verifies the right password and rejects others", () => {
    const stored = hashPassword("a long admin password");
    expect(stored.startsWith("scrypt$")).toBe(true);
    expect(verifyPasswordHash("a long admin password", stored)).toBe(true);
    expect(verifyPasswordHash("wrong", stored)).toBe(false);
    expect(verifyPasswordHash("anything", "not-a-hash")).toBe(false);
  });
});

describe("/api/login", () => {
  it("refuses admin/admin when no credentials are configured", async () => {
    const handler = await loadHandler();
    const res = mockRes();
    await handler(mockReq({ username: "admin", password: "admin" }), res);
    expect(res.statusCode).toBe(503);
    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  it("logs in with a hashed password and does not expose the token", async () => {
    process.env.ADMIN_USERNAME = "gokul";
    process.env.ADMIN_PASSWORD_HASH = hashPassword("a long admin password");
    const handler = await loadHandler();
    const res = mockRes();
    await handler(mockReq({ username: "gokul", password: "a long admin password" }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
    expect(res.headers["set-cookie"]).toMatch(/^auth_token=[^;]+; Max-Age=86400;/);
  });

  it("ignores ADMIN_PASSWORD when a hash is set", async () => {
    process.env.ADMIN_USERNAME = "gokul";
    process.env.ADMIN_PASSWORD = "legacy-password";
    process.env.ADMIN_PASSWORD_HASH = hashPassword("a long admin password");
    const handler = await loadHandler();
    const res = mockRes();
    await handler(mockReq({ username: "gokul", password: "legacy-password" }), res);
    expect(res.statusCode).toBe(401);
  });

  it("blocks an IP after repeated failures, even with the right password", async () => {
    process.env.ADMIN_USERNAME = "gokul";
    process.env.ADMIN_PASSWORD = "a long admin password";
    const handler = await loadHandler();
    const ip = "203.0.113.7";

    for (let i = 0; i < MAX_FAILURES_PER_IP; i++) {
      const res = mockRes();
      await handler(mockReq({ username: "gokul", password: `guess-${i}` }, ip), res);
      expect(res.statusCode).toBe(401);
    }

    const blocked = mockRes();
    await handler(mockReq({ username: "gokul", password: "a long admin password" }, ip), blocked);
    expect(blocked.statusCode).toBe(429);
    expect(blocked.headers["retry-after"]).toBeDefined();

    // Other IPs are unaffected.
    const other = mockRes();
    await handler(mockReq({ username: "gokul", password: "a long admin password" }, "198.51.100.9"), other);
    expect(other.statusCode).toBe(200);
  });
});
