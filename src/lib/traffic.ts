import { resolveApiBaseUrl } from "@/lib/apiBaseUrl";

const API_BASE_URL = resolveApiBaseUrl();

export async function recordPageView(path: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/api/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
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

export async function fetchTrafficStats(): Promise<TrafficStats> {
  const res = await fetch(`${API_BASE_URL}/api/analytics/stats`);
  if (!res.ok) {
    throw new Error(`Failed to fetch traffic stats: ${res.status}`);
  }
  return res.json();
}
