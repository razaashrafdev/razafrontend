const AUTH_TOKEN_KEY = "portfolio_auth_token";

let expiryTimer: ReturnType<typeof setTimeout> | null = null;

function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const data = JSON.parse(json) as { exp?: number };
    return typeof data.exp === "number" ? data.exp : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const exp = decodeJwtExp(token);
  if (!exp) return true;
  return Date.now() >= exp * 1000;
}

function clearExpiryTimer() {
  if (expiryTimer) {
    clearTimeout(expiryTimer);
    expiryTimer = null;
  }
}

export function readAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function clearAuthToken() {
  clearExpiryTimer();
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function logoutDueToExpiry() {
  clearAuthToken();
  if (!window.location.pathname.startsWith("/login")) {
    window.location.assign("/login?expired=1");
  }
}

/** Clears session and redirects when an authenticated API call returns 401. */
export function handleUnauthorized() {
  logoutDueToExpiry();
}

export function scheduleTokenExpiry(token: string) {
  clearExpiryTimer();
  const exp = decodeJwtExp(token);
  if (!exp) return;

  const msUntilExpiry = exp * 1000 - Date.now();
  if (msUntilExpiry <= 0) {
    logoutDueToExpiry();
    return;
  }

  expiryTimer = setTimeout(logoutDueToExpiry, msUntilExpiry);
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  scheduleTokenExpiry(token);
}

export function getAuthToken(): string | null {
  const token = readAuthToken();
  if (!token) return null;
  if (isTokenExpired(token)) {
    logoutDueToExpiry();
    return null;
  }
  return token;
}

export function initAuthSession() {
  const token = readAuthToken();
  if (!token) return;
  if (isTokenExpired(token)) {
    logoutDueToExpiry();
    return;
  }
  scheduleTokenExpiry(token);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === AUTH_TOKEN_KEY && !event.newValue) {
      clearExpiryTimer();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.assign("/login?expired=1");
      }
    }
  });
}
