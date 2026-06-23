import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Experience", path: "/experience" },
  { label: "Contact", path: "/contact" },
];

/** Digits only, country code + number (default matches site contact). Override with VITE_WHATSAPP_NUMBER in .env */
const whatsappDigits = String(import.meta.env.VITE_WHATSAPP_NUMBER || "923092438145").replace(/\D/g, "") || "923092438145";
const whatsappHref = `https://wa.me/${whatsappDigits}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
      <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-xl shadow-lg shadow-foreground/5 dark:shadow-black/25">
        <div className="relative flex h-14 items-center px-6">
          <Link to="/" className="relative z-10 flex shrink-0 items-center gap-1 text-lg font-bold">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="text-foreground">MUHAMMAD</span>
            <span className="font-mono text-gradient font-bolder">RAZA</span>
          </Link>

          {/* Desktop — links centered in navbar (950px+) */}
          <nav
            className="pointer-events-none absolute left-1/2 top-1/2 z-[5] hidden -translate-x-1/2 -translate-y-1/2 nav:flex"
            aria-label="Main"
          >
            <div className="pointer-events-auto flex items-center gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === l.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 nav:flex">
              <ThemeToggle />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Hire Me
              </a>
            </div>
            <div className="flex items-center gap-0.5 nav:hidden">
              <ThemeToggle />
              <button onClick={() => setOpen(!open)} className="text-foreground p-2" type="button">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="nav:hidden border-t border-border overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === l.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground text-center"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
