import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { prisma } from "./prisma-db";
import { z } from "zod";

export const projectRouter = router({
    list: publicProcedure.query(async () => {
        return prisma.project.findMany({
            where: { status: "published" },
            orderBy: [
                { sortOrder: 'asc' },
                { createdAt: 'desc' },
            ]
        });
    }),

    adminList: adminProcedure.query(async () => {
        return prisma.project.findMany({
            orderBy: [
                { sortOrder: 'asc' },
                { createdAt: 'desc' },
            ]
        });
    }),

    getById: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return prisma.project.findUnique({
                where: { id: input },
            });
        }),

    getBySlug: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return prisma.project.findUnique({
                where: { slug: input },
            });
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
                status: z.enum(["draft", "published", "scheduled"]).default("draft"),
                featured: z.boolean().default(false),
                sortOrder: z.number().default(0),
                publishDate: z.date().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.project.create({
                data: {
                    ...input,
                    tags: input.tags || [],
                    gallery: input.gallery || [],
                    results: input.results || [],
                    tools: input.tools || [],
                },
            });
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
                status: z.enum(["draft", "published", "scheduled"]).optional(),
                featured: z.boolean().optional(),
                sortOrder: z.number().optional(),
                publishDate: z.date().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return prisma.project.update({
                where: { id },
                data,
            });
        }),

    delete: adminProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            return prisma.project.delete({
                where: { id: input },
            });
        }),
});
