import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("./db", async () => (await import("./test/memoryDb")).createMemoryDbModule());

import { db } from "./db";
import { blogs, projects } from "../drizzle/schema";
import { appRouter } from "./routers";
import { injectDynamicSEO } from "./_core/seoInjector";
import type { TrpcContext } from "./_core/context";

function ctxFor(role: "admin" | "user" | null): TrpcContext {
  return {
    user: role
      ? { id: 1, openId: "u", name: "U", email: null, loginMethod: "password", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }
      : null,
    req: { headers: {} } as TrpcContext["req"],
    res: { setHeader: () => {} } as unknown as TrpcContext["res"],
  };
}

const publicCaller = () => appRouter.createCaller(ctxFor(null));
const userCaller = () => appRouter.createCaller(ctxFor("user"));
const adminCaller = () => appRouter.createCaller(ctxFor("admin"));

let draftProjectId = "";

beforeAll(async () => {
  await db.insert(blogs).values([
    { title: "Live post", slug: "live-post", published: true },
    { title: "Secret draft", slug: "secret-draft", published: false, metaTitle: "Secret draft title" },
  ]);
  const inserted = await db
    .insert(projects)
    .values([
      { title: "Live project", slug: "live-project", category: "marketing", thumbnail: "/x.jpg", status: "published" },
      { title: "Draft project", slug: "draft-project", category: "marketing", thumbnail: "/x.jpg", status: "draft" },
      { title: "Scheduled project", slug: "scheduled-project", category: "marketing", thumbnail: "/x.jpg", status: "scheduled" },
    ])
    .returning();
  draftProjectId = inserted.find(p => p.slug === "draft-project")!.id;
});

describe("blog drafts", () => {
  it("are hidden from the public by slug", async () => {
    expect(await publicCaller().blogs.getBySlug("secret-draft")).toBeNull();
    expect((await publicCaller().blogs.getBySlug("live-post"))?.title).toBe("Live post");
  });

  it("are hidden from lists unless an admin asks for them", async () => {
    const pub = await publicCaller().blogs.list({ includeUnpublished: true });
    expect(pub.map(b => b.slug)).toEqual(["live-post"]);
    const user = await userCaller().blogs.list({ includeUnpublished: true });
    expect(user.map(b => b.slug)).toEqual(["live-post"]);
    const admin = await adminCaller().blogs.list({ includeUnpublished: true });
    expect(admin.map(b => b.slug).sort()).toEqual(["live-post", "secret-draft"]);
  });

  it("are visible to admins by slug", async () => {
    expect((await adminCaller().blogs.getBySlug("secret-draft"))?.title).toBe("Secret draft");
  });

  it("can only be created by admins", async () => {
    await expect(userCaller().blogs.create({ title: "x", slug: "x" })).rejects.toThrow();
    await expect(publicCaller().blogs.delete("anything")).rejects.toThrow();
  });
});

describe("project drafts", () => {
  it("are hidden from the public by slug and id", async () => {
    expect(await publicCaller().projects.getBySlug("draft-project")).toBeNull();
    expect(await publicCaller().projects.getBySlug("scheduled-project")).toBeNull();
    expect(await publicCaller().projects.getById(draftProjectId)).toBeNull();
    expect((await publicCaller().projects.getBySlug("live-project"))?.title).toBe("Live project");
  });

  it("are visible to admins", async () => {
    expect((await adminCaller().projects.getBySlug("draft-project"))?.title).toBe("Draft project");
    expect((await adminCaller().projects.getById(draftProjectId))?.title).toBe("Draft project");
  });
});

describe("SEO injector", () => {
  const html = '<title>Home</title><meta name="description" content="home" />';

  it("does not leak draft titles into HTML", async () => {
    expect(await injectDynamicSEO("/blogs/secret-draft", html)).toBe(html);
    expect(await injectDynamicSEO("/marketing/draft-project", html)).toBe(html);
  });

  it("still injects published content", async () => {
    expect(await injectDynamicSEO("/marketing/live-project", html)).toContain("<title>Live project | Gokul KP</title>");
  });
});
