/** Strip wrapping quotes and trailing slash (common .env mistake). */
function normalizeApiBase(raw: string | undefined): string {
  if (raw == null || raw === "") return "";
  let s = String(raw).trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s.replace(/\/$/, "");
}

/**
 * In dev, always use same-origin `/api` so Vite proxies to the backend (avoids CORS and bad env URLs).
 * Proxy target comes from vite.config (defaults to http://127.0.0.1:5000).
 * In production, set VITE_API_BASE_URL at build time to your API origin (no trailing slash).
 */
export function resolveApiBaseUrl(): string {
  if (import.meta.env.DEV) {
    return "";
  }
  return normalizeApiBase(import.meta.env.VITE_API_BASE_URL || import.meta.env.BACKEND_URL);
}
