import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { db } from "./db";
import { contactSubmissions } from "../drizzle/schema";
import { desc } from "drizzle-orm";

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
      const result = await db
        .insert(contactSubmissions)
        .values(input)
        .returning();
      return result[0];
    }),
  list: adminProcedure.query(async () => {
    return db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }),
});

