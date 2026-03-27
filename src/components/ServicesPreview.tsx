import { motion } from "framer-motion";
import { Code, Smartphone, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

const services = [
  { icon: Code, title: "Web Development", description: "Modern, responsive web applications built with cutting-edge technologies and best practices." },
  { icon: Smartphone, title: "App Development", description: "Cross-platform mobile applications with native performance and beautiful user interfaces." },
  { icon: Layout, title: "CMS Development", description: "Custom content management solutions that are easy to use, scalable, and tailored to your needs." },
];

const ServicesPreview = () => (
  <section className="py-20 bg-card/30">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 flex flex-col items-center">
        <SectionBadge text="What I Do" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Services</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="p-6 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
        <Link to="/services" className="text-sm text-primary hover:underline font-mono">Learn more →</Link>
      </motion.div>
    </div>
  </section>
);

export default ServicesPreview;
