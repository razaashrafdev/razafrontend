import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";

const techStack = [
  "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB",
  "Docker", "AWS", "Next.js", "GraphQL", "Redis", "Tailwind CSS",
];

const techStack2 = [
  "Git", "Linux", "Figma", "Kubernetes", "Express", "Firebase",
  "Jest", "Prisma", "Vite", "Rust", "Go", "Svelte",
];

const techIcons: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  Prisma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Svelte: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
};

const TechRow = ({ items, direction }: { items: string[]; direction: "left" | "right" }) => {
  // Triple the items to ensure seamless looping
  const tripled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-6 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{ willChange: "transform" }}
      >
        {tripled.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 min-w-[100px]"
          >
            <img src={techIcons[tech]} alt={tech} className="h-10 w-10 object-contain" loading="lazy" />
            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechStackScroll = () => (
  <section className="py-20 overflow-hidden">
    <div className="container mx-auto px-4 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center flex flex-col items-center"
      >
        <SectionBadge text="Technologies" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tech Stack</h2>
      </motion.div>
    </div>

    <div className="relative space-y-6">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <TechRow items={techStack} direction="left" />
      <TechRow items={techStack2} direction="right" />
    </div>
  </section>
);

export default TechStackScroll;
