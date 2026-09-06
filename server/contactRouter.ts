import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { db } from "./db";
import { contactSubmissions } from "../drizzle/schema";
import { desc } from "drizzle-orm";

import { notifyOwner } from "./_core/notification";

export const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().trim().min(2, "Name must be at least 2 characters").max(150),
      email: z.string().trim().email("Please provide a valid email address").max(200),
      service: z.string().trim().min(2).max(100),
      details: z.string().trim().max(3000).optional().default(""),
      websiteHoneypot: z.string().optional(), // Bot trap
      clientTimestamp: z.number().optional(), // Time-to-submit guard
    }))
    .mutation(async ({ input }) => {
      // Anti-spam check 1: Honeypot trap
      if (input.websiteHoneypot && input.websiteHoneypot.trim().length > 0) {
        console.warn("[Contact] Honeypot triggered by bot submission");
        return { success: true, message: "Inquiry received" };
      }

      // Anti-spam check 2: Minimum human interaction time guard
      if (input.clientTimestamp) {
        const timeElapsed = Date.now() - input.clientTimestamp;
        if (timeElapsed < 800) {
          console.warn("[Contact] Bot blocked: submitted in under 800ms");
          return { success: true, message: "Inquiry received" };
        }
      }

      // Save to database
      const result = await db
        .insert(contactSubmissions)
        .values({
          name: input.name,
          email: input.email.toLowerCase(),
          service: input.service,
          details: input.details || "",
        })
        .returning();

      // Attempt owner notification (fail-safe)
      try {
        await notifyOwner({
          title: `New Portfolio Lead: ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nService: ${input.service}\nDetails:\n${input.details || "No details provided"}`
        });
      } catch (err) {
        console.info("[Contact] External owner notification skipped/failed (db record saved):", (err as Error).message);
      }

      return {
        success: true,
        data: result[0],
      };
    }),
  list: adminProcedure.query(async () => {
    return db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }),
});

