const STORAGE_KEY = "portfolio_traffic_v1";
const MAX_EVENTS = 8000;
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000;

export interface PageView {
  path: string;
  at: number;
}

function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function load(): PageView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as PageView[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function persist(visits: PageView[]) {
  const cutoff = Date.now() - RETENTION_MS;
  const pruned = visits.filter((v) => v.at >= cutoff).slice(-MAX_EVENTS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
}

export function recordPageView(path: string): void {
  const visits = load();
  visits.push({ path, at: Date.now() });
  persist(visits);
}

export interface TrafficStats {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  topPages: { path: string; count: number }[];
  last14Days: { dayKey: string; label: string; count: number }[];
}

export function getTrafficStats(): TrafficStats {
  const visits = load();

  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const startWeek = new Date();
  startWeek.setHours(0, 0, 0, 0);
  startWeek.setDate(startWeek.getDate() - 6);

  const totalViews = visits.length;
  const todayViews = visits.filter((v) => v.at >= startToday.getTime()).length;
  const weekViews = visits.filter((v) => v.at >= startWeek.getTime()).length;

  const pathCounts: Record<string, number> = {};
  for (const v of visits) {
    pathCounts[v.path] = (pathCounts[v.path] ?? 0) + 1;
  }
  const topPages = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  const dayTotals: Record<string, number> = {};
  for (const v of visits) {
    const k = localDayKey(new Date(v.at));
    dayTotals[k] = (dayTotals[k] ?? 0) + 1;
  }

  const last14Days: TrafficStats["last14Days"] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const dayKey = localDayKey(d);
    last14Days.push({
      dayKey,
      label: d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
      count: dayTotals[dayKey] ?? 0,
    });
  }

  return { totalViews, todayViews, weekViews, topPages, last14Days };
}
