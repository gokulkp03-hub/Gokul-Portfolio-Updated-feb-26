import 'dotenv/config';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../drizzle/schema';
import {
    projects as projectsTable,
    categories as categoriesTable,
    tags as tagsTable,
    siteContents as siteContentsTable
} from '../drizzle/schema';
import { projects } from '../client/src/data/projects';
import { marketingCampaigns } from '../client/src/data/marketing';
import { bio, skills } from '../client/src/data/about';
import { proof } from '../client/src/data/proof';

const dbPath = (process.env.DATABASE_URL || "./dev.db").replace("file:", "");
console.log(`Using database file: ${dbPath}`);
const sqlite = new Database(dbPath);
const db = drizzle(sqlite, { schema });

async function main() {
    console.log('Start Drizzle seeding...');

    // 1. Clean Wipe
    console.log('Wiping existing projects, categories, tags, and siteContents...');
    await db.delete(projectsTable);
    await db.delete(categoriesTable);
    await db.delete(tagsTable);
    await db.delete(siteContentsTable);

    // 2. Seed Categories & Tags
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
        const slug = cat.toLowerCase().replace(/ /g, '-');
        const name = cat.charAt(0).toUpperCase() + cat.slice(1);
        await db.insert(categoriesTable).values({
            name,
            slug,
        }).onConflictDoNothing();
    }

    for (const tag of tags) {
        const slug = tag.toLowerCase().replace(/ /g, '-');
        await db.insert(tagsTable).values({
            name: tag,
            slug,
        }).onConflictDoNothing();
    }

    // 3. Seed Projects
    for (const p of projects) {
        await db.insert(projectsTable).values({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category: p.category,
            thumbnail: p.thumbnail,
            description: p.description,
            client: p.client || null,
            year: p.date ? parseInt(p.date) : null,
            featured: p.featured || false,
            videoUrl: p.videoUrl || null,
            summary: p.description || null,
            problem: p.challenge || null,
            solution: p.solution || null,
            results: JSON.stringify(p.outcome ? [p.outcome] : []),
            tools: JSON.stringify(p.tools || []),
            status: 'published',
            tags: JSON.stringify(p.tools || []),
            gallery: JSON.stringify(p.images || []),
            credits: JSON.stringify([]),
        }).onConflictDoNothing();
    }

    // 4. Seed Marketing Campaigns (as Projects with 'marketing' category)
    for (const m of marketingCampaigns) {
        await db.insert(projectsTable).values({
            id: m.id,
            title: m.title,
            slug: m.slug,
            category: 'marketing',
            thumbnail: m.visuals[0] || '',
            description: m.description,
            client: m.client || null,
            featured: m.featured || false,
            summary: m.headline || null,
            problem: m.challenge || null,
            solution: m.strategy.join('\n') || null,
            results: JSON.stringify([m.results]),
            tools: JSON.stringify(m.tags),
            status: 'published',
            tags: JSON.stringify(m.tags),
            gallery: JSON.stringify(m.visuals),
            credits: JSON.stringify([]),
        }).onConflictDoNothing();
    }

    // 5. Seed SiteContent
    const siteContentData = {
        id: 1,
        heroTitle: bio.name,
        heroSubtitle: bio.role,
        aboutText: bio.longDescription,
        services: JSON.stringify({}),
        skills: JSON.stringify(skills),
        socials: JSON.stringify({}),
        contact: JSON.stringify({}),
        sections: JSON.stringify({
            proof: proof.metrics,
            logos: proof.logos,
            testimonials: proof.testimonials
        })
    };

    await db.insert(siteContentsTable).values(siteContentData).onConflictDoNothing();

    console.log('Drizzle seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        sqlite.close();
    });
