import { describe, expect, it } from "vitest";
import { parse } from "cookie";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import { readSessionToken, serializeSessionCookie } from "./_core/cookies";
import type { TrpcContext } from "./_core/context";

function createContext() {
  const headers: Record<string, string> = {};
  const req = { headers: { "x-forwarded-proto": "https" } } as unknown as TrpcContext["req"];
  const res = {
    setHeader: (name: string, value: string) => {
      headers[name.toLowerCase()] = value;
    },
  } as unknown as TrpcContext["res"];
  const ctx: TrpcContext = {
    user: { id: 1, openId: "owner", name: "Admin", email: null, loginMethod: "password", role: "admin", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req,
    res,
  };
  return { ctx, headers };
}

describe("session cookie", () => {
  it("login cookie is the one the auth context reads", () => {
    const req = { headers: { "x-forwarded-proto": "https" } } as unknown as TrpcContext["req"];
    const setCookie = serializeSessionCookie(req, "jwt-value");
    expect(setCookie.startsWith(`${COOKIE_NAME}=jwt-value`)).toBe(true);
    expect(setCookie).toMatch(/HttpOnly/);
    expect(setCookie).toMatch(/Secure/);
    expect(setCookie).toMatch(/SameSite=Lax/);

    const reqWithCookie = { headers: { cookie: `other=1; ${COOKIE_NAME}=jwt-value` } } as unknown as TrpcContext["req"];
    expect(readSessionToken(reqWithCookie)).toBe("jwt-value");
  });

  it("does not read a cookie whose name merely ends with the session cookie name", () => {
    const req = { headers: { cookie: `x${COOKIE_NAME}=evil` } } as unknown as TrpcContext["req"];
    expect(readSessionToken(req)).toBeNull();
  });
});

describe("auth.logout", () => {
  it("expires the same cookie that login sets", async () => {
    const { ctx, headers } = createContext();
    const result = await appRouter.createCaller(ctx).auth.logout();

    expect(result).toEqual({ success: true });
    const setCookie = headers["set-cookie"];
    expect(setCookie).toBeDefined();
    expect(COOKIE_NAME).toBe("auth_token");
    expect(setCookie.startsWith(`${COOKIE_NAME}=;`)).toBe(true);
    expect(setCookie).toMatch(/Max-Age=0/);
    expect(setCookie).toMatch(/Path=\//);
    expect(setCookie).toMatch(/HttpOnly/);
    expect(parse(setCookie)[COOKIE_NAME]).toBe("");
  });
});
