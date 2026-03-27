import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Users, CheckCircle2, Quote } from "lucide-react";
import SectionBadge from "./SectionBadge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.6 },
};

const AboutMe = () => (
  <section className="py-20 bg-card/30">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <div className="flex justify-center lg:justify-start"><SectionBadge text="About Me" /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center lg:text-left">
            Passionate about building <span className="text-gradient">great software</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a full-stack developer with over 5 years of experience crafting web applications
            that are not only functional but also beautiful and intuitive.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            When I'm not coding, you'll find me exploring new technologies, contributing to
            open-source projects, or mentoring aspiring developers.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
          {[
            { icon: Zap, title: "Fast Delivery", desc: "Quick turnaround without compromising quality" },
            { icon: Shield, title: "Secure Code", desc: "Security best practices baked into every project" },
            { icon: Rocket, title: "Scalable", desc: "Architecture designed to grow with your business" },
            { icon: Users, title: "Collaborative", desc: "Transparent process with regular updates" },
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
  <section className="py-20 bg-card/30">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16 flex flex-col items-center">
        <SectionBadge text="Why Me" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Work With Me?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I combine technical expertise with a keen eye for design to deliver products that your users will love.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { num: "01", title: "End-to-End Development", desc: "From concept to deployment, I handle the entire development lifecycle. Frontend, backend, database, DevOps — all covered under one roof." },
          { num: "02", title: "Modern Tech Stack", desc: "I stay current with the latest technologies and frameworks to ensure your project is built with the best tools available today." },
          { num: "03", title: "Results-Driven Approach", desc: "Every line of code I write is focused on achieving your business objectives. Performance, SEO, and user experience are always top priorities." },
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

const Testimonials = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16 flex flex-col items-center">
        <SectionBadge text="Testimonials" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Clients Say</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { quote: "Delivered a complex e-commerce platform ahead of schedule. Clean code, great communication, and incredible attention to detail.", name: "Sarah Johnson", role: "CEO, TechStartup" },
          { quote: "The best developer I've worked with. Turned our vague ideas into a polished product that our users absolutely love.", name: "Michael Chen", role: "Product Manager, DataFlow" },
          { quote: "Reliable, skilled, and always goes above and beyond. Our API performance improved by 300% after their optimization work.", name: "Emily Rodriguez", role: "CTO, CloudNine" },
        ].map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="p-6 rounded-lg border border-border card-gradient">
            <Quote className="h-6 w-6 text-primary/40 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
            <div>
              <p className="font-medium text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-primary/80">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-20 bg-card/30">
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
          { step: "04", title: "Launch & Support", desc: "Deploying to production with monitoring, followed by ongoing maintenance support." },
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
