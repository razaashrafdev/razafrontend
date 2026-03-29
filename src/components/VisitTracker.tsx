import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { recordPageView } from "@/lib/traffic";

/**
 * Records public page views into localStorage for the dashboard Analytics tab.
 * Admin routes are excluded so dashboard usage does not inflate “site” traffic.
 */
const VisitTracker = () => {
  const { pathname } = useLocation();
  const lastRef = useRef<{ path: string; at: number } | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/dashboard") || pathname === "/login") return;
    const now = Date.now();
    const prev = lastRef.current;
    if (prev && prev.path === pathname && now - prev.at < 800) return;
    lastRef.current = { path: pathname, at: now };
    recordPageView(pathname);
  }, [pathname]);

  return null;
};

export default VisitTracker;
