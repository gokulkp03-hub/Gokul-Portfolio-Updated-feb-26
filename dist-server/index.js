var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import jwt2 from "jsonwebtoken";

// server/_core/limiters.ts
import rateLimit from "express-rate-limit";
var store = void 0;
var createLimiter = (options) => rateLimit({
  store,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
  ...options
});
var apiLimiter = createLimiter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "60000", 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10)
});
var loginIpLimiter = createLimiter({
  windowMs: 10 * 60 * 1e3,
  max: 5,
  message: { error: "Too many login attempts, please try again later." }
});
var loginIdentifierLimiter = createLimiter({
  windowMs: 10 * 60 * 1e3,
  max: 5,
  message: { error: "Too many login attempts, please try again later." },
  keyGenerator: (req) => {
    return req.body?.username || req.body?.email || "unknown_user";
  }
});

// server/db.ts
import "dotenv/config";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogs: () => blogs,
  categories: () => categories,
  contactMessages: () => contactMessages,
  contactSubmissions: () => contactSubmissions,
  media: () => media,
  projects: () => projects,
  revisions: () => revisions,
  siteContents: () => siteContents,
  tags: () => tags,
  users: () => users
});
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
var users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role").default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  // video, photo, marketing, case-study
  description: text("description"),
  tags: text("tags").default("[]").notNull(),
  // string[] (stored as JSON string)
  client: text("client"),
  year: integer("year"),
  thumbnail: text("thumbnail").notNull(),
  gallery: text("gallery").default("[]").notNull(),
  // string[] (stored as JSON string)
  videoUrl: text("videoUrl"),
  videoType: text("videoType"),
  directVideoUrl: text("directVideoUrl"),
  summary: text("summary"),
  problem: text("problem"),
  solution: text("solution"),
  results: text("results").default("[]").notNull(),
  // string[] (stored as JSON string)
  tools: text("tools").default("[]").notNull(),
  // string[] (stored as JSON string)
  credits: text("credits").default("[]").notNull(),
  // string[] (stored as JSON string)
  featured: integer("featured", { mode: "boolean" }).default(false).notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  status: text("status").default("draft").notNull(),
  // draft, published, scheduled
  publishDate: integer("publishDate", { mode: "timestamp" }),
  metaTitle: text("metaTitle"),
  metaDescription: text("metaDescription"),
  ogImage: text("ogImage"),
  views: integer("views").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var siteContents = sqliteTable("site_contents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  heroTitle: text("heroTitle"),
  heroSubtitle: text("heroSubtitle"),
  aboutText: text("aboutText"),
  services: text("services"),
  // JSON string
  skills: text("skills"),
  // JSON string
  socials: text("socials"),
  // JSON string
  contact: text("contact"),
  // JSON string
  sections: text("sections"),
  // JSON string
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var categories = sqliteTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  order: integer("order").default(0).notNull()
});
var tags = sqliteTable("tags", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique()
});
var media = sqliteTable("media", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  url: text("url").notNull(),
  type: text("type").notNull(),
  // image/video
  name: text("name"),
  width: integer("width"),
  height: integer("height"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var contactMessages = sqliteTable("contact_messages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  read: integer("read", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  details: text("details"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var revisions = sqliteTable("revisions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  entityType: text("entityType").notNull(),
  // "Project", "SiteContent"
  entityId: text("entityId").notNull(),
  data: text("data").notNull(),
  // JSON string representing snapshot
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var blogs = sqliteTable("blogs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  // Markdown/Rich Text
  excerpt: text("excerpt"),
  thumbnail: text("thumbnail"),
  published: integer("published", { mode: "boolean" }).default(false).notNull(),
  views: integer("views").default(0).notNull(),
  metaTitle: text("metaTitle"),
  metaDescription: text("metaDescription"),
  publishDate: integer("publishDate", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});

// server/db.ts
import { eq } from "drizzle-orm";
var dbPath = (process.env.DATABASE_URL || "./dev.db").replace("file:", "");
var sqlite = new Database(dbPath);
var db = drizzle(sqlite, { schema: schema_exports });
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  try {
    const data = {
      openId: user.openId,
      name: user.name || null,
      email: user.email || null,
      loginMethod: user.loginMethod || null,
      role: user.role || "user",
      lastSignedIn: user.lastSignedIn || /* @__PURE__ */ new Date()
    };
    const existing = await db.select().from(users).where(eq(users.openId, user.openId)).get();
    if (existing) {
      await db.update(users).set(data).where(eq(users.openId, user.openId));
    } else {
      await db.insert(users).values(data);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  const isSecure = isSecureRequest(req);
  return {
    httpOnly: true,
    path: "/",
    sameSite: isSecure ? "none" : "lax",
    secure: isSecure
  };
}

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  adminUsername: process.env.ADMIN_USERNAME ?? "admin",
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin"
};

// server/_core/login.ts
import jwt from "jsonwebtoken";
function registerLoginRoutes(app) {
  app.post("/api/login", loginIpLimiter, loginIdentifierLimiter, async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }
    const adminUsername = ENV.adminUsername;
    const adminPassword = ENV.adminPassword;
    if (!adminPassword || !adminUsername) {
      console.error("[Login] Admin credentials are not fully set in .env.");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }
    if (username !== adminUsername || password !== adminPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    try {
      const openId = process.env.OWNER_OPEN_ID;
      if (!openId) {
        console.error("[Login] OWNER_OPEN_ID environment variable is not set.");
        res.status(500).json({ error: "Server configuration error" });
        return;
      }
      await upsertUser({
        openId,
        name: "Admin",
        email: null,
        loginMethod: "password",
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not configured");
      const jwtToken = jwt.sign(
        { id: openId, name: "Admin", role: "admin" },
        secret,
        {
          expiresIn: process.env.JWT_EXPIRY || "1d",
          algorithm: "HS256"
        }
      );
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("auth_token", jwtToken, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1e3 });
      res.status(200).json({ success: true, token: jwtToken });
    } catch (error) {
      console.error("[Login] Login failed", error);
      res.status(500).json({ error: "Login process failed" });
    }
  });
  app.post("/api/logout", (req, res) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie("auth_token", cookieOptions);
    res.status(200).json({ success: true });
  });
}

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/projectRouter.ts
import { z as z2 } from "zod";
import { eq as eq2, asc, desc } from "drizzle-orm";
var projectRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(projects).where(eq2(projects.status, "published")).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }),
  adminList: adminProcedure.query(async () => {
    return db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }),
  getById: publicProcedure.input(z2.string()).query(async ({ input }) => {
    return db.select().from(projects).where(eq2(projects.id, input)).get() || null;
  }),
  getBySlug: publicProcedure.input(z2.string()).query(async ({ input }) => {
    return db.select().from(projects).where(eq2(projects.slug, input)).get() || null;
  }),
  create: adminProcedure.input(
    z2.object({
      title: z2.string(),
      slug: z2.string(),
      category: z2.string(),
      description: z2.string().optional(),
      thumbnail: z2.string(),
      tags: z2.array(z2.string()).optional(),
      gallery: z2.array(z2.string()).optional(),
      client: z2.string().optional(),
      year: z2.number().optional(),
      videoUrl: z2.string().optional(),
      videoType: z2.string().optional(),
      directVideoUrl: z2.string().optional(),
      summary: z2.string().optional(),
      problem: z2.string().optional(),
      solution: z2.string().optional(),
      results: z2.array(z2.string()).optional(),
      tools: z2.array(z2.string()).optional(),
      status: z2.preprocess((val) => typeof val === "string" ? val.toLowerCase().trim() : val, z2.enum(["draft", "published", "scheduled"])).default("draft"),
      featured: z2.boolean().default(false),
      sortOrder: z2.number().default(0),
      publishDate: z2.date().optional()
    })
  ).mutation(async ({ input }) => {
    const data = {
      ...input,
      tags: JSON.stringify(input.tags || []),
      gallery: JSON.stringify(input.gallery || []),
      results: JSON.stringify(input.results || []),
      tools: JSON.stringify(input.tools || []),
      credits: JSON.stringify([])
    };
    const result = await db.insert(projects).values(data).returning();
    return result[0];
  }),
  update: adminProcedure.input(
    z2.object({
      id: z2.string(),
      title: z2.string().optional(),
      slug: z2.string().optional(),
      category: z2.string().optional(),
      description: z2.string().optional(),
      thumbnail: z2.string().optional(),
      tags: z2.array(z2.string()).optional(),
      gallery: z2.array(z2.string()).optional(),
      client: z2.string().optional(),
      year: z2.number().optional(),
      videoUrl: z2.string().optional(),
      videoType: z2.string().optional(),
      directVideoUrl: z2.string().optional(),
      summary: z2.string().optional(),
      problem: z2.string().optional(),
      solution: z2.string().optional(),
      results: z2.array(z2.string()).optional(),
      tools: z2.array(z2.string()).optional(),
      status: z2.preprocess((val) => typeof val === "string" ? val.toLowerCase().trim() : val, z2.enum(["draft", "published", "scheduled"])).optional(),
      featured: z2.boolean().optional(),
      sortOrder: z2.number().optional(),
      publishDate: z2.date().optional()
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    const updateData = { ...data };
    if (data.tags) updateData.tags = JSON.stringify(data.tags);
    if (data.gallery) updateData.gallery = JSON.stringify(data.gallery);
    if (data.results) updateData.results = JSON.stringify(data.results);
    if (data.tools) updateData.tools = JSON.stringify(data.tools);
    const result = await db.update(projects).set(updateData).where(eq2(projects.id, id)).returning();
    return result[0];
  }),
  delete: adminProcedure.input(z2.string()).mutation(async ({ input }) => {
    const result = await db.delete(projects).where(eq2(projects.id, input)).returning();
    return result[0];
  })
});

// server/contentRouter.ts
import { z as z3 } from "zod";
import { eq as eq3 } from "drizzle-orm";
var contentRouter = router({
  get: publicProcedure.query(async () => {
    let content = await db.select().from(siteContents).where(eq3(siteContents.id, 1)).get();
    if (!content) {
      const result = await db.insert(siteContents).values({ id: 1 }).returning();
      content = result[0];
    }
    return content;
  }),
  update: adminProcedure.input(
    z3.object({
      heroTitle: z3.string().optional(),
      heroSubtitle: z3.string().optional(),
      aboutText: z3.string().optional(),
      services: z3.any().optional(),
      skills: z3.any().optional(),
      socials: z3.any().optional(),
      contact: z3.any().optional(),
      sections: z3.any().optional()
    })
  ).mutation(async ({ input }) => {
    const data = { ...input };
    if (input.services) data.services = JSON.stringify(input.services);
    if (input.skills) data.skills = JSON.stringify(input.skills);
    if (input.socials) data.socials = JSON.stringify(input.socials);
    if (input.contact) data.contact = JSON.stringify(input.contact);
    if (input.sections) data.sections = JSON.stringify(input.sections);
    const existing = await db.select().from(siteContents).where(eq3(siteContents.id, 1)).get();
    if (existing) {
      const result = await db.update(siteContents).set(data).where(eq3(siteContents.id, 1)).returning();
      return result[0];
    } else {
      const result = await db.insert(siteContents).values({ id: 1, ...data }).returning();
      return result[0];
    }
  })
});

// server/mediaRouter.ts
import { z as z4 } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto2 from "crypto";
import { eq as eq4, desc as desc2 } from "drizzle-orm";
var mediaRouter = router({
  list: adminProcedure.query(async () => {
    return db.select().from(media).orderBy(desc2(media.createdAt));
  }),
  upload: adminProcedure.input(
    z4.object({
      fileName: z4.string(),
      fileType: z4.string(),
      base64Data: z4.string(),
      // Raw base64 data
      width: z4.number().optional(),
      height: z4.number().optional()
    })
  ).mutation(async ({ input }) => {
    const buffer = Buffer.from(input.base64Data, "base64");
    const extMatch = input.fileName.match(/\.[0-9a-z]+$/i);
    const ext = extMatch ? extMatch[0] : input.fileType.startsWith("video") ? ".mp4" : ".png";
    const uniqueName = crypto2.randomUUID() + ext;
    const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);
    const url = `/uploads/${uniqueName}`;
    const result = await db.insert(media).values({
      url,
      type: input.fileType,
      name: input.fileName,
      width: input.width,
      height: input.height
    }).returning();
    return result[0];
  }),
  addExternal: adminProcedure.input(
    z4.object({
      url: z4.string(),
      type: z4.string(),
      // e.g., 'video/embed'
      title: z4.string().optional()
    })
  ).mutation(async ({ input }) => {
    const result = await db.insert(media).values({
      url: input.url,
      type: input.type,
      name: input.title || "Embedded Video"
    }).returning();
    return result[0];
  }),
  delete: adminProcedure.input(z4.string()).mutation(async ({ input }) => {
    const item = await db.select().from(media).where(eq4(media.id, input)).get();
    if (!item) return;
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
    const result = await db.delete(media).where(eq4(media.id, input)).returning();
    return result[0];
  })
});

// server/contactRouter.ts
import { z as z5 } from "zod";
import { desc as desc3 } from "drizzle-orm";
var contactRouter = router({
  submit: publicProcedure.input(z5.object({
    name: z5.string().min(1),
    email: z5.string().email(),
    service: z5.string(),
    details: z5.string().optional()
  })).mutation(async ({ input }) => {
    const result = await db.insert(contactSubmissions).values(input).returning();
    return result[0];
  }),
  list: adminProcedure.query(async () => {
    return db.select().from(contactSubmissions).orderBy(desc3(contactSubmissions.createdAt));
  })
});

// server/blogRouter.ts
import { z as z6 } from "zod";
import { eq as eq5, desc as desc4 } from "drizzle-orm";
var blogRouter = router({
  list: publicProcedure.input(
    z6.object({
      includeUnpublished: z6.boolean().optional()
    }).optional()
  ).query(async ({ input, ctx }) => {
    const isAdmin = !!ctx.user;
    const query = db.select().from(blogs).orderBy(desc4(blogs.createdAt));
    const results = await query;
    if (!isAdmin || !input?.includeUnpublished) {
      return results.filter((b) => b.published);
    }
    return results;
  }),
  getBySlug: publicProcedure.input(z6.string()).query(async ({ input }) => {
    const result = await db.select().from(blogs).where(eq5(blogs.slug, input)).get();
    if (result) {
      db.update(blogs).set({ views: (result.views || 0) + 1 }).where(eq5(blogs.id, result.id)).run();
    }
    return result;
  }),
  create: protectedProcedure.input(
    z6.object({
      title: z6.string(),
      slug: z6.string(),
      content: z6.string().optional(),
      excerpt: z6.string().optional(),
      thumbnail: z6.string().optional(),
      published: z6.boolean().optional(),
      metaTitle: z6.string().optional(),
      metaDescription: z6.string().optional(),
      publishDate: z6.date().optional()
    })
  ).mutation(async ({ input }) => {
    const result = await db.insert(blogs).values({
      ...input,
      publishDate: input.publishDate || /* @__PURE__ */ new Date()
    }).returning().get();
    return result;
  }),
  update: protectedProcedure.input(
    z6.object({
      id: z6.string(),
      title: z6.string().optional(),
      slug: z6.string().optional(),
      content: z6.string().optional(),
      excerpt: z6.string().optional(),
      thumbnail: z6.string().optional(),
      published: z6.boolean().optional(),
      metaTitle: z6.string().optional(),
      metaDescription: z6.string().optional(),
      publishDate: z6.date().optional()
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    const result = await db.update(blogs).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq5(blogs.id, id)).returning().get();
    return result;
  }),
  delete: protectedProcedure.input(z6.string()).mutation(async ({ input }) => {
    await db.delete(blogs).where(eq5(blogs.id, input)).run();
    return { success: true };
  })
});

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  projects: projectRouter,
  content: contentRouter,
  media: mediaRouter,
  contact: contactRouter,
  blogs: blogRouter
});

// server/_core/context.ts
async function createContext(opts) {
  const user = opts.req.user || null;
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path3 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime()
];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path2.resolve(import.meta.dirname),
  root: path2.resolve(import.meta.dirname, "client"),
  publicDir: path2.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/seoInjector.ts
import { eq as eq6 } from "drizzle-orm";
async function injectDynamicSEO(url, html) {
  try {
    let title = "";
    let description = "";
    let image = "";
    const blogMatch = url.match(/^\/blogs\/([^\/]+)$/);
    const projectMatch = url.match(/^\/portfolio\/[^\/]+\/([^\/]+)$/) || url.match(/^\/marketing\/([^\/]+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      const blog = await db.select().from(blogs).where(eq6(blogs.slug, slug)).get();
      if (blog) {
        title = blog.metaTitle || `${blog.title} | Gokul KP`;
        description = blog.metaDescription || blog.excerpt || "";
        image = blog.thumbnail || "";
      }
    } else if (projectMatch) {
      const slug = projectMatch[1];
      const project = await db.select().from(projects).where(eq6(projects.slug, slug)).get();
      if (project) {
        title = project.metaTitle || `${project.title} | Gokul KP`;
        description = project.metaDescription || project.description || "";
        image = project.ogImage || project.thumbnail || "";
      }
    }
    if (!title && !description && !image) {
      return html;
    }
    let modifiedHtml = html;
    if (title) {
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      modifiedHtml = modifiedHtml.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${title}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${title}" />`);
    }
    if (description) {
      modifiedHtml = modifiedHtml.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${description}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${description}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${description}" />`);
    }
    if (image) {
      modifiedHtml = modifiedHtml.replace(/<meta property="og:image" content=".*?"\s*\/>/, `<meta property="og:image" content="${image}" />`);
      modifiedHtml = modifiedHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/>/, `<meta name="twitter:image" content="${image}" />`);
    }
    return modifiedHtml;
  } catch (error) {
    console.error("Error injecting dynamic SEO:", error);
    return html;
  }
}

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      template = await injectDynamicSEO(url, template);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path3.resolve(import.meta.dirname, "../..", "dist") : path3.resolve(import.meta.dirname, "../dist");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", async (req, res) => {
    try {
      let template = await fs2.promises.readFile(path3.resolve(distPath, "index.html"), "utf-8");
      template = await injectDynamicSEO(req.originalUrl, template);
      res.status(200).set({ "Content-Type": "text/html" }).send(template);
    } catch (e) {
      console.error("Error serving index.html:", e);
      res.status(500).end();
    }
  });
}

// server/_core/index.ts
import path4 from "path";

// server/sitemap.ts
import { eq as eq7 } from "drizzle-orm";
async function generateSitemap(req, res) {
  try {
    const baseUrl = "https://www.gokulkp.com";
    const allProjects = await db.select().from(projects).where(eq7(projects.status, "published"));
    const allBlogs = await db.select().from(blogs).where(eq7(blogs.published, true));
    const routes = [
      { url: "/", changefreq: "weekly", priority: 1 },
      { url: "/marketing", changefreq: "monthly", priority: 0.8 },
      { url: "/portfolio/video", changefreq: "monthly", priority: 0.8 },
      { url: "/portfolio/photo", changefreq: "monthly", priority: 0.8 },
      { url: "/services", changefreq: "monthly", priority: 0.7 },
      { url: "/about", changefreq: "monthly", priority: 0.6 },
      { url: "/contact", changefreq: "yearly", priority: 0.5 },
      { url: "/blogs", changefreq: "weekly", priority: 0.8 }
    ];
    allProjects.forEach((project) => {
      let routeUrl = `/portfolio/${project.category}/${project.slug}`;
      if (project.category === "marketing") {
        routeUrl = `/marketing/${project.slug}`;
      }
      routes.push({
        url: routeUrl,
        changefreq: "monthly",
        priority: 0.7
      });
    });
    allBlogs.forEach((blog) => {
      routes.push({
        url: `/blogs/${blog.slug}`,
        changefreq: "monthly",
        priority: 0.7
      });
    });
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    routes.forEach((route) => {
      sitemap += `  <url>
`;
      sitemap += `    <loc>${baseUrl}${route.url}</loc>
`;
      sitemap += `    <changefreq>${route.changefreq}</changefreq>
`;
      sitemap += `    <priority>${route.priority}</priority>
`;
      sitemap += `  </url>
`;
    });
    sitemap += `</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
}

// server/_core/index.ts
var jwtValidationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : req.headers.cookie?.includes("auth_token=") ? req.headers.cookie.split("auth_token=")[1].split(";")[0] : null;
  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not configured");
      const decoded = jwt2.verify(token, secret, { algorithms: ["HS256"] });
      req.user = decoded;
    } catch (err) {
      console.error("[Auth] JWT validation failed:", err.message);
    }
  }
  next();
};
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("FATAL: Environment variable JWT_SECRET is missing.");
    process.exit(1);
  }
  const app = express2();
  app.set("trust proxy", 1);
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:5173", "http://localhost:3000"];
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true
  }));
  app.use(jwtValidationMiddleware);
  app.use("/api", apiLimiter);
  const uploadDir = process.env.UPLOADS_DIR || path4.join(process.cwd(), "public", "uploads");
  app.use("/uploads", express2.static(uploadDir));
  registerLoginRoutes(app);
  app.get("/sitemap.xml", generateSitemap);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "3000");
  if (process.env.NODE_ENV === "production") {
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running in production on port ${port}`);
    });
  } else {
    const availablePort = await findAvailablePort(port);
    server.listen(availablePort, () => {
      console.log(`Server running in development on http://localhost:${availablePort}/`);
    });
  }
}
startServer().catch(console.error);
