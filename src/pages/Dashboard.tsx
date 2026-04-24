import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, X, Save, FolderKanban, Wrench, Briefcase, LogOut, Menu, DollarSign, GraduationCap, BarChart3, Quote, Loader2, Mail } from "lucide-react";
import { useData, Project, Service, Experience, PricingPackage, Education, Testimonial } from "@/context/DataContext";
import { clearAuthToken, getAuthToken } from "@/lib/authToken";
import { createProject, updateProject, deleteProject, createService as apiCreateService, updateService as apiUpdateService, deleteService as apiDeleteService, createExperience as apiCreateExp, updateExperience as apiUpdateExp, deleteExperience as apiDeleteExp, createPricing as apiCreatePricing, updatePricing as apiUpdatePricing, deletePricing as apiDeletePricing, createEducation as apiCreateEdu, updateEducation as apiUpdateEdu, deleteEducation as apiDeleteEdu, createTestimonial as apiCreateTest, updateTestimonial as apiUpdateTest, deleteTestimonial as apiDeleteTest, fetchContactMessages, deleteContactMessage, type ContactMessage } from "@/lib/api";
import { toast } from "@/components/ui/sonner";
import ThemeToggle from "@/components/ThemeToggle";
import DashboardAnalyticsPanel from "@/components/DashboardAnalyticsPanel";

type Tab = "projects" | "services" | "experience" | "pricing" | "education" | "testimonials" | "contact-inbox" | "analytics";

const HOME_LIMIT_TOAST = "first remove one project from home to show this project in home page";

function projectShownOnHome(p: { showOnHome?: boolean }) {
  return p.showOnHome !== false;
}

function countOthersOnHome(projects: Project[], excludeId: string | null) {
  return projects.filter((p) => p.id !== excludeId && projectShownOnHome(p)).length;
}

const sidebarItems: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "services", label: "Services", icon: Wrench },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "pricing", label: "Pricing", icon: DollarSign },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "testimonials", label: "Testimonials", icon: Quote },
  { key: "contact-inbox", label: "Messages", icon: Mail },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects, setProjects, projectsLoading, services, setServices, servicesLoading, experiences, setExperiences, experiencesLoading, pricing, setPricing, pricingLoading, education, setEducation, educationLoading, testimonials, setTestimonials, testimonialsLoading } = useData();
  const [tab, setTab] = useState<Tab>("projects");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectTechInput, setProjectTechInput] = useState("");
  const [serviceSaving, setServiceSaving] = useState(false);
  const [expSaving, setExpSaving] = useState(false);
  const [pricingSaving, setPricingSaving] = useState(false);
  const [eduSaving, setEduSaving] = useState(false);
  const [testSaving, setTestSaving] = useState(false);
  const [homeToggleId, setHomeToggleId] = useState<string | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [contactMessagesLoading, setContactMessagesLoading] = useState(false);
  const [contactDeletingId, setContactDeletingId] = useState<string | null>(null);

  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({ title: "", description: "", tech: [], link: "", github: "", showOnHome: false });
  const [serviceForm, setServiceForm] = useState<Omit<Service, "id">>({ title: "", description: "", icon: "Code" });
  const [expForm, setExpForm] = useState<Omit<Experience, "id">>({ role: "", company: "", period: "", description: "", tech: [] });
  const [pricingForm, setPricingForm] = useState<Omit<PricingPackage, "id">>({ name: "", price: 0, description: "", features: [], featured: false, visible: true });
  const [eduForm, setEduForm] = useState<Omit<Education, "id">>({ title: "", org: "", year: "", description: "", type: "degree", visible: true });
  const [testimonialForm, setTestimonialForm] = useState<Omit<Testimonial, "id">>({ quote: "", name: "", role: "", visible: true });

  const resetForms = () => {
    setProjectForm({ title: "", description: "", tech: [], link: "", github: "", showOnHome: false });
    setProjectTechInput("");
    setServiceForm({ title: "", description: "", icon: "Code" });
    setExpForm({ role: "", company: "", period: "", description: "", tech: [] });
    setPricingForm({ name: "", price: 0, description: "", features: [], featured: false, visible: true });
    setEduForm({ title: "", org: "", year: "", description: "", type: "degree", visible: true });
    setTestimonialForm({ quote: "", name: "", role: "", visible: true });
    setEditingId(null);
    setShowForm(false);
  };

  useEffect(() => {
    if (tab !== "contact-inbox") return;
    const token = getAuthToken();
    if (!token) return;
    setContactMessagesLoading(true);
    fetchContactMessages(token)
      .then((res) => setContactMessages(res.data ?? []))
      .catch(() => {
        toast.error("Failed to load contact messages");
        setContactMessages([]);
      })
      .finally(() => setContactMessagesLoading(false));
  }, [tab]);

  const handleLogout = () => {
    clearAuthToken();
    toast.success("Logged out");
    navigate("/");
  };

  const handleSaveProject = async () => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    if (projectForm.showOnHome && countOthersOnHome(projects, editingId) >= 3) {
      toast.error(HOME_LIMIT_TOAST);
      return;
    }
    setProjectSaving(true);
    try {
      const techArray = projectTechInput.split(",").map((s) => s.trim()).filter(Boolean);
      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        tech: techArray,
        link: projectForm.link,
        github: projectForm.github,
        showOnHome: projectForm.showOnHome,
      };
      if (editingId) {
        const res = await updateProject(editingId, payload, token);
        setProjects(projects.map((p) => (p.id === editingId ? { ...res.data } : p)));
        toast.success("Project updated");
      } else {
        const res = await createProject(payload, token);
        setProjects([...projects, res.data]);
        toast.success("Project added");
      }
      resetForms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save project";
      toast.error(msg);
    } finally {
      setProjectSaving(false);
    }
  };

  const handleProjectHomeToggle = async (p: Project) => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    const on = projectShownOnHome(p);
    const next = !on;
    if (next && countOthersOnHome(projects, p.id) >= 3) {
      toast.error(HOME_LIMIT_TOAST);
      return;
    }
    setHomeToggleId(p.id);
    try {
      const res = await updateProject(p.id, { showOnHome: next }, token);
      setProjects(projects.map((x) => (x.id === p.id ? { ...res.data } : x)));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update";
      toast.error(msg);
    } finally {
      setHomeToggleId(null);
    }
  };
  const handleSaveService = async () => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    setServiceSaving(true);
    try {
      if (editingId) {
        const res = await apiUpdateService(editingId, serviceForm, token);
        setServices(services.map((s) => (s.id === editingId ? { ...res.data } : s)));
        toast.success("Service updated");
      } else {
        const res = await apiCreateService(serviceForm, token);
        setServices([...services, res.data]);
        toast.success("Service added");
      }
      resetForms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save service";
      toast.error(msg);
    } finally {
      setServiceSaving(false);
    }
  };
  const handleSaveExperience = async () => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    setExpSaving(true);
    try {
      if (editingId) {
        const res = await apiUpdateExp(editingId, expForm, token);
        setExperiences(experiences.map((e) => (e.id === editingId ? { ...res.data } : e)));
        toast.success("Experience updated");
      } else {
        const res = await apiCreateExp(expForm, token);
        setExperiences([...experiences, res.data]);
        toast.success("Experience added");
      }
      resetForms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save experience";
      toast.error(msg);
    } finally {
      setExpSaving(false);
    }
  };
  const handleSavePricing = async () => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    setPricingSaving(true);
    try {
      if (editingId) {
        const res = await apiUpdatePricing(editingId, pricingForm, token);
        setPricing(pricing.map((p) => (p.id === editingId ? { ...res.data } : p)));
        toast.success("Package updated");
      } else {
        const res = await apiCreatePricing(pricingForm, token);
        setPricing([...pricing, res.data]);
        toast.success("Package added");
      }
      resetForms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save package";
      toast.error(msg);
    } finally {
      setPricingSaving(false);
    }
  };
  const handleSaveEducation = async () => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    setEduSaving(true);
    try {
      if (editingId) {
        const res = await apiUpdateEdu(editingId, eduForm, token);
        setEducation(education.map((e) => (e.id === editingId ? { ...res.data } : e)));
        toast.success("Education updated");
      } else {
        const res = await apiCreateEdu(eduForm, token);
        setEducation([...education, res.data]);
        toast.success("Education added");
      }
      resetForms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save education";
      toast.error(msg);
    } finally {
      setEduSaving(false);
    }
  };
  const handleSaveTestimonial = async () => {
    const token = getAuthToken();
    if (!token) { toast.error("Not authenticated"); return; }
    setTestSaving(true);
    try {
      if (editingId) {
        const res = await apiUpdateTest(editingId, testimonialForm, token);
        setTestimonials(testimonials.map((t) => (t.id === editingId ? { ...res.data } : t)));
        toast.success("Testimonial updated");
      } else {
        const res = await apiCreateTest(testimonialForm, token);
        setTestimonials([...testimonials, res.data]);
        toast.success("Testimonial added");
      }
      resetForms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save testimonial";
      toast.error(msg);
    } finally {
      setTestSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} border-r border-border bg-card/50 flex flex-col transition-all duration-300 flex-shrink-0 h-screen sticky top-0`}>
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setTab(item.key); resetForms(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                tab === item.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-6 gap-4 flex-shrink-0">
          <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground capitalize">
            {tab === "analytics"
              ? "Analytics"
              : tab === "testimonials"
                ? "Testimonials"
                : tab === "contact-inbox"
                  ? "Contact messages"
                  : tab}
          </h1>
          <ThemeToggle className="ml-auto border border-border/60 bg-secondary/30" />
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <>
            {tab === "analytics" && <DashboardAnalyticsPanel />}

            {tab !== "analytics" && tab !== "contact-inbox" && !showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" /> Add{" "}
                {tab === "experience"
                  ? "Experience"
                  : tab === "services"
                    ? "Service"
                    : tab === "pricing"
                      ? "Package"
                      : tab === "education"
                        ? "Education"
                        : tab === "testimonials"
                          ? "Testimonial"
                          : "Project"}
              </button>
            )}

            {tab !== "analytics" && tab !== "contact-inbox" && showForm && (
                <div className="mb-8 p-6 border border-border rounded-lg card-gradient">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{editingId ? "Edit" : "Add"}</h3>
                    <button onClick={resetForms} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                  </div>

                  {tab === "projects" && (
                    <div className="space-y-4">
                      <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Project title" className={inputClass} />
                      <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Description" rows={3} className={`${inputClass} resize-none`} />
                      <input value={projectTechInput} onChange={(e) => setProjectTechInput(e.target.value)} placeholder="Tech stack (comma separated, e.g. React, Node.js)" className={inputClass} />
                      <div className="grid grid-cols-2 gap-4">
                        <input value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} placeholder="Live URL" className={inputClass} />
                        <input value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} placeholder="GitHub URL" className={inputClass} />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-foreground">Show on home page</label>
                        <button
                          type="button"
                          onClick={() => {
                            const next = !projectForm.showOnHome;
                            if (next && countOthersOnHome(projects, editingId) >= 3) {
                              toast.error(HOME_LIMIT_TOAST);
                              return;
                            }
                            setProjectForm({ ...projectForm, showOnHome: next });
                          }}
                          className={`relative w-10 h-5 rounded-full transition-colors ${projectForm.showOnHome ? "bg-primary" : "bg-secondary"}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${projectForm.showOnHome ? "translate-x-5" : ""}`} />
                        </button>
                      </div>
                      <button onClick={handleSaveProject} disabled={projectSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{projectSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {projectSaving ? "Saving…" : "Save"}</button>
                    </div>
                  )}

                  {tab === "services" && (
                    <div className="space-y-4">
                      <input value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="Service title" className={inputClass} />
                      <textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Description" rows={3} className={`${inputClass} resize-none`} />
                      <select value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} className={inputClass}>
                        {["Code", "Smartphone", "Layout", "Server", "Palette", "Database", "Cloud", "MessageSquare", "Plug", "ShieldCheck", "MessageCircle", "ShoppingCart"].map((ic) => (
                          <option key={ic} value={ic}>
                            {ic}
                          </option>
                        ))}
                      </select>
                      <button onClick={handleSaveService} disabled={serviceSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{serviceSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {serviceSaving ? "Saving…" : "Save"}</button>
                    </div>
                  )}

                  {tab === "experience" && (
                    <div className="space-y-4">
                      <input value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} placeholder="Role" className={inputClass} />
                      <input value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} placeholder="Company" className={inputClass} />
                      <input value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} placeholder="Period (e.g. 2022 — Present)" className={inputClass} />
                      <textarea value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} placeholder="Description" rows={3} className={`${inputClass} resize-none`} />
                      <input value={expForm.tech.join(", ")} onChange={(e) => setExpForm({ ...expForm, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="Tech used (comma separated)" className={inputClass} />
                      <button onClick={handleSaveExperience} disabled={expSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{expSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {expSaving ? "Saving…" : "Save"}</button>
                    </div>
                  )}

                  {tab === "pricing" && (
                    <div className="space-y-4">
                      <input value={pricingForm.name} onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })} placeholder="Package name" className={inputClass} />
                      <input type="number" value={pricingForm.price} onChange={(e) => setPricingForm({ ...pricingForm, price: parseInt(e.target.value) || 0 })} placeholder="Price" className={inputClass} />
                      <textarea value={pricingForm.description} onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })} placeholder="Description" rows={2} className={`${inputClass} resize-none`} />
                      <input value={pricingForm.features.join(", ")} onChange={(e) => setPricingForm({ ...pricingForm, features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="Features (comma separated)" className={inputClass} />
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <label className="text-sm text-foreground">Featured</label>
                          <button type="button" onClick={() => setPricingForm({ ...pricingForm, featured: !pricingForm.featured })} className={`relative w-10 h-5 rounded-full transition-colors ${pricingForm.featured ? "bg-primary" : "bg-secondary"}`}>
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${pricingForm.featured ? "translate-x-5" : ""}`} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-sm text-foreground">Visible</label>
                          <button type="button" onClick={() => setPricingForm({ ...pricingForm, visible: !pricingForm.visible })} className={`relative w-10 h-5 rounded-full transition-colors ${pricingForm.visible ? "bg-primary" : "bg-secondary"}`}>
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${pricingForm.visible ? "translate-x-5" : ""}`} />
                          </button>
                        </div>
                      </div>
                      <button onClick={handleSavePricing} disabled={pricingSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{pricingSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {pricingSaving ? "Saving…" : "Save"}</button>
                    </div>
                  )}

                  {tab === "education" && (
                    <div className="space-y-4">
                      <input value={eduForm.title} onChange={(e) => setEduForm({ ...eduForm, title: e.target.value })} placeholder="Title (e.g. B.S. Computer Science)" className={inputClass} />
                      <input value={eduForm.org} onChange={(e) => setEduForm({ ...eduForm, org: e.target.value })} placeholder="Organization" className={inputClass} />
                      <input value={eduForm.year} onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })} placeholder="Year" className={inputClass} />
                      <textarea value={eduForm.description} onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })} placeholder="Description" rows={2} className={`${inputClass} resize-none`} />
                      <select value={eduForm.type} onChange={(e) => setEduForm({ ...eduForm, type: e.target.value as "degree" | "certification" })} className={inputClass}>
                        <option value="degree">Degree</option>
                        <option value="certification">Certification</option>
                      </select>
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-foreground">Visible</label>
                        <button type="button" onClick={() => setEduForm({ ...eduForm, visible: !eduForm.visible })} className={`relative w-10 h-5 rounded-full transition-colors ${eduForm.visible ? "bg-primary" : "bg-secondary"}`}>
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${eduForm.visible ? "translate-x-5" : ""}`} />
                        </button>
                      </div>
                      <button onClick={handleSaveEducation} disabled={eduSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{eduSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {eduSaving ? "Saving…" : "Save"}</button>
                    </div>
                  )}

                  {tab === "testimonials" && (
                    <div className="space-y-4">
                      <textarea value={testimonialForm.quote} onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} placeholder="Quote" rows={4} className={`${inputClass} resize-none`} />
                      <input value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="Client name" className={inputClass} />
                      <input value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="Role / Company" className={inputClass} />
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-foreground">Visible on site</label>
                        <button type="button" onClick={() => setTestimonialForm({ ...testimonialForm, visible: !testimonialForm.visible })} className={`relative w-10 h-5 rounded-full transition-colors ${testimonialForm.visible ? "bg-primary" : "bg-secondary"}`}>
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${testimonialForm.visible ? "translate-x-5" : ""}`} />
                        </button>
                      </div>
                      <button onClick={handleSaveTestimonial} disabled={testSaving} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{testSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {testSaving ? "Saving…" : "Save"}</button>
                    </div>
                  )}
                </div>
            )}

            {/* Lists */}
            {tab !== "analytics" && (
            <div className="space-y-4">
                {tab === "contact-inbox" && (
                  <div className="flex justify-end mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        setContactMessagesLoading(true);
                        fetchContactMessages(token)
                          .then((res) => setContactMessages(res.data ?? []))
                          .catch(() => toast.error("Failed to refresh"))
                          .finally(() => setContactMessagesLoading(false));
                      }}
                      disabled={contactMessagesLoading}
                      className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
                    >
                      Refresh
                    </button>
                  </div>
                )}

                {tab === "contact-inbox" && contactMessagesLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Loading messages…</span>
                  </div>
                )}

                {tab === "contact-inbox" && !contactMessagesLoading && contactMessages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No messages yet. Submissions from the Contact page will appear here.</p>
                )}

                {tab === "contact-inbox" && !contactMessagesLoading &&
                  contactMessages.map((m) => (
                    <div key={m.id} className="flex gap-4 p-4 border border-border rounded-lg card-gradient text-left">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                          <div className="flex flex-wrap items-baseline gap-2 min-w-0">
                            <span className="font-medium text-foreground">{m.name}</span>
                            <a href={`mailto:${m.email}`} className="text-sm text-primary hover:underline truncate">
                              {m.email}
                            </a>
                          </div>
                          {m.createdAt && (
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(m.createdAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {m.subject ? <p className="text-sm font-medium text-foreground/90 mb-2">{m.subject}</p> : null}
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{m.message}</p>
                      </div>
                      <button
                        type="button"
                        disabled={contactDeletingId === m.id}
                        onClick={async () => {
                          const token = getAuthToken();
                          if (!token) { toast.error("Not authenticated"); return; }
                          setContactDeletingId(m.id);
                          try {
                            await deleteContactMessage(m.id, token);
                            setContactMessages(contactMessages.filter((x) => x.id !== m.id));
                            toast.success("Message deleted");
                          } catch (err: unknown) {
                            const msg = err instanceof Error ? err.message : "Failed to delete";
                            toast.error(msg);
                          } finally {
                            setContactDeletingId(null);
                          }
                        }}
                        className="p-2 h-fit text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 disabled:opacity-50"
                        aria-label="Delete message"
                      >
                        {contactDeletingId === m.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </div>
                  ))}

                {tab === "projects" && projectsLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Loading projects…</span>
                  </div>
                )}

                {tab === "projects" && !projectsLoading && projects.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No projects yet. Click "Add Project" to create one.</p>
                )}

                {tab === "projects" && !projectsLoading && projects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg card-gradient">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{p.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">Home</span>
                      <button
                        type="button"
                        disabled={homeToggleId === p.id}
                        onClick={() => void handleProjectHomeToggle(p)}
                        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 disabled:opacity-50 ${projectShownOnHome(p) ? "bg-primary" : "bg-secondary"}`}
                        aria-label={projectShownOnHome(p) ? "Remove from home page" : "Show on home page"}
                      >
                        {homeToggleId === p.id ? (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-3 w-3 animate-spin text-primary-foreground" />
                          </span>
                        ) : (
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${projectShownOnHome(p) ? "translate-x-5" : ""}`} />
                        )}
                      </button>
                      <button onClick={() => { setProjectForm({ title: p.title, description: p.description, tech: p.tech, link: p.link ?? "", github: p.github ?? "", showOnHome: projectShownOnHome(p) }); setProjectTechInput(p.tech.join(", ")); setEditingId(p.id); setShowForm(true); toast("Editing project"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={async () => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        try {
                          await deleteProject(p.id, token);
                          setProjects(projects.filter((x) => x.id !== p.id));
                          toast.success("Project deleted");
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Failed to delete";
                          toast.error(msg);
                        }
                      }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "services" && servicesLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Loading services…</span>
                  </div>
                )}

                {tab === "services" && !servicesLoading && services.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No services yet. Click "Add Service" to create one.</p>
                )}

                {tab === "services" && !servicesLoading && services.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div>
                      <h4 className="font-medium text-foreground">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.description.slice(0, 80)}...</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setServiceForm({ title: s.title, description: s.description, icon: s.icon }); setEditingId(s.id); setShowForm(true); toast("Editing service"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={async () => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        try {
                          await apiDeleteService(s.id, token);
                          setServices(services.filter((x) => x.id !== s.id));
                          toast.success("Service deleted");
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Failed to delete";
                          toast.error(msg);
                        }
                      }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "experience" && experiencesLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2"><Loader2 className="h-5 w-5 animate-spin" /><span className="text-sm">Loading experiences…</span></div>
                )}
                {tab === "experience" && !experiencesLoading && experiences.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No experiences yet. Click "Add Experience" to create one.</p>
                )}
                {tab === "experience" && !experiencesLoading && experiences.map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div>
                      <h4 className="font-medium text-foreground">{e.role}</h4>
                      <p className="text-sm text-primary/80">{e.company} · {e.period}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setExpForm({ role: e.role, company: e.company, period: e.period, description: e.description, tech: e.tech }); setEditingId(e.id); setShowForm(true); toast("Editing experience"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={async () => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        try {
                          await apiDeleteExp(e.id, token);
                          setExperiences(experiences.filter((x) => x.id !== e.id));
                          toast.success("Experience deleted");
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Failed to delete";
                          toast.error(msg);
                        }
                      }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "pricing" && pricingLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2"><Loader2 className="h-5 w-5 animate-spin" /><span className="text-sm">Loading pricing…</span></div>
                )}
                {tab === "pricing" && !pricingLoading && pricing.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No packages yet. Click "Add Package" to create one.</p>
                )}
                {tab === "pricing" && !pricingLoading && pricing.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{p.name}</h4>
                        <span className="text-sm font-bold text-gradient">${p.price}</span>
                        {p.featured && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">Featured</span>}
                        {p.visible === false && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Hidden</span>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <button onClick={() => { setPricingForm({ name: p.name, price: p.price, description: p.description, features: p.features, featured: p.featured, visible: p.visible }); setEditingId(p.id); setShowForm(true); toast("Editing package"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={async () => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        try {
                          await apiDeletePricing(p.id, token);
                          setPricing(pricing.filter((x) => x.id !== p.id));
                          toast.success("Package deleted");
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Failed to delete";
                          toast.error(msg);
                        }
                      }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "education" && educationLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2"><Loader2 className="h-5 w-5 animate-spin" /><span className="text-sm">Loading education…</span></div>
                )}
                {tab === "education" && !educationLoading && education.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No education entries yet. Click "Add Education" to create one.</p>
                )}
                {tab === "education" && !educationLoading && education.map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{e.title}</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{e.type}</span>
                        {e.visible === false && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Hidden</span>}
                      </div>
                      <p className="text-sm text-primary/80">{e.org} · {e.year}</p>
                    </div>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <button onClick={() => { setEduForm({ title: e.title, org: e.org, year: e.year, description: e.description, type: e.type, visible: e.visible }); setEditingId(e.id); setShowForm(true); toast("Editing education"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={async () => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        try {
                          await apiDeleteEdu(e.id, token);
                          setEducation(education.filter((x) => x.id !== e.id));
                          toast.success("Education deleted");
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Failed to delete";
                          toast.error(msg);
                        }
                      }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "testimonials" && testimonialsLoading && (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2"><Loader2 className="h-5 w-5 animate-spin" /><span className="text-sm">Loading testimonials…</span></div>
                )}
                {tab === "testimonials" && !testimonialsLoading && testimonials.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-10">No testimonials yet. Click "Add Testimonial" to create one.</p>
                )}
                {tab === "testimonials" && !testimonialsLoading && testimonials.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-foreground">{t.name}</h4>
                        <span className="text-xs text-primary/80">{t.role}</span>
                        {t.visible === false && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Hidden</span>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">&ldquo;{t.quote}&rdquo;</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { setTestimonialForm({ quote: t.quote, name: t.name, role: t.role, visible: t.visible }); setEditingId(t.id); setShowForm(true); toast("Editing testimonial"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={async () => {
                        const token = getAuthToken();
                        if (!token) { toast.error("Not authenticated"); return; }
                        try {
                          await apiDeleteTest(t.id, token);
                          setTestimonials(testimonials.filter((x) => x.id !== t.id));
                          toast.success("Testimonial deleted");
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Failed to delete";
                          toast.error(msg);
                        }
                      }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
            </div>
            )}
          </>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
