import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { projectRouter } from "./projectRouter";
import { contentRouter } from "./contentRouter";
import { mediaRouter } from "./mediaRouter";
import { contactRouter } from "./contactRouter";
import { blogRouter } from "./blogRouter";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      if (ctx.res) {
        if (typeof (ctx.res as any).clearCookie === 'function') {
          (ctx.res as any).clearCookie(COOKIE_NAME, {
            ...cookieOptions,
            maxAge: -1,
          });
        } else if (typeof ctx.res.setHeader === 'function') {
          const isSecure = cookieOptions.secure ? 'Secure;' : '';
          const sameSite = cookieOptions.sameSite ? `SameSite=${cookieOptions.sameSite};` : '';
          ctx.res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${isSecure} ${sameSite}`);
        }
      }
      return {
        success: true,
      } as const;
    }),
  }),

  projects: projectRouter,
  content: contentRouter,
  media: mediaRouter,
  contact: contactRouter,
  blogs: blogRouter,
});

export type AppRouter = typeof appRouter;
