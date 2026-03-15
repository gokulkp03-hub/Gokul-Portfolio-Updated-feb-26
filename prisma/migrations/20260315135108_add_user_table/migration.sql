-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "openId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "loginMethod" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastSignedIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "tags" JSONB NOT NULL DEFAULT [],
    "client" TEXT,
    "year" INTEGER,
    "thumbnail" TEXT NOT NULL,
    "gallery" JSONB NOT NULL DEFAULT [],
    "videoUrl" TEXT,
    "videoType" TEXT,
    "directVideoUrl" TEXT,
    "summary" TEXT,
    "problem" TEXT,
    "solution" TEXT,
    "results" JSONB NOT NULL DEFAULT [],
    "tools" JSONB NOT NULL DEFAULT [],
    "credits" JSONB NOT NULL DEFAULT [],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishDate" DATETIME,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogImage" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("category", "client", "createdAt", "credits", "featured", "gallery", "id", "metaDescription", "metaTitle", "ogImage", "problem", "publishDate", "results", "slug", "solution", "status", "summary", "tags", "thumbnail", "title", "tools", "updatedAt", "videoUrl", "views", "year") SELECT "category", "client", "createdAt", "credits", "featured", "gallery", "id", "metaDescription", "metaTitle", "ogImage", "problem", "publishDate", "results", "slug", "solution", "status", "summary", "tags", "thumbnail", "title", "tools", "updatedAt", "videoUrl", "views", "year" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_openId_key" ON "User"("openId");
