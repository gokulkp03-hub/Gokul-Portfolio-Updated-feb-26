import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { db } from "./db";
import { siteContents } from "../drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const contentRouter = router({
    get: publicProcedure.query(async () => {
        let content = await db
            .select()
            .from(siteContents)
            .where(eq(siteContents.id, 1))
            .get();

        if (!content) {
            const result = await db.insert(siteContents).values({ id: 1 }).returning();
            content = result[0];
        }

        return content;
    }),

    update: adminProcedure
        .input(
            z.object({
                heroTitle: z.string().optional(),
                heroSubtitle: z.string().optional(),
                aboutText: z.string().optional(),
                services: z.any().optional(),
                skills: z.any().optional(),
                socials: z.any().optional(),
                contact: z.any().optional(),
                sections: z.any().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const data: any = { ...input };
            if (input.services) data.services = JSON.stringify(input.services);
            if (input.skills) data.skills = JSON.stringify(input.skills);
            if (input.socials) data.socials = JSON.stringify(input.socials);
            if (input.contact) data.contact = JSON.stringify(input.contact);
            if (input.sections) data.sections = JSON.stringify(input.sections);

            const existing = await db
                .select()
                .from(siteContents)
                .where(eq(siteContents.id, 1))
                .get();

            if (existing) {
                const result = await db
                    .update(siteContents)
                    .set(data)
                    .where(eq(siteContents.id, 1))
                    .returning();
                return result[0];
            } else {
                const result = await db
                    .insert(siteContents)
                    .values({ id: 1, ...data })
                    .returning();
                return result[0];
            }
        }),
});
