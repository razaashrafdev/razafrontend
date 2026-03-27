import { Link, useLocation } from "react-router-dom";
import { Home, Mail } from "lucide-react";
import { motion } from "framer-motion";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-[15%] h-[200px] w-[200px] rounded-full bg-primary/5 blur-[80px]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-lg text-center"
        >
          <p className="font-mono text-sm text-muted-foreground mb-4 tracking-wide">
            <span className="text-primary">ERR_NOT_FOUND</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="truncate inline-block max-w-[12rem] align-bottom sm:max-w-xs" title={location.pathname}>
              {location.pathname}
            </span>
          </p>

          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-gradient glow-text mb-2">404</h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">This page does not exist</h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
            The link may be broken or the page was removed. Head back home or open another section from the navigation.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 border-border bg-secondary/30 hover:bg-secondary/50">
              <Link to="/contact">
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
