import { resolveApiBaseUrl } from "@/lib/apiBaseUrl";
import { handleUnauthorized } from "@/lib/authToken";

const API_BASE_URL = resolveApiBaseUrl();

export async function recordPageView(path: string): Promise<void> {
  let normalized = path.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  try {
    await fetch(`${API_BASE_URL}/api/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: normalized }),
    });
  } catch (_err) {
    // Intentionally silent so visit tracking never breaks page flow.
  }
}

export interface TrafficStats {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  topPages: { path: string; count: number }[];
  last30Days: { dayKey: string; label: string; count: number }[];
  last12Months: { monthKey: string; label: string; count: number }[];
}

export async function fetchTrafficStats(token: string): Promise<TrafficStats> {
  const res = await fetch(`${API_BASE_URL}/api/analytics/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("Session expired");
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch traffic stats: ${res.status}`);
  }
  return res.json();
}
