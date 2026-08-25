import type { IncomingMessage } from "http";

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
): { httpOnly: boolean; path: string; sameSite: "none" | "lax" | "strict"; secure: boolean } {
  const isSecure = isSecureRequest(req);
  return {
    httpOnly: true,
    path: "/",
    sameSite: isSecure ? "none" : "lax",
    secure: isSecure,
  };
}
