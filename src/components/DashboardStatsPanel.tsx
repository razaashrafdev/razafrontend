import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { getAuthToken } from "@/lib/authToken";
import { updateSiteStats, type SiteStats } from "@/lib/api";
import { useData } from "@/context/DataContext";

const STAT_FIELDS: { key: keyof SiteStats; label: string; hint: string }[] = [
  { key: "yearsExperience", label: "Years of Experience", hint: 'e.g. "1+" or "3+"' },
  { key: "projectsCompleted", label: "Projects Completed", hint: 'e.g. "10+" or "25+"' },
  { key: "happyClients", label: "Happy Clients", hint: 'e.g. "5+" or "12+"' },
];

const DashboardStatsPanel = () => {
  const { siteStats, setSiteStats, siteStatsLoading } = useData();
  const [form, setForm] = useState<SiteStats>({
    yearsExperience: "",
    projectsCompleted: "",
    happyClients: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteStats) {
      setForm({
        yearsExperience: siteStats.yearsExperience,
        projectsCompleted: siteStats.projectsCompleted,
        happyClients: siteStats.happyClients,
      });
    }
  }, [siteStats]);

  const inputClass =
    "w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  const handleSave = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    setSaving(true);
    try {
      const res = await updateSiteStats(form, token);
      setSiteStats(res.data);
      toast.success("Statistics updated");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save statistics";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (siteStatsLoading && !siteStats) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!siteStats) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Failed to load statistics. Make sure the API is running and try again.
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <p className="text-sm text-muted-foreground leading-relaxed">
        These values appear in the Hero section on the home page. They are stored in the database and loaded through the API.
      </p>

      <div className="p-6 border border-border rounded-lg card-gradient space-y-4">
        {STAT_FIELDS.map(({ key, label, hint }) => (
          <div key={key}>
            <label className="text-sm text-foreground block mb-1">{label}</label>
            <input
              value={form[key] ?? ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={hint}
              className={inputClass}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save statistics"}
        </button>
      </div>
    </div>
  );
};

export default DashboardStatsPanel;
