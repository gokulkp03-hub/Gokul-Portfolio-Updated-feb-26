export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // No fallbacks: missing admin credentials must disable login, never default to a guessable value.
  adminUsername: process.env.ADMIN_USERNAME ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  // Preferred: scrypt hash produced by `pnpm hash-password` (format: scrypt$<saltHex>$<hashHex>).
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH ?? "",
};
