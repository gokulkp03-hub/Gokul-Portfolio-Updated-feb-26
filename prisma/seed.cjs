const { PrismaClient } = require('@prisma/client');
const sqlite = require('better-sqlite3');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');

// Basic manual data since importing TS files in JS is tricky
const db = new sqlite(path.join(__dirname, 'dev.db'));
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding (JS)...');

    // Seed SiteContent (Basic placeholder to ensure structure)
    await prisma.siteContent.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            heroTitle: "Gokul KP",
            heroSubtitle: "Creative Strategist",
            aboutText: "Driving digital growth through performance marketing & cinematic content.",
        },
    });

    // Since importing the massive TS data files is failing, 
    // I will seed just one sample project to verify it works.
    await prisma.project.upsert({
        where: { slug: 'sample-project' },
        update: {},
        create: {
            title: 'Sample Project',
            slug: 'sample-project',
            category: 'video',
            thumbnail: '/assets/images/brands/Beyond-Cars/beyondcarsin.webp',
            status: 'published',
            tags: [],
            gallery: [],
        }
    });

    console.log('Seeding finished (JS).');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
