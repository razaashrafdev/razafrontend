import type { LucideIcon } from "lucide-react";
import {
  Code,
  Smartphone,
  Layout,
  Server,
  Palette,
  Database,
  Cloud,
  MessageSquare,
  Plug,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Code,
  Smartphone,
  Layout,
  Server,
  Palette,
  Database,
  Cloud,
  MessageSquare,
  Plug,
  ShieldCheck,
  MessageCircle,
};

export function getServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Code;
}
