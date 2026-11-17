import { describe, expect, it, vi } from "vitest";

// Never write test leads into the real (possibly production) database.
vi.mock("./db", async () => (await import("./test/memoryDb")).createMemoryDbModule());

import { appRouter } from "./routers";
import { CONTACT_MAX_PER_IP } from "./contactRouter";
import type { TrpcContext } from "./_core/context";

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {
        "x-forwarded-proto": "https",
      },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("successfully validates and accepts a well-formed inquiry", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const testPayload = {
      name: "Synthetic Test Client",
      email: "test.synthetic@example.com",
      service: "High-End Video Production",
      details: "Synthetic inquiry for automated regression testing.",
      clientTimestamp: Date.now() - 5000,
    };

    const response = await caller.contact.submit(testPayload);
    expect(response.success).toBe(true);
  });

  it("safely blocks bot submission when honeypot field is populated", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const botPayload = {
      name: "Spam Bot",
      email: "spambot@example.com",
      service: "High-End Video Production",
      details: "Spam message",
      websiteHoneypot: "http://malicious-spam.com",
      clientTimestamp: Date.now() - 5000,
    };

    const response = await caller.contact.submit(botPayload);
    expect(response.success).toBe(true);
    expect(response.message).toBe("Inquiry received");
  });

  it("rejects submissions with invalid email formats", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const invalidPayload = {
      name: "Valid Name",
      email: "not-an-email",
      service: "High-End Video Production",
      details: "Details",
    };

    await expect(caller.contact.submit(invalidPayload)).rejects.toThrow();
  });

  it("rate-limits repeated submissions from one IP on the server", async () => {
    const ctx = createMockContext();
    (ctx.req.headers as Record<string, string>)["x-real-ip"] = "192.0.2.50";
    const caller = appRouter.createCaller(ctx);
    const payload = {
      name: "Repeat Sender",
      email: "repeat@example.com",
      service: "Performance Marketing",
      clientTimestamp: Date.now() - 5000,
    };
    for (let i = 0; i < CONTACT_MAX_PER_IP; i++) {
      expect((await caller.contact.submit(payload)).success).toBe(true);
    }
    await expect(caller.contact.submit(payload)).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
  });

  it("emails the lead through Resend when configured", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    try {
      const ctx = createMockContext();
      (ctx.req.headers as Record<string, string>)["x-real-ip"] = "192.0.2.51";
      await appRouter.createCaller(ctx).contact.submit({
        name: "Email Lead",
        email: "lead@example.com",
        service: "Video Production",
        details: "<b>hi</b>",
        clientTimestamp: Date.now() - 5000,
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
      expect(url).toBe("https://api.resend.com/emails");
      const body = JSON.parse(String(init.body));
      expect(body.reply_to).toBe("lead@example.com");
      expect(body.html).toContain("&lt;b&gt;hi&lt;/b&gt;");
    } finally {
      vi.unstubAllGlobals();
      vi.unstubAllEnvs();
    }
  });
});
