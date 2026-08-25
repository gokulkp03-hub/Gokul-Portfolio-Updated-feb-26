import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { blogs } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";

export const blogRouter = router({
  list: publicProcedure
    .input(
      z.object({
        includeUnpublished: z.boolean().optional(),
      }).optional()
    )
    .query(async ({ input, ctx }) => {
      // If not an admin, we can only fetch published blogs
      const isAdmin = !!ctx.user;
      
      const query = db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.createdAt));
        
      const results = await query;
      
      if (!isAdmin || !input?.includeUnpublished) {
        return results.filter(b => b.published);
      }
      return results;
    }),

  getBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, input))
        .get();
        
      if (result) {
        // Increment views in background
        db.update(blogs)
          .set({ views: (result.views || 0) + 1 })
          .where(eq(blogs.id, result.id))
          .run();
      }
        
      return result;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        thumbnail: z.string().optional(),
        published: z.boolean().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        publishDate: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(blogs).values({
        ...input,
        publishDate: input.publishDate || new Date(),
      }).returning().get();
      return result;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        slug: z.string().optional(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        thumbnail: z.string().optional(),
        published: z.boolean().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        publishDate: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const result = await db
        .update(blogs)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(blogs.id, id))
        .returning()
        .get();
      return result;
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await db.delete(blogs).where(eq(blogs.id, input)).run();
      return { success: true };
    }),
});
