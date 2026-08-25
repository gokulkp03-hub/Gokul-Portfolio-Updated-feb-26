import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { apiLimiter } from "./limiters";
import { registerLoginRoutes } from "./login";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import path from "path";
import { generateSitemap } from "../sitemap";

// 2. JWT Validation Middleware: validates token on each request
const jwtValidationMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") 
    ? authHeader.substring(7) 
    : (req.headers.cookie?.includes("auth_token=") ? req.headers.cookie.split("auth_token=")[1].split(";")[0] : null);

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not configured");
      const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });
      (req as any).user = decoded; // Bind user to request
    } catch (err) {
      console.error("[Auth] JWT validation failed:", (err as Error).message);
    }
  }
  next();
};

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
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

  const app = express();
  app.set("trust proxy", 1);
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // 3. CORS Hardening: Strict origin whitelist based on ENV
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(",") 
    : ["http://localhost:5173", "http://localhost:3000"];

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
    credentials: true,
  }));

  // Apply JWT middleware globally
  app.use(jwtValidationMiddleware);

  // Apply Rate limiter to all API routes
  app.use("/api", apiLimiter);

  // Serve the local uploads directory directly so Vite / Express can resolve /uploads/...
  const uploadDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
  app.use("/uploads", express.static(uploadDir));

  // Local login route under /api/login
  registerLoginRoutes(app);
  // Sitemap dynamic generation
  app.get("/sitemap.xml", generateSitemap);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
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
