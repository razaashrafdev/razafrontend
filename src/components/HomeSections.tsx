import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Users, CheckCircle2, Quote } from "lucide-react";
import SectionBadge from "./SectionBadge";
import { useData } from "@/context/DataContext";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.6 },
};

const AboutMe = () => (
  <section className="py-12 nav:py-20 bg-card/30">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <div className="flex justify-center lg:justify-start"><SectionBadge text="About Me" /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center lg:text-left">
            Passionate about building <span className="text-gradient">great software applications</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
          Hi! I'm Muhammad Raza a full-stack developer in modern web technologies, building applications that are fast, responsive, and user-friendly. 
          When I'm not coding, you'll find me working on AI-based projects, learning new technologies, or developing smart systems that solve real-world problems.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
          {[
            { icon: Zap, title: "Fast Delivery", desc: "Quick and fast turnaround without compromising quality.." },
            { icon: Shield, title: "Secure Code", desc: "Security best practices seamlessly baked into every project." },
            { icon: Rocket, title: "Scalable", desc: "Architecture designed to easily grow with your business." },
            { icon: Users, title: "Collaborative", desc: "Transparent process with regular timely progress updates." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-lg border border-border card-gradient hover:border-primary/30 transition-colors">
              <Icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1 text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const WhyWorkWithMe = () => (
  <section className="py-12 nav:py-20 bg-card/30">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16 flex flex-col items-center">
        <SectionBadge text="Why Me" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Work With Me?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
        I combine strong technical expertise with a keen eye for clean design to deliver products that your users will love.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { num: "01", title: "End-to-End Development", desc: "I can handle the full end-to-end development process and ensure everything runs smoothly using reliable tools and well-structured systems." },
          { num: "02", title: "Modern Tech Stack", desc: "I stay current with the latest technologies and modern frameworks to ensure your project is built using the best and most reliable tools available today." },
          { num: "03", title: "Results-Driven Approach", desc: "Every line of code I write is focused on achieving your business objectives. Performance and user experience are always top priorities." },
        ].map((item, i) => (
          <motion.div key={item.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative text-center">
            <span className="text-6xl font-bold text-primary/10 font-mono">{item.num}</span>
            <h3 className="text-xl font-semibold text-foreground mb-3 -mt-4">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const { testimonials } = useData();
  const list = testimonials.filter((t) => t.visible !== false);
  if (list.length === 0) return null;

  return (
    <section className="py-12 nav:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-10 nav:mb-16 flex flex-col items-center">
          <SectionBadge text="Testimonials" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Clients Say</h2>
        </motion.div>

        {/* Mobile: horizontal scroll · Desktop (nav+): 3-column grid */}
        <div className="max-w-5xl mx-auto w-full">
        <div
          className="flex nav:grid nav:grid-cols-3 gap-4 nav:gap-6 overflow-x-auto nav:overflow-visible snap-x snap-mandatory nav:snap-none scrollbar-hide -mx-4 px-4 nav:mx-0 nav:px-0 pb-2 nav:pb-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {list.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="min-w-[min(100%,17.5rem)] w-[82vw] max-w-sm nav:min-w-0 nav:w-auto flex-shrink-0 nav:flex-shrink snap-center rounded-lg border border-border card-gradient p-5 nav:p-6"
            >
              <Quote className="h-6 w-6 text-primary/40 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-medium text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-primary/80">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => (
  <section className="py-12 nav:py-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16 flex flex-col items-center">
        <SectionBadge text="My Process" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How I Work</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A structured yet flexible approach to ensure every project is delivered on time and exceeds expectations.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[
          { step: "01", title: "Discovery", desc: "Understanding your goals, audience, and requirements through in-depth consultation." },
          { step: "02", title: "Planning", desc: "Creating detailed technical specifications, wireframes, and development roadmap." },
          { step: "03", title: "Development", desc: "Writing clean, tested code with regular progress updates and milestone reviews." },
          { step: "04", title: "Support", desc: "Deploying to production with monitoring, followed by ongoing maintenance support." },
        ].map((item, i) => (
          <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="text-center p-6 rounded-lg border border-border card-gradient">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-mono font-bold mb-4">
              {item.step}
            </div>
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export { AboutMe, WhyWorkWithMe, Testimonials, ProcessSection };
