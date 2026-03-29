import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

const ContactCTA = () => (
  <section className="py-12 nav:py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <SectionBadge text="Let's Connect" />
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Got a project in mind?
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision, and collaborating to build meaningful impactful digital experiences together.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors text-lg active:scale-[0.97]"
        >
          Get in Touch <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ContactCTA;
