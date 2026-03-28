import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ROTATING_WORDS = ["web", "mobile", "cloud", "apps"];

const HeroSection = () => {
  const [typed, setTyped] = useState("");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ROTATING_WORDS[idxRef.current];
      if (!deletingRef.current) {
        if (charRef.current < word.length) {
          charRef.current += 1;
          setTyped(word.slice(0, charRef.current));
          timeout = setTimeout(tick, 75);
        } else {
          timeout = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, 2200);
        }
      } else if (charRef.current > 0) {
        charRef.current -= 1;
        setTyped(word.slice(0, charRef.current));
        timeout = setTimeout(tick, 42);
      } else {
        deletingRef.current = false;
        idxRef.current = (idxRef.current + 1) % ROTATING_WORDS.length;
        timeout = setTimeout(tick, 350);
      }
    };

    timeout = setTimeout(tick, 700);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-primary text-sm mb-4 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Available for work
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
          >
            I build things
            <br />
            for the{" "}
            <span
              className="text-gradient glow-text inline-flex items-baseline gap-0"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>{typed}</span>
              <span
                className="inline-block w-0.5 h-[0.75em] sm:h-[0.78em] self-end mb-1 ml-px bg-primary rounded-sm animate-pulse shrink-0"
                aria-hidden
              />
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
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition-colors active:scale-[0.97]"
            >
              Download CV <Download className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-16 mb-16 justify-center"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
