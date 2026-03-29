import { useEffect, useMemo, useState } from "react";
import { BarChart3, Eye, CalendarDays, Globe, RefreshCw } from "lucide-react";
import { getTrafficStats } from "@/lib/traffic";

const DashboardAnalyticsPanel = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onFocus = () => setTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    const id = window.setInterval(() => setTick((t) => t + 1), 15000);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(id);
    };
  }, []);

  const stats = useMemo(() => getTrafficStats(), [tick]);
  const maxDay = Math.max(1, ...stats.last14Days.map((d) => d.count));

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Traffic is collected from visitors on this site (each browser stores page views locally). Login and dashboard visits are not counted. For full analytics in production,
          add <span className="font-mono text-foreground/90">Google Analytics</span>, <span className="font-mono text-foreground/90">Plausible</span>, or{" "}
          <span className="font-mono text-foreground/90">Umami</span>.
        </p>
        <button
          type="button"
          onClick={() => setTick((t) => t + 1)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary shrink-0"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg border border-border bg-card/40 card-gradient">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
            <Eye className="h-4 w-4" /> Total page views
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{stats.totalViews.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Last 90 days (stored in this browser)</p>
        </div>
        <div className="p-5 rounded-lg border border-border bg-card/40 card-gradient">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2">
            <CalendarDays className="h-4 w-4" /> Today
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{stats.todayViews.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Since midnight (your local time)</p>
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
          <BarChart3 className="h-4 w-4 text-primary" /> Page views — last 14 days
        </h3>
        <div className="flex items-end gap-1 h-40">
          {stats.last14Days.map((d) => (
            <div key={d.dayKey} className="flex-1 min-w-0 flex flex-col justify-end items-center gap-1 group">
              <div
                className="w-full max-w-[28px] mx-auto rounded-t bg-primary/80 group-hover:bg-primary transition-colors"
                style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count > 0 ? "4px" : "0" }}
                title={`${d.label}: ${d.count}`}
              />
              <span className="text-[10px] text-muted-foreground truncate w-full text-center hidden sm:block">{d.label.split(" ")[0]}</span>
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
            {stats.topPages.map((row) => (
              <li key={row.path} className="flex items-center justify-between gap-4 text-sm border-b border-border/60 pb-2 last:border-0 last:pb-0">
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
