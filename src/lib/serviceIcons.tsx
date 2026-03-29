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
  ShoppingCart,
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
  ShoppingCart,
};

export function getServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Code;
}
