import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/**
 * Core User table backing auth flow.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role").default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Projects table managing all visual, video, and marketing portfolios.
 */
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // video, photo, marketing, case-study
  description: text("description"),
  tags: text("tags").default("[]").notNull(), // string[] (stored as JSON string)
  client: text("client"),
  year: integer("year"),
  thumbnail: text("thumbnail").notNull(),
  gallery: text("gallery").default("[]").notNull(), // string[] (stored as JSON string)
  videoUrl: text("videoUrl"),
  videoType: text("videoType"),
  directVideoUrl: text("directVideoUrl"),
  summary: text("summary"),
  problem: text("problem"),
  solution: text("solution"),
  results: text("results").default("[]").notNull(), // string[] (stored as JSON string)
  tools: text("tools").default("[]").notNull(), // string[] (stored as JSON string)
  credits: text("credits").default("[]").notNull(), // string[] (stored as JSON string)
  featured: integer("featured", { mode: "boolean" }).default(false).notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  status: text("status").default("draft").notNull(), // draft, published, scheduled
  publishDate: integer("publishDate", { mode: "timestamp" }),
  metaTitle: text("metaTitle"),
  metaDescription: text("metaDescription"),
  ogImage: text("ogImage"),
  views: integer("views").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * SiteContent table managing static sections and bios in dynamic DB.
 */
export const siteContents = sqliteTable("site_contents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  heroTitle: text("heroTitle"),
  heroSubtitle: text("heroSubtitle"),
  aboutText: text("aboutText"),
  services: text("services"), // JSON string
  skills: text("skills"), // JSON string
  socials: text("socials"), // JSON string
  contact: text("contact"), // JSON string
  sections: text("sections"), // JSON string
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type SiteContent = typeof siteContents.$inferSelect;
export type InsertSiteContent = typeof siteContents.$inferInsert;

/**
 * Category table managing service categories.
 */
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  order: integer("order").default(0).notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Tag table for project metadata tagging.
 */
export const tags = sqliteTable("tags", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

/**
 * Media uploads tracking.
 */
export const media = sqliteTable("media", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  url: text("url").notNull(),
  type: text("type").notNull(), // image/video
  name: text("name"),
  width: integer("width"),
  height: integer("height"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type Media = typeof media.$inferSelect;
export type InsertMedia = typeof media.$inferInsert;

/**
 * Simple Contact Message leads.
 */
export const contactMessages = sqliteTable("contact_messages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  read: integer("read", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

/**
 * Client booking submissions.
 */
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  details: text("details"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Content Revision snapshots.
 */
export const revisions = sqliteTable("revisions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  entityType: text("entityType").notNull(), // "Project", "SiteContent"
  entityId: text("entityId").notNull(),
  data: text("data").notNull(), // JSON string representing snapshot
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type Revision = typeof revisions.$inferSelect;
export type InsertRevision = typeof revisions.$inferInsert;