import { adminProcedure, router } from "./_core/trpc";
import { db } from "./db";
import { media } from "../drizzle/schema";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { eq, desc } from "drizzle-orm";

export const mediaRouter = router({
    list: adminProcedure.query(async () => {
        return db
            .select()
            .from(media)
            .orderBy(desc(media.createdAt));
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
            const result = await db
                .insert(media)
                .values({
                    url,
                    type: input.fileType,
                    width: input.width,
                    height: input.height,
                })
                .returning();
            return result[0];
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
            const result = await db
                .insert(media)
                .values({
                    url: input.url,
                    type: input.type,
                })
                .returning();
            return result[0];
        }),

    delete: adminProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            const item = await db
                .select()
                .from(media)
                .where(eq(media.id, input))
                .get();
            if (!item) return;

            // Delete from disk if it starts with /uploads
            if (item.url.startsWith("/uploads/")) {
                const fileName = item.url.replace("/uploads/", "");
                const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
                const filePath = path.join(uploadDir, fileName);
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Failed to delete local file:", err);
                }
            }

            const result = await db
                .delete(media)
                .where(eq(media.id, input))
                .returning();
            return result[0];
        }),
});

