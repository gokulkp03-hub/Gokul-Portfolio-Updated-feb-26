import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import type { User } from "../../drizzle/schema";

export type TrpcContext = {
  req: IncomingMessage;
  res: ServerResponse;
  user: User | null;
};

export async function createContext(
  opts: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>
): Promise<TrpcContext> {
  let user = null;
  const req = opts.req;
  
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie || "";
  let token = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (cookieHeader.includes("auth_token=")) {
    token = cookieHeader.split("auth_token=")[1].split(";")[0];
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        user = jwt.verify(token, secret, { algorithms: ["HS256"] }) as any;
      }
    } catch (err) {
      console.error("[Auth] JWT validation failed:", (err as Error).message);
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
