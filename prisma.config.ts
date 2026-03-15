import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

export default defineConfig({
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
  },
  migrate: {
    async adapter(env) {
      const url = env.DATABASE_URL?.replace('file:', '') ?? './prisma/dev.db'
      const db = new Database(url)
      return new PrismaBetterSqlite3(db)
    }
  }
})
