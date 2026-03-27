import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.6 },
};

const FeaturedProjects = () => {
  const { projects } = useData();
  const featured = projects
    .filter(p => p.showOnHome !== false)
    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
    .slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-12 flex flex-col items-center">
          <SectionBadge text="Featured Work" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recent Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group card-gradient border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-md bg-primary/10 text-primary font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center mt-10">
          <Link to="/projects" className="text-sm text-primary hover:underline font-mono">View all →</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
