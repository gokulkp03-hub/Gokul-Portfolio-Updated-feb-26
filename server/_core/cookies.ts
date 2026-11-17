import type { IncomingMessage } from "http";
import { parse, serialize } from "cookie";
import { COOKIE_NAME } from "../../shared/const.js";

/** Admin sessions last one day; the JWT expiry and cookie Max-Age both use this. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

function isSecureRequest(req: IncomingMessage) {
  // Try to determine if secure based on forwarded headers in Vercel/Node
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: IncomingMessage
): { httpOnly: boolean; path: string; sameSite: "lax"; secure: boolean } {
  // The admin UI and API share one origin, so the cookie never needs to be
  // sent on cross-site requests. Lax keeps it off cross-site POSTs (CSRF).
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: isSecureRequest(req),
  };
}

/** Set-Cookie value that stores a new session token. */
export function serializeSessionCookie(req: IncomingMessage, token: string): string {
  return serialize(COOKIE_NAME, token, {
    ...getSessionCookieOptions(req),
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/** Set-Cookie value that removes the session cookie. Attributes must match the one that set it. */
export function serializeClearedSessionCookie(req: IncomingMessage): string {
  return serialize(COOKIE_NAME, "", {
    ...getSessionCookieOptions(req),
    maxAge: 0,
    expires: new Date(0),
  });
}

/** Reads the session token from the Cookie header (exact name match). */
export function readSessionToken(req: IncomingMessage): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  return parse(header)[COOKIE_NAME] || null;
}
