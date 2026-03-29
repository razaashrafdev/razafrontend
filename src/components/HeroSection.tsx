import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

const ROTATING_WORDS = ["Web", "Mobile", "API", "Cloud"];

const HeroSection = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let cancelled = false;
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let id: ReturnType<typeof setTimeout>;

    const loop = () => {
      if (cancelled) return;
      const word = ROTATING_WORDS[wi];
      if (!deleting) {
        if (ci < word.length) {
          ci += 1;
          setTyped(word.slice(0, ci));
          id = setTimeout(loop, 78);
        } else {
          id = setTimeout(() => {
            deleting = true;
            loop();
          }, 2100);
        }
      } else if (ci > 0) {
        ci -= 1;
        setTyped(word.slice(0, ci));
        id = setTimeout(loop, 44);
      } else {
        deleting = false;
        wi = (wi + 1) % ROTATING_WORDS.length;
        id = setTimeout(loop, 380);
      }
    };

    id = setTimeout(loop, 650);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  return (
    <section className="relative flex w-full min-h-0 nav:min-h-[110vh] items-start nav:items-center overflow-hidden pt-12 pb-6 nav:pt-0 nav:pb-0">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge text="Available for work" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.15] mb-6"
          >
            <span className="block">I build things</span>
            {/* Ek hi line: flex-wrap se bachne ke liye nowrap + inline flow (empty typed par baseline collapse na ho) */}
            <span className="mt-1 block w-full px-1 text-center overflow-x-auto overflow-y-hidden scrollbar-hide">
              <span className="inline-block max-w-full whitespace-nowrap align-middle">
                <span className="text-foreground">for the </span>
                <span className="text-gradient glow-text inline font-bold" aria-live="polite" aria-atomic="true">
                  <span className="inline">
                    {typed.length > 0 ? typed : "\u00A0"}
                  </span>
                  <span
                    className="inline-block w-0.5 h-[0.78em] align-[-0.06em] mx-0.5 bg-primary rounded-sm animate-pulse"
                    aria-hidden
                  />
                </span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Full-stack developer building exceptional digital experiences. Currently focused on crafting accessible, scalable web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors active:scale-[0.97]"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition-colors active:scale-[0.97]"
            >
              <Briefcase className="h-4 w-4 shrink-0" />
              Hire Me
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-10 mb-6 justify-center nav:mt-16 nav:mb-16"
          >
            {[
              { value: "1+", label: "Years Experience" },
              { value: "10+", label: "Projects Completed" },
              { value: "5+", label: "Happy Clients" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground font-mono">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 nav:bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
