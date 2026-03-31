import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { prisma } from "./prisma-db";

export const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      service: z.string(),
      details: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Save to DB so nothing is ever lost
      return await prisma.contactSubmission.create({ data: input });
    }),
  list: adminProcedure.query(async () => {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
