import { motion } from "framer-motion";
import { Code, Smartphone, Layout, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import LayoutComp from "@/components/Layout";
import ContactCTA from "@/components/ContactCTA";
import SectionBadge from "@/components/SectionBadge";
import { useData } from "@/context/DataContext";

const services = [
  { icon: Code, title: "Web Development", description: "Modern, responsive web applications built with cutting-edge technologies. From landing pages to complex web apps, I deliver solutions that are fast, accessible, and scalable." },
  { icon: Smartphone, title: "App Development", description: "Cross-platform mobile applications with native performance. Beautiful user interfaces with smooth interactions that work seamlessly on iOS and Android." },
  { icon: Layout, title: "CMS Development", description: "Custom content management solutions tailored to your workflow. Easy-to-use admin panels, flexible content models, and seamless publishing experiences." },
];

const Services = () => {
  const { pricing } = useData();
  const visiblePricing = pricing.filter((p) => p.visible !== false);

  return (
    <LayoutComp>
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="What I Offer" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Services</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              I provide end-to-end development services to help bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="p-8 rounded-lg border border-border card-gradient hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <Icon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 flex flex-col items-center">
            <SectionBadge text="Pricing" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Choose Your Package</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for every project size. Pick the plan that fits your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {visiblePricing.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`p-8 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                  pkg.featured
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border card-gradient hover:border-primary/30"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-gradient">${pkg.price}</span>
                  <span className="text-muted-foreground text-sm">/project</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-3 rounded-lg font-medium text-sm transition-colors ${
                    pkg.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 flex flex-col items-center">
            <SectionBadge text="FAQ" />
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: "What is your typical project timeline?", a: "Timelines vary by scope, but most projects are completed within 4-12 weeks. I provide detailed estimates during the discovery phase." },
              { q: "Do you work with international clients?", a: "Absolutely! I work with clients worldwide and am comfortable with asynchronous communication across different time zones." },
              { q: "What technologies do you specialize in?", a: "My core stack includes React, TypeScript, Node.js, Python, and PostgreSQL, but I'm adaptable to your project's specific needs." },
              { q: "Do you offer post-launch support?", a: "Yes! All projects include a support period after launch, and I offer ongoing maintenance retainers for continued support." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-lg border border-border card-gradient">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </LayoutComp>
  );
};

export default Services;
