import { useEffect, useState } from "react";
import { BarChart3, Eye, CalendarDays, Globe, RefreshCw, Loader2 } from "lucide-react";
import { fetchTrafficStats, TrafficStats } from "@/lib/traffic";

const DashboardAnalyticsPanel = () => {
  const [tick, setTick] = useState(0);
  const [stats, setStats] = useState<TrafficStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadStats = async () => {
      setLoading(true);
      try {
        const data = await fetchTrafficStats();
        if (active) setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadStats();

    const onFocus = () => setTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    // Poll every 60s
    const id = window.setInterval(() => setTick((t) => t + 1), 60000);
    return () => {
      active = false;
      window.removeEventListener("focus", onFocus);
      window.clearInterval(id);
    };
  }, [tick]);

  if (loading && !stats) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) {
    return <div className="p-8 text-center text-muted-foreground">Failed to load analytics data.</div>;
  }

  const maxMonth = Math.max(1, ...stats.last12Months.map((m) => m.count));

  // Since the backend now supplies Jan-Dec of the current year in order, no need to reverse
  const twelveMonthsChart = [...stats.last12Months];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Traffic is collected from visitors on this site across all devices. Admin browsing is excluded. For full enterprise analytics,
          add <span className="font-mono text-foreground/90">Google Analytics</span> or{" "}
          <span className="font-mono text-foreground/90">Plausible</span>.
        </p>
        <button
          type="button"
          onClick={() => setTick((t) => t + 1)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary shrink-0"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg border border-border bg-card/40 card-gradient">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
            <Eye className="h-4 w-4" /> Total site views
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{stats.totalViews.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Past 365 days aggregated</p>
        </div>
        <div className="p-5 rounded-lg border border-border bg-card/40 card-gradient">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
            <CalendarDays className="h-4 w-4" /> Today
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{stats.todayViews.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">UTC Timezone</p>
        </div>
        <div className="p-5 rounded-lg border border-border bg-card/40 card-gradient">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
            <BarChart3 className="h-4 w-4" /> Last 7 days
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{stats.weekViews.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Rolling window including today</p>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border bg-card/40 card-gradient">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" /> One Year of Records
        </h3>
        <div className="flex items-end gap-2 h-40">
          {twelveMonthsChart.map((m) => (
            <div key={m.monthKey} className="flex-1 min-w-0 flex flex-col justify-end items-center gap-1 group">
              <div
                className="w-full max-w-[24px] mx-auto rounded-t bg-primary/80 group-hover:bg-primary transition-colors"
                style={{ height: `${(m.count / maxMonth) * 100}%`, minHeight: m.count > 0 ? "4px" : "0" }}
                title={`${m.label}: ${m.count}`}
              />
              <span className="text-xs text-muted-foreground truncate w-full text-center hidden sm:block">{m.label.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border bg-card/40 card-gradient">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" /> Top pages
        </h3>
        {stats.topPages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet. Browse the public site in another tab, then refresh.</p>
        ) : (
          <ul className="space-y-2">
            {stats.topPages.map((row, index) => (
              <li key={index} className="flex items-center justify-between gap-4 text-sm border-b border-border/60 pb-2 last:border-0 last:pb-0">
                <code className="font-mono text-foreground/90 truncate">{row.path || "/"}</code>
                <span className="tabular-nums text-muted-foreground shrink-0">{row.count.toLocaleString()} views</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalyticsPanel;
