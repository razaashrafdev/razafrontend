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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
      <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-xl shadow-lg shadow-foreground/5 dark:shadow-black/25">
        <div className="flex h-14 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-1 text-lg font-bold">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="text-foreground">MUHAMMAD</span>
            <span className="font-mono text-gradient font-bolder">RAZA</span>
          </Link>

          {/* Desktop — collapses to hamburger at 875px and below */}
          <div className="hidden nav:flex items-center gap-1">
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
            <ThemeToggle className="ml-1" />
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-0.5 nav:hidden">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="text-foreground p-2" type="button">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
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
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground text-center"
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
