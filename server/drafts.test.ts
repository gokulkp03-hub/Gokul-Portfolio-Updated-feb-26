import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("./db", async () => (await import("./test/memoryDb.js")).createMemoryDbModule());

import { db } from "./db.js";
import { blogs, projects } from "../drizzle/schema.js";
import { appRouter } from "./routers.js";
import { injectDynamicSEO } from "./_core/seoInjector.js";
import type { TrpcContext } from "./_core/context.js";

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
  const html =
    '<html><head><title>Home</title><meta name="description" content="home" />' +
    '<link rel="canonical" href="https://www.gokulkp.com" /></head>' +
    "<body><!--fallback:start--><h1>Home</h1><!--fallback:end--></body></html>";

  it("does not leak draft titles and returns 404 for them", async () => {
    for (const url of ["/blogs/secret-draft", "/marketing/draft-project"]) {
      const result = await injectDynamicSEO(url, html);
      expect(result.status).toBe(404);
      expect(result.html).not.toContain("Secret draft");
      expect(result.html).not.toContain("Draft project");
      expect(result.html).toContain('content="noindex, nofollow"');
    }
  });

  it("returns 404 for unknown slugs", async () => {
    expect((await injectDynamicSEO("/blogs/nope", html)).status).toBe(404);
    expect((await injectDynamicSEO("/portfolio/video/nope", html)).status).toBe(404);
  });

  it("injects published content with its own canonical and body", async () => {
    const result = await injectDynamicSEO("/marketing/live-project?utm=x", html);
    expect(result.status).toBe(200);
    expect(result.html).toContain("<title data-static-seo>Live project | Gokul KP</title>");
    expect(result.html).toContain('<link rel="canonical" href="https://www.gokulkp.com/marketing/live-project" data-static-seo />');
    expect(result.html).toContain("<h1>Live project</h1>");
    expect(result.html).not.toContain("<h1>Home</h1>");
  });

  it("falls back to the static case-study data", async () => {
    const result = await injectDynamicSEO("/marketing/aureum-asset-management", html);
    expect(result.status).toBe(200);
    expect(result.html).toContain("Aureum");
  });

  it("escapes HTML in titles", async () => {
    await db.insert(blogs).values({ title: 'Quote " <script>alert(1)</script> $&', slug: "xss", published: true });
    const result = await injectDynamicSEO("/blogs/xss", html);
    expect(result.html).not.toContain("<script>alert(1)</script>");
    expect(result.html).toContain("&lt;script&gt;");
    expect(result.html).toContain("$&amp;");
  });
});
