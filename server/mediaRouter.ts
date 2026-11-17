import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "./_core/trpc.js";
import { db } from "./db.js";
import { media } from "../drizzle/schema.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { eq, desc } from "drizzle-orm";
import { put, del } from "@vercel/blob";
import { UPLOAD_MAX_BYTES, UPLOAD_MIME_EXTENSIONS } from "../shared/const.js";

const BLOB_HOST_SUFFIX = ".blob.vercel-storage.com";

/** Local dev only: files land in Vite's public dir so `/uploads/...` is served. */
function localUploadDir() {
    return process.env.UPLOADS_DIR || path.join(process.cwd(), "client", "public", "uploads");
}

function isBlobUrl(url: string): boolean {
    try {
        return new URL(url).hostname.endsWith(BLOB_HOST_SUFFIX);
    } catch {
        return false;
    }
}

/** Only https URLs may be stored as external media (no javascript:, data:, http:). */
const httpsUrl = z
    .string()
    .trim()
    .url()
    .refine(value => new URL(value).protocol === "https:", "URL must start with https://");

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
                fileName: z.string().trim().min(1).max(200),
                fileType: z.string().refine(type => type in UPLOAD_MIME_EXTENSIONS, {
                    message: `Unsupported file type. Allowed: ${Object.keys(UPLOAD_MIME_EXTENSIONS).join(", ")}`,
                }),
                // Base64 length is ~4/3 of the file size; reject oversized payloads before decoding.
                base64Data: z.string().max(Math.ceil((UPLOAD_MAX_BYTES * 4) / 3) + 4, "File is larger than 3 MB"),
                width: z.number().int().positive().optional(),
                height: z.number().int().positive().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const buffer = Buffer.from(input.base64Data, "base64");
            if (buffer.length === 0 || buffer.length > UPLOAD_MAX_BYTES) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "File is empty or larger than 3 MB" });
            }

            // The extension comes from the validated MIME type, never from the client's file name.
            const uniqueName = crypto.randomUUID() + UPLOAD_MIME_EXTENSIONS[input.fileType];
            let url: string;

            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const blob = await put(`uploads/${uniqueName}`, buffer, {
                    access: "public",
                    contentType: input.fileType,
                    addRandomSuffix: false,
                });
                url = blob.url;
            } else if (process.env.VERCEL) {
                // The Vercel filesystem is read-only, so local writes would fail or vanish.
                throw new TRPCError({
                    code: "PRECONDITION_FAILED",
                    message: "Uploads need a Vercel Blob store. Create one under Storage and connect it to this project.",
                });
            } else {
                const dir = localUploadDir();
                await fs.mkdir(dir, { recursive: true });
                await fs.writeFile(path.join(dir, uniqueName), buffer);
                url = `/uploads/${uniqueName}`;
            }

            const result = await db
                .insert(media)
                .values({
                    url,
                    type: input.fileType,
                    name: input.fileName,
                    width: input.width,
                    height: input.height,
                })
                .returning();
            return result[0];
        }),

    addExternal: adminProcedure
        .input(
            z.object({
                url: httpsUrl,
                type: z.string().trim().min(1).max(50), // e.g., 'video/embed'
                title: z.string().trim().max(200).optional(),
            })
        )
        .mutation(async ({ input }) => {
            const result = await db
                .insert(media)
                .values({
                    url: input.url,
                    type: input.type,
                    name: input.title || 'Embedded Video',
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

            try {
                if (isBlobUrl(item.url) && process.env.BLOB_READ_WRITE_TOKEN) {
                    await del(item.url);
                } else if (item.url.startsWith("/uploads/")) {
                    // basename() prevents path traversal out of the uploads folder.
                    const fileName = path.basename(item.url);
                    await fs.unlink(path.join(localUploadDir(), fileName));
                }
            } catch (err) {
                console.error("Failed to delete stored file:", err);
            }

            const result = await db
                .delete(media)
                .where(eq(media.id, input))
                .returning();
            return result[0];
        }),
});
