import { Link } from "react-router-dom";
import { Terminal, Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="mx-auto w-[95%] max-w-7xl py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold mb-4">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-gradient">MUHANNAD</span>
            <span className="text-foreground">RAZA</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Full-stack developer crafting modern web experiences with clean code, thoughtful design, and scalable architecture.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Mail, href: "mailto:hello@developer.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="p-2.5 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Home", path: "/" },
              { label: "Projects", path: "/projects" },
              { label: "Services", path: "/services" },
              { label: "Experience", path: "/experience" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Services</h4>
          <div className="flex flex-col gap-3">
            {["Web Development", "App Development", "CMS Development"].map((s) => (
              <Link
                key={s}
                to="/services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, text: "hello@developer.com" },
              { icon: Phone, text: "+1 (555) 123-4567" },
              { icon: MapPin, text: "San Francisco, CA" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Muhannad Raza — Built with passion & clean code
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
