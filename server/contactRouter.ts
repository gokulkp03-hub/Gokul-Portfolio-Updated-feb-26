import { TRPCError } from "@trpc/server";
import { publicProcedure, adminProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import { db, client } from "./db.js";
import { contactSubmissions } from "../drizzle/schema.js";
import { desc } from "drizzle-orm";
import { notifyNewLead } from "./_core/notification.js";
import { countHits, getClientIp, recordHit } from "./_core/rateLimit.js";

/** Max contact submissions per IP per window. Real enquiries rarely exceed one or two. */
export const CONTACT_MAX_PER_IP = 5;
export const CONTACT_WINDOW_MS = 60 * 60 * 1000;
/** Global ceiling to stop a distributed flood from filling the database. */
export const CONTACT_MAX_GLOBAL = 100;

export const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().trim().min(2, "Name must be at least 2 characters").max(150),
      email: z.string().trim().email("Please provide a valid email address").max(200),
      service: z.string().trim().min(2).max(100),
      details: z.string().trim().max(3000).optional().default(""),
      websiteHoneypot: z.string().optional(), // Bot trap
      clientTimestamp: z.number().optional(), // Time-to-submit guard (client-supplied; a weak signal only)
    }))
    .mutation(async ({ input, ctx }) => {
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

      // Anti-spam check 3: server-side rate limit (can't be bypassed from the browser)
      const ipKey = `contact:${getClientIp(ctx.req)}`;
      const [ipHits, globalHits] = await Promise.all([
        countHits(client, ipKey, CONTACT_WINDOW_MS),
        countHits(client, "contact:__global__", CONTACT_WINDOW_MS),
      ]);
      if (ipHits >= CONTACT_MAX_PER_IP || globalHits >= CONTACT_MAX_GLOBAL) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many enquiries in a short time. Please try again later or reach out on WhatsApp.",
        });
      }
      await Promise.all([
        recordHit(client, ipKey, CONTACT_WINDOW_MS),
        recordHit(client, "contact:__global__", CONTACT_WINDOW_MS),
      ]);

      // Save to database
      await db.insert(contactSubmissions).values({
        name: input.name,
        email: input.email.toLowerCase(),
        service: input.service,
        details: input.details || "",
      });

      // Notify the owner (never throws; the lead is already saved)
      await notifyNewLead({
        name: input.name,
        email: input.email,
        service: input.service,
        details: input.details || "",
      });

      return { success: true, message: "Inquiry received" };
    }),
  list: adminProcedure
    .input(z.object({ limit: z.number().int().min(1).max(1000).default(500) }).optional())
    .query(async ({ input }) => {
      return db
        .select()
        .from(contactSubmissions)
        .orderBy(desc(contactSubmissions.createdAt))
        .limit(input?.limit ?? 500);
    }),
});
