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

// server/prisma-db.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
var globalForPrisma = globalThis;
var adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
var prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// server/db.ts
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  try {
    const data = {
      openId: user.openId,
      name: user.name,
      email: user.email,
      loginMethod: user.loginMethod,
      role: user.role,
      lastSignedIn: user.lastSignedIn || /* @__PURE__ */ new Date()
    };
    await prisma.user.upsert({
      where: { openId: user.openId },
      update: data,
      create: data
    });
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
var projectRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.project.findMany({
      where: { status: "published" },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" }
      ]
    });
  }),
  adminList: adminProcedure.query(async () => {
    return prisma.project.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" }
      ]
    });
  }),
  getById: publicProcedure.input(z2.string()).query(async ({ input }) => {
    return prisma.project.findUnique({
      where: { id: input }
    });
  }),
  getBySlug: publicProcedure.input(z2.string()).query(async ({ input }) => {
    return prisma.project.findUnique({
      where: { slug: input }
    });
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
      status: z2.enum(["draft", "published", "scheduled"]).default("draft"),
      featured: z2.boolean().default(false),
      sortOrder: z2.number().default(0),
      publishDate: z2.date().optional()
    })
  ).mutation(async ({ input }) => {
    return prisma.project.create({
      data: {
        ...input,
        tags: input.tags || [],
        gallery: input.gallery || [],
        results: input.results || [],
        tools: input.tools || []
      }
    });
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
      status: z2.enum(["draft", "published", "scheduled"]).optional(),
      featured: z2.boolean().optional(),
      sortOrder: z2.number().optional(),
      publishDate: z2.date().optional()
    })
  ).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return prisma.project.update({
      where: { id },
      data
    });
  }),
  delete: adminProcedure.input(z2.string()).mutation(async ({ input }) => {
    return prisma.project.delete({
      where: { id: input }
    });
  })
});

// server/contentRouter.ts
import { z as z3 } from "zod";
var contentRouter = router({
  get: publicProcedure.query(async () => {
    let content = await prisma.siteContent.findFirst({
      where: { id: 1 }
    });
    if (!content) {
      content = await prisma.siteContent.create({
        data: { id: 1 }
      });
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
    return prisma.siteContent.upsert({
      where: { id: 1 },
      update: input,
      create: { id: 1, ...input }
    });
  })
});

// server/mediaRouter.ts
import { z as z4 } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
var mediaRouter = router({
  list: adminProcedure.query(async () => {
    return prisma.media.findMany({
      orderBy: { createdAt: "desc" }
    });
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
    const uniqueName = crypto.randomUUID() + ext;
    const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);
    const url = `/uploads/${uniqueName}`;
    return prisma.media.create({
      data: {
        url,
        type: input.fileType,
        width: input.width,
        height: input.height
      }
    });
  }),
  addExternal: adminProcedure.input(
    z4.object({
      url: z4.string(),
      type: z4.string(),
      // e.g., 'video/embed'
      title: z4.string().optional()
    })
  ).mutation(async ({ input }) => {
    return prisma.media.create({
      data: {
        url: input.url,
        type: input.type
      }
    });
  }),
  delete: adminProcedure.input(z4.string()).mutation(async ({ input }) => {
    const media = await prisma.media.findUnique({ where: { id: input } });
    if (!media) return;
    if (media.url.startsWith("/uploads/")) {
      const fileName = media.url.replace("/uploads/", "");
      const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, fileName);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.error("Failed to delete local file:", err);
      }
    }
    return prisma.media.delete({
      where: { id: input }
    });
  })
});

// server/contactRouter.ts
import { z as z5 } from "zod";
var contactRouter = router({
  submit: publicProcedure.input(z5.object({
    name: z5.string().min(1),
    email: z5.string().email(),
    service: z5.string(),
    details: z5.string().optional()
  })).mutation(async ({ input }) => {
    return await prisma.contactSubmission.create({ data: input });
  }),
  list: adminProcedure.query(async () => {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" }
    });
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
  contact: contactRouter
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
  app.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
import path4 from "path";
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
