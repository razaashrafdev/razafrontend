import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import Layout from "@/components/Layout";
import ContactCTA from "@/components/ContactCTA";
import SectionBadge from "@/components/SectionBadge";
import { useData } from "@/context/DataContext";

const ExperiencePage = () => {
  const { experiences, education } = useData();
  const visibleEducation = education.filter((e) => e.visible !== false);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="Career Path" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Experience</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              My professional journey in software development.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative pl-16">
                  <div className="absolute left-3.5 top-0 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <Briefcase className="h-2.5 w-2.5 text-primary" />
                  </div>
                  <div className="card-gradient border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{exp.period}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-2">{exp.role}</h3>
                    <p className="text-sm text-primary/80 font-medium mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground">{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-12 nav:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="Education" />
            <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {visibleEducation.map((edu, i) => {
              const Icon = edu.type === "degree" ? GraduationCap : Award;
              return (
                <motion.div key={edu.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="flex gap-4 p-6 rounded-lg border border-border card-gradient">
                  <div className="p-2 h-fit rounded-md bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-primary">{edu.year}</span>
                    <h3 className="font-semibold text-foreground">{edu.title}</h3>
                    <p className="text-sm text-primary/80 mb-2">{edu.org}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 nav:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="Skills" />
            <h2 className="text-3xl font-bold text-foreground">Core Competencies</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { category: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"] },
              { category: "Backend", skills: ["Node.js", "Python", "Express", "GraphQL", "REST APIs"] },
              { category: "Database", skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "SQL"] },
              { category: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Linux"] },
              { category: "Tools", skills: ["Git", "VS Code", "Figma", "Jira", "Postman"] },
              { category: "Soft Skills", skills: ["Communication", "Problem Solving", "Team Leadership", "Agile", "Mentoring"] },
            ].map((group, i) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="p-6 rounded-lg border border-border card-gradient text-center">
                <h3 className="font-semibold text-foreground mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {group.skills.map((s) => <span key={s} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default ExperiencePage;
