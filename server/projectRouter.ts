import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { db } from "./db";
import { projects } from "../drizzle/schema";
import { z } from "zod";
import { eq, asc, desc } from "drizzle-orm";

export const projectRouter = router({
    list: publicProcedure.query(async () => {
        return db
            .select()
            .from(projects)
            .where(eq(projects.status, "published"))
            .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
    }),

    adminList: adminProcedure.query(async () => {
        return db
            .select()
            .from(projects)
            .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
    }),

    getById: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return db
                .select()
                .from(projects)
                .where(eq(projects.id, input))
                .get() || null;
        }),

    getBySlug: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return db
                .select()
                .from(projects)
                .where(eq(projects.slug, input))
                .get() || null;
        }),

    create: adminProcedure
        .input(
            z.object({
                title: z.string(),
                slug: z.string(),
                category: z.string(),
                description: z.string().optional(),
                thumbnail: z.string(),
                tags: z.array(z.string()).optional(),
                gallery: z.array(z.string()).optional(),
                client: z.string().optional(),
                year: z.number().optional(),
                videoUrl: z.string().optional(),
                videoType: z.string().optional(),
                directVideoUrl: z.string().optional(),
                summary: z.string().optional(),
                problem: z.string().optional(),
                solution: z.string().optional(),
                results: z.array(z.string()).optional(),
                tools: z.array(z.string()).optional(),
                status: z.preprocess((val) => typeof val === "string" ? val.toLowerCase().trim() : val, z.enum(["draft", "published", "scheduled"])).default("draft"),
                featured: z.boolean().default(false),
                sortOrder: z.number().default(0),
                publishDate: z.date().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const data = {
                ...input,
                tags: JSON.stringify(input.tags || []),
                gallery: JSON.stringify(input.gallery || []),
                results: JSON.stringify(input.results || []),
                tools: JSON.stringify(input.tools || []),
                credits: JSON.stringify([]),
            };
            const result = await db.insert(projects).values(data).returning();
            return result[0];
        }),

    update: adminProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().optional(),
                slug: z.string().optional(),
                category: z.string().optional(),
                description: z.string().optional(),
                thumbnail: z.string().optional(),
                tags: z.array(z.string()).optional(),
                gallery: z.array(z.string()).optional(),
                client: z.string().optional(),
                year: z.number().optional(),
                videoUrl: z.string().optional(),
                videoType: z.string().optional(),
                directVideoUrl: z.string().optional(),
                summary: z.string().optional(),
                problem: z.string().optional(),
                solution: z.string().optional(),
                results: z.array(z.string()).optional(),
                tools: z.array(z.string()).optional(),
                status: z.preprocess((val) => typeof val === "string" ? val.toLowerCase().trim() : val, z.enum(["draft", "published", "scheduled"])).optional(),
                featured: z.boolean().optional(),
                sortOrder: z.number().optional(),
                publishDate: z.date().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            const updateData: any = { ...data };
            if (data.tags) updateData.tags = JSON.stringify(data.tags);
            if (data.gallery) updateData.gallery = JSON.stringify(data.gallery);
            if (data.results) updateData.results = JSON.stringify(data.results);
            if (data.tools) updateData.tools = JSON.stringify(data.tools);

            const result = await db
                .update(projects)
                .set(updateData)
                .where(eq(projects.id, id))
                .returning();
            return result[0];
        }),

    delete: adminProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            const result = await db
                .delete(projects)
                .where(eq(projects.id, input))
                .returning();
            return result[0];
        }),
});
