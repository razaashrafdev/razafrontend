import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";
import { cn } from "@/lib/utils";

const techStack = [
  "React", "TypeScript", "Node.js", "React Native", "Python", "PHP", "MongoDB",
  "Docker", "AWS", "SQLite",
];

const techStack2 = [
  "Git", "Figma", "Neon DB", "Express", "Firebase", "Laravel", "Supabase",
  "Vite", "Tailwind CSS", "Next.js",
];

const techIcons: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Laravel: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  SQLite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "Neon DB": "/neon-db.png",
};

const TechRow = ({ items, direction }: { items: string[]; direction: "left" | "right" }) => {
  // Two identical sequences — keyframes move -50% (one sequence width) so loop is seamless
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-3 nav:gap-6 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{ willChange: "transform" }}
      >
        {loop.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 p-2 nav:gap-3 nav:p-4 rounded-md nav:rounded-lg bg-secondary/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 min-w-[72px] nav:min-w-[100px]"
          >
            <img
              src={techIcons[tech]}
              alt={tech}
              className={cn(
                "h-8 w-8 nav:h-10 nav:w-10 object-contain",
                tech === "Express" &&
                  "opacity-95 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]",
              )}
              loading="lazy"
            />
            <span className="text-[10px] nav:text-xs font-mono text-muted-foreground whitespace-nowrap leading-tight">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechStackScroll = () => (
  <section className="py-12 nav:py-20 overflow-hidden">
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
      <div className="absolute right-0 -top-8 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <TechRow items={techStack} direction="left" />
      <TechRow items={techStack2} direction="right" />
    </div>
  </section>
);

export default TechStackScroll;
