export const COOKIE_NAME = "auth_token";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

/** Media uploads: allowed MIME types (mapped to the extension we store) and size cap. */
export const UPLOAD_MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "application/pdf": ".pdf",
};
/** Vercel functions accept ~4.5 MB request bodies; base64 adds ~33%, so cap files at 3 MB. */
export const UPLOAD_MAX_BYTES = 3 * 1024 * 1024;
