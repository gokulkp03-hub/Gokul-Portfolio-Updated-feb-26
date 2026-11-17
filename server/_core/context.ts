import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { readSessionToken } from "./cookies.js";
import type { User } from "../../drizzle/schema.js";

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
  let token: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else {
    token = readSessionToken(req);
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
