import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, X, Save, FolderKanban, Wrench, Briefcase, LogOut, Menu, DollarSign, GraduationCap } from "lucide-react";
import { useData, Project, Service, Experience, PricingPackage, Education } from "@/context/DataContext";
import { clearAuthToken } from "@/lib/authToken";
import { toast } from "@/components/ui/sonner";
import ThemeToggle from "@/components/ThemeToggle";

type Tab = "projects" | "services" | "experience" | "pricing" | "education";

const sidebarItems: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "services", label: "Services", icon: Wrench },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "pricing", label: "Pricing", icon: DollarSign },
  { key: "education", label: "Education", icon: GraduationCap },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects, setProjects, services, setServices, experiences, setExperiences, pricing, setPricing, education, setEducation } = useData();
  const [tab, setTab] = useState<Tab>("projects");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>({ title: "", description: "", tech: [], link: "", github: "", showOnHome: true, displayOrder: 1 });
  const [serviceForm, setServiceForm] = useState<Omit<Service, "id">>({ title: "", description: "", icon: "Code" });
  const [expForm, setExpForm] = useState<Omit<Experience, "id">>({ role: "", company: "", period: "", description: "", tech: [] });
  const [pricingForm, setPricingForm] = useState<Omit<PricingPackage, "id">>({ name: "", price: 0, description: "", features: [], featured: false, visible: true });
  const [eduForm, setEduForm] = useState<Omit<Education, "id">>({ title: "", org: "", year: "", description: "", type: "degree", visible: true });

  const resetForms = () => {
    setProjectForm({ title: "", description: "", tech: [], link: "", github: "", showOnHome: true, displayOrder: 1 });
    setServiceForm({ title: "", description: "", icon: "Code" });
    setExpForm({ role: "", company: "", period: "", description: "", tech: [] });
    setPricingForm({ name: "", price: 0, description: "", features: [], featured: false, visible: true });
    setEduForm({ title: "", org: "", year: "", description: "", type: "degree", visible: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    clearAuthToken();
    toast.success("Logged out");
    navigate("/");
  };

  const handleSaveProject = () => {
    if (editingId) setProjects(projects.map((p) => (p.id === editingId ? { ...projectForm, id: editingId } : p)));
    else setProjects([...projects, { ...projectForm, id: Date.now().toString() }]);
    toast.success(editingId ? "Project updated" : "Project added");
    resetForms();
  };
  const handleSaveService = () => {
    if (editingId) setServices(services.map((s) => (s.id === editingId ? { ...serviceForm, id: editingId } : s)));
    else setServices([...services, { ...serviceForm, id: Date.now().toString() }]);
    toast.success(editingId ? "Service updated" : "Service added");
    resetForms();
  };
  const handleSaveExperience = () => {
    if (editingId) setExperiences(experiences.map((e) => (e.id === editingId ? { ...expForm, id: editingId } : e)));
    else setExperiences([...experiences, { ...expForm, id: Date.now().toString() }]);
    toast.success(editingId ? "Experience updated" : "Experience added");
    resetForms();
  };
  const handleSavePricing = () => {
    if (editingId) setPricing(pricing.map((p) => (p.id === editingId ? { ...pricingForm, id: editingId } : p)));
    else setPricing([...pricing, { ...pricingForm, id: Date.now().toString() }]);
    toast.success(editingId ? "Package updated" : "Package added");
    resetForms();
  };
  const handleSaveEducation = () => {
    if (editingId) setEducation(education.map((e) => (e.id === editingId ? { ...eduForm, id: editingId } : e)));
    else setEducation([...education, { ...eduForm, id: Date.now().toString() }]);
    toast.success(editingId ? "Education updated" : "Education added");
    resetForms();
  };

  const inputClass = "w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} border-r border-border bg-card/50 flex flex-col transition-all duration-300 flex-shrink-0 h-screen sticky top-0`}>
        <div className="p-6 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">Dashboard</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage your portfolio</p>
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
          <h1 className="text-lg font-semibold text-foreground capitalize">{tab}</h1>
          <ThemeToggle className="ml-auto border border-border/60 bg-secondary/30" />
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <>
            {!showForm && (
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
                        : "Project"}
              </button>
            )}

            {showForm && (
                <div className="mb-8 p-6 border border-border rounded-lg card-gradient">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{editingId ? "Edit" : "Add"}</h3>
                    <button onClick={resetForms} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                  </div>

                  {tab === "projects" && (
                    <div className="space-y-4">
                      <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Project title" className={inputClass} />
                      <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Description" rows={3} className={`${inputClass} resize-none`} />
                      <input value={projectForm.tech.join(", ")} onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="Tech stack (comma separated)" className={inputClass} />
                      <div className="grid grid-cols-2 gap-4">
                        <input value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} placeholder="Live URL" className={inputClass} />
                        <input value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} placeholder="GitHub URL" className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <label className="text-sm text-foreground">Show on homepage</label>
                          <button type="button" onClick={() => setProjectForm({ ...projectForm, showOnHome: !projectForm.showOnHome })} className={`relative w-10 h-5 rounded-full transition-colors ${projectForm.showOnHome ? "bg-primary" : "bg-secondary"}`}>
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${projectForm.showOnHome ? "translate-x-5" : ""}`} />
                          </button>
                        </div>
                        <div>
                          <label className="text-sm text-foreground block mb-1">Display Order</label>
                          <input type="number" min={1} value={projectForm.displayOrder ?? 1} onChange={(e) => setProjectForm({ ...projectForm, displayOrder: parseInt(e.target.value) || 1 })} className={inputClass} />
                        </div>
                      </div>
                      <button onClick={handleSaveProject} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"><Save className="h-4 w-4" /> Save</button>
                    </div>
                  )}

                  {tab === "services" && (
                    <div className="space-y-4">
                      <input value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="Service title" className={inputClass} />
                      <textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Description" rows={3} className={`${inputClass} resize-none`} />
                      <select value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} className={inputClass}>
                        {["Code", "Smartphone", "Layout", "Server", "Palette", "Database", "Cloud", "MessageSquare", "Plug", "ShieldCheck", "MessageCircle"].map((ic) => (
                          <option key={ic} value={ic}>
                            {ic}
                          </option>
                        ))}
                      </select>
                      <button onClick={handleSaveService} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"><Save className="h-4 w-4" /> Save</button>
                    </div>
                  )}

                  {tab === "experience" && (
                    <div className="space-y-4">
                      <input value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} placeholder="Role" className={inputClass} />
                      <input value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} placeholder="Company" className={inputClass} />
                      <input value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} placeholder="Period (e.g. 2022 — Present)" className={inputClass} />
                      <textarea value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} placeholder="Description" rows={3} className={`${inputClass} resize-none`} />
                      <input value={expForm.tech.join(", ")} onChange={(e) => setExpForm({ ...expForm, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="Tech used (comma separated)" className={inputClass} />
                      <button onClick={handleSaveExperience} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"><Save className="h-4 w-4" /> Save</button>
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
                      <button onClick={handleSavePricing} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"><Save className="h-4 w-4" /> Save</button>
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
                      <button onClick={handleSaveEducation} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"><Save className="h-4 w-4" /> Save</button>
                    </div>
                  )}
                </div>
            )}

            {/* Lists */}
            <div className="space-y-4">
                {tab === "projects" && projects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{p.title}</h4>
                        {p.showOnHome && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">Homepage</span>}
                        {p.displayOrder && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">#{p.displayOrder}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <button onClick={() => { setProjectForm({ title: p.title, description: p.description, tech: p.tech, link: p.link, github: p.github, showOnHome: p.showOnHome ?? true, displayOrder: p.displayOrder ?? 1 }); setEditingId(p.id); setShowForm(true); toast("Editing project"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { setProjects(projects.filter((x) => x.id !== p.id)); toast.success("Project deleted"); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "services" && services.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div>
                      <h4 className="font-medium text-foreground">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.description.slice(0, 80)}...</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setServiceForm({ title: s.title, description: s.description, icon: s.icon }); setEditingId(s.id); setShowForm(true); toast("Editing service"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { setServices(services.filter((x) => x.id !== s.id)); toast.success("Service deleted"); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "experience" && experiences.map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-4 border border-border rounded-lg card-gradient">
                    <div>
                      <h4 className="font-medium text-foreground">{e.role}</h4>
                      <p className="text-sm text-primary/80">{e.company} · {e.period}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setExpForm({ role: e.role, company: e.company, period: e.period, description: e.description, tech: e.tech }); setEditingId(e.id); setShowForm(true); toast("Editing experience"); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { setExperiences(experiences.filter((x) => x.id !== e.id)); toast.success("Experience deleted"); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "pricing" && pricing.map((p) => (
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
                      <button onClick={() => { setPricing(pricing.filter((x) => x.id !== p.id)); toast.success("Package deleted"); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                {tab === "education" && education.map((e) => (
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
                      <button onClick={() => { setEducation(education.filter((x) => x.id !== e.id)); toast.success("Education deleted"); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
