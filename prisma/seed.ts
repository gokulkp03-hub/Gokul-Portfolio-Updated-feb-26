import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { projects } from '../client/src/data/projects';
import { marketingCampaigns } from '../client/src/data/marketing';
import { bio, skills } from '../client/src/data/about';
import { proof } from '../client/src/data/proof';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding...');

    // 1. Seed Categories & Tags from projects
    const categories = new Set<string>();
    const tags = new Set<string>();

    projects.forEach(p => {
        categories.add(p.category);
        if (p.tools) p.tools.forEach(t => tags.add(t));
    });

    marketingCampaigns.forEach(m => {
        m.tags.forEach(t => tags.add(t));
    });

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.toLowerCase().replace(/ /g, '-') },
            update: {},
            create: {
                name: cat.charAt(0).toUpperCase() + cat.slice(1),
                slug: cat.toLowerCase().replace(/ /g, '-'),
            },
        });
    }

    for (const tag of tags) {
        await prisma.tag.upsert({
            where: { slug: tag.toLowerCase().replace(/ /g, '-') },
            update: {},
            create: {
                name: tag,
                slug: tag.toLowerCase().replace(/ /g, '-'),
            },
        });
    }

    // 2. Seed Projects
    for (const p of projects) {
        await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                title: p.title,
                slug: p.slug,
                category: p.category,
                thumbnail: p.thumbnail,
                description: p.description,
                client: p.client,
                year: p.date ? parseInt(p.date) : undefined,
                featured: p.featured || false,
                videoUrl: p.videoUrl,
                summary: p.description,
                problem: p.challenge,
                solution: p.solution,
                results: p.outcome ? [p.outcome] : [],
                tools: p.tools || [],
                status: 'published',
                tags: p.tools || [],
                gallery: p.images || [],
            },
        });
    }

    // 3. Seed Marketing Campaigns (as Projects with 'marketing' category)
    for (const m of marketingCampaigns) {
        await prisma.project.upsert({
            where: { slug: m.slug },
            update: {},
            create: {
                title: m.title,
                slug: m.slug,
                category: 'marketing',
                thumbnail: m.visuals[0] || '',
                description: m.description,
                client: m.client,
                featured: m.featured || false,
                summary: m.headline,
                problem: m.challenge,
                solution: m.strategy.join('\n'),
                results: [m.results],
                tools: m.tags,
                status: 'published',
                tags: m.tags,
                gallery: m.visuals,
            }
        });
    }

    // 4. Seed SiteContent
    const siteContentData = {
        heroTitle: bio.name,
        heroSubtitle: bio.role,
        aboutText: bio.longDescription,
        services: {},
        skills: skills,
        socials: {},
        contact: {},
        sections: {
            proof: proof.metrics,
            logos: proof.logos,
            testimonials: proof.testimonials
        }
    };

    await prisma.siteContent.upsert({
        where: { id: 1 },
        update: siteContentData,
        create: {
            id: 1,
            ...siteContentData
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
