import { z } from "zod";
import { adminProcedure, isAdminUser, publicProcedure, router } from "./_core/trpc";
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
      // Unpublished posts are only ever returned to admins who ask for them.
      if (isAdminUser(ctx) && input?.includeUnpublished) {
        return db.select().from(blogs).orderBy(desc(blogs.createdAt));
      }
      return db
        .select()
        .from(blogs)
        .where(eq(blogs.published, true))
        .orderBy(desc(blogs.createdAt));
    }),

  getBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const result = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, input))
        .get();

      // Drafts are invisible to the public: respond exactly as if the slug didn't exist.
      if (!result || (!result.published && !isAdminUser(ctx))) {
        return null;
      }

      if (result.published) {
        // Increment views in background
        db.update(blogs)
          .set({ views: (result.views || 0) + 1 })
          .where(eq(blogs.id, result.id))
          .run();
      }

      return result;
    }),

  create: adminProcedure
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

  update: adminProcedure
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

  delete: adminProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await db.delete(blogs).where(eq(blogs.id, input)).run();
      return { success: true };
    }),
});
