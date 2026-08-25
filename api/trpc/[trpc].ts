import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { appRouter } from '../../server/routers';
import { createContext } from '../../server/_core/context';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const path = (req.query.trpc as string) || "";
  
  return nodeHTTPRequestHandler({
    req,
    res,
    path,
    router: appRouter,
    createContext,
  });
}
