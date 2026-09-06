import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
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
});
