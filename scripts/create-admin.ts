import 'dotenv/config';
import { upsertUser } from '../server/db';

async function main() {
    const openId = process.env.OWNER_OPEN_ID || "admin-user-id";
    console.log(`Creating admin user for openId: ${openId}`);

    await upsertUser({
        openId,
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
    });

    console.log("Admin user created/updated successfully.");
}

main().catch(console.error);
