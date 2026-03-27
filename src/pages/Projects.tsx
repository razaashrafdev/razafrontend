import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ContactCTA from "@/components/ContactCTA";
import SectionBadge from "@/components/SectionBadge";
import { useData } from "@/context/DataContext";

const Projects = () => {
  const { projects } = useData();

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="My Work" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A collection of projects I've worked on, from full-stack applications to open-source tools.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: "50+", label: "Total Projects" },
              { value: "20+", label: "Open Source" },
              { value: "15+", label: "Client Projects" },
              { value: "99%", label: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-lg border border-border card-gradient text-center">
                <div className="text-2xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.6 }} className="group card-gradient border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary font-mono text-xs">{String(i + 1).padStart(2, "0")}</div>
                  <div className="flex gap-2">
                    {project.github && <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-4 w-4" /></a>}
                    {project.link && <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink className="h-4 w-4" /></a>}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 bg-card/30">
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
              { icon: ArrowRight, title: "CI/CD", desc: "Automated testing and deployment pipelines" },
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
