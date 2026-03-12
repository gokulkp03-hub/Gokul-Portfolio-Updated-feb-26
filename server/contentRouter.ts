import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { prisma } from "./prisma-db";
import { z } from "zod";

export const contentRouter = router({
    get: publicProcedure.query(async () => {
        let content = await prisma.siteContent.findFirst({
            where: { id: 1 }
        });

        if (!content) {
            content = await prisma.siteContent.create({
                data: { id: 1 }
            });
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
            return prisma.siteContent.upsert({
                where: { id: 1 },
                update: input,
                create: { id: 1, ...input },
            });
        }),
});
