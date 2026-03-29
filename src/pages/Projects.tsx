import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, Code2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ContactCTA from "@/components/ContactCTA";
import SectionBadge from "@/components/SectionBadge";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 9;

const Projects = () => {
  const { projects } = useData();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));

  const pageProjects = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return projects.slice(start, start + PAGE_SIZE);
  }, [projects, page]);

  const globalIndexOffset = (page - 1) * PAGE_SIZE;

  useEffect(() => {
    if (page > totalPages) setPage(Math.max(1, totalPages));
  }, [page, totalPages]);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="My Work" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A collection of projects I've worked on, from full-stack applications to useful open-source tools and solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group card-gradient border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary font-mono text-xs">{String(globalIndexOffset + i + 1).padStart(2, "0")}</div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button type="button" variant="outline" size="sm" className="gap-1" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <p className="text-sm text-muted-foreground order-first sm:order-none">
                Page <span className="font-mono text-foreground">{page}</span> of <span className="font-mono text-foreground">{totalPages}</span>
                <span className="hidden sm:inline"> · </span>
                <span className="hidden sm:inline">{projects.length} projects</span>
              </p>
              <Button type="button" variant="outline" size="sm" className="gap-1" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-12 nav:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="Development Approach" />
            <h2 className="text-3xl font-bold text-foreground">Built With Best Practices</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Code2, title: "Clean Code", desc: "Readable, maintainable, and well-documented codebase" },
              { icon: Layers, title: "Modular Design", desc: "Component-based architecture for easy scaling" },
              { icon: Github, title: "Version Control", desc: "Git-based workflow with proper branching strategies" },
              { icon: ArrowRight, title: "DevOps Automation", desc: "Streamlined processes for testing and releasing code" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="text-center p-6 rounded-lg border border-border card-gradient">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Projects;
