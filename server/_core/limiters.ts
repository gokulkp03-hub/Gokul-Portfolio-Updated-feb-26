import rateLimit, { Options } from "express-rate-limit";

// Centralized store preparation (Memory by default, Redis ready)
// To swap to Redis in production: const store = new RedisStore({ client: redisClient });
const store = undefined;

const createLimiter = (options: Partial<Options>) => rateLimit({
  store,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
  ...options
});

export const apiLimiter = createLimiter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "60000", 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
});

export const loginIpLimiter = createLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, please try again later." },
});

export const loginIdentifierLimiter = createLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, please try again later." },
  keyGenerator: (req) => {
    // Throttle by identifier to prevent distributed brute-force on a single account
    return req.body?.username || req.body?.email || "unknown_user";
  }
});
