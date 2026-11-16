import { serializeClearedSessionCookie } from "./_core/cookies";
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
      // Expire the same cookie that /api/login sets, with matching attributes.
      ctx.res.setHeader("Set-Cookie", serializeClearedSessionCookie(ctx.req));
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
