import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { prisma } from "./prisma-db";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const mediaRouter = router({
    list: adminProcedure.query(async () => {
        return prisma.media.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),

    upload: adminProcedure
        .input(
            z.object({
                fileName: z.string(),
                fileType: z.string(),
                base64Data: z.string(), // Raw base64 data
                width: z.number().optional(),
                height: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const buffer = Buffer.from(input.base64Data, "base64");
            
            // Determine file extension
            const extMatch = input.fileName.match(/\.[0-9a-z]+$/i);
            const ext = extMatch ? extMatch[0] : (input.fileType.startsWith('video') ? '.mp4' : '.png');
            
            // Use unique filename
            const uniqueName = crypto.randomUUID() + ext;
            const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");

            // Ensure directory exists
            await fs.mkdir(uploadDir, { recursive: true });

            // Write File
            const filePath = path.join(uploadDir, uniqueName);
            await fs.writeFile(filePath, buffer);

            const url = `/uploads/${uniqueName}`;

            // Save metadata in database
            return prisma.media.create({
                data: {
                    url,
                    type: input.fileType,
                    width: input.width,
                    height: input.height,
                },
            });
        }),

    addExternal: adminProcedure
        .input(
            z.object({
                url: z.string(),
                type: z.string(), // e.g., 'video/embed'
                title: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.media.create({
                data: {
                    url: input.url,
                    type: input.type,
                },
            });
        }),

    delete: adminProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            const media = await prisma.media.findUnique({ where: { id: input } });
            if (!media) return;

            // Delete from disk if it starts with /uploads
            if (media.url.startsWith("/uploads/")) {
                const fileName = media.url.replace("/uploads/", "");
                const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
                const filePath = path.join(uploadDir, fileName);
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Failed to delete local file:", err);
                }
            }

            return prisma.media.delete({
                where: { id: input },
            });
        }),
});
