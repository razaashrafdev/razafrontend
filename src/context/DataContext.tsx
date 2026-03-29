import { createContext, useContext, useState, ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link?: string;
  github?: string;
  showOnHome?: boolean;
  displayOrder?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured?: boolean;
  visible?: boolean;
}

export interface Education {
  id: string;
  title: string;
  org: string;
  year: string;
  description: string;
  type: "degree" | "certification";
  visible?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  visible?: boolean;
}

interface DataContextType {
  projects: Project[];
  setProjects: (p: Project[]) => void;
  services: Service[];
  setServices: (s: Service[]) => void;
  experiences: Experience[];
  setExperiences: (e: Experience[]) => void;
  pricing: PricingPackage[];
  setPricing: (p: PricingPackage[]) => void;
  education: Education[];
  setEducation: (e: Education[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const defaultProjects: Project[] = [
  { id: "1", title: "E-Commerce Platform", description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.", tech: ["React", "Node.js", "PostgreSQL", "Stripe"], link: "#", github: "#", showOnHome: true, displayOrder: 1 },
  { id: "2", title: "AI Chat Application", description: "Real-time messaging app with AI-powered responses, file sharing, and end-to-end encryption.", tech: ["Next.js", "OpenAI", "WebSocket", "Redis"], link: "#", github: "#", showOnHome: true, displayOrder: 2 },
  { id: "3", title: "DevOps Dashboard", description: "Monitoring and deployment dashboard for microservices architecture with CI/CD integration.", tech: ["React", "Docker", "Kubernetes", "Grafana"], link: "#", github: "#", showOnHome: true, displayOrder: 3 },
  { id: "4", title: "Task Management API", description: "RESTful API with authentication, role-based access control, and real-time notifications.", tech: ["Express", "MongoDB", "JWT", "Socket.io"], link: "#", github: "#", showOnHome: false, displayOrder: 4 },
  { id: "5", title: "Portfolio Generator", description: "Dynamic portfolio builder with customizable themes and automatic deployment.", tech: ["TypeScript", "Tailwind", "Vercel", "MDX"], link: "#", github: "#", showOnHome: false, displayOrder: 5 },
  { id: "6", title: "Finance Tracker", description: "Personal finance management app with data visualization and budget forecasting.", tech: ["React", "D3.js", "Supabase", "Chart.js"], link: "#", github: "#", showOnHome: false, displayOrder: 6 },
];

const defaultServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description:
      "Modern, responsive web applications built with cutting-edge technologies. From landing pages to complex web apps, I deliver solutions that are fast, accessible, and scalable.",
    icon: "Code",
  },
  {
    id: "2",
    title: "App Development",
    description:
      "Cross-platform mobile applications with native performance. Beautiful user interfaces with smooth interactions that work seamlessly on iOS and Android.",
    icon: "Smartphone",
  },
  {
    id: "3",
    title: "CMS Development",
    description:
      "Custom content management solutions tailored to your workflow. Easy-to-use admin panels, flexible content models, and seamless publishing experiences.",
    icon: "Layout",
  },
  {
    id: "4",
    title: "E-commerce Development",
    description:
      "Online store builds on WordPress (WooCommerce) and Shopify—custom themes, product catalogs, checkout, payments, and shipping integrations so you can sell with a polished storefront.",
    icon: "ShoppingCart",
  },
  {
    id: "5",
    title: "API Integration",
    description: "Connect REST, GraphQL, and third-party APIs with secure auth, error handling, and clear documentation so your services work together reliably.",
    icon: "Plug",
  },
  {
    id: "6",
    title: "Free Consultation",
    description: "A no-obligation session to discuss your goals, timeline, and stack—get clarity and next steps before you commit to a build.",
    icon: "MessageCircle",
  },
];

const defaultExperiences: Experience[] = [
  { id: "1", role: "Senior Full-Stack Developer", company: "TechCorp Inc.", period: "2023 — Present", description: "Leading development of cloud-native applications. Architected microservices handling 10M+ requests/day.", tech: ["React", "Node.js", "AWS", "PostgreSQL"] },
  { id: "2", role: "Full-Stack Developer", company: "StartupXYZ", period: "2021 — 2023", description: "Built and scaled the core product from MVP to 50K+ users. Implemented CI/CD pipelines.", tech: ["Next.js", "Python", "Docker", "MongoDB"] },
  { id: "3", role: "Frontend Developer", company: "DesignStudio", period: "2019 — 2021", description: "Developed responsive web applications and component libraries for enterprise clients.", tech: ["React", "TypeScript", "Sass", "Jest"] },
  { id: "4", role: "Junior Developer", company: "WebAgency", period: "2018 — 2019", description: "Built websites and web applications for small businesses. Learned agile development.", tech: ["JavaScript", "PHP", "MySQL", "WordPress"] },
];

const defaultPricing: PricingPackage[] = [
  {
    id: "1", name: "Basic", price: 100, description: "Perfect for small projects and landing pages",
    features: ["Single page website", "Responsive design", "Basic SEO setup", "Contact form", "1 revision round", "3-day delivery"],
    visible: true,
  },
  {
    id: "2", name: "Standard", price: 200, description: "Ideal for growing businesses and multi-page sites",
    features: ["Up to 5 pages", "Custom design", "CMS integration", "SEO optimization", "3 revision rounds", "7-day delivery", "Social media integration"],
    featured: true, visible: true,
  },
  {
    id: "3", name: "Premium", price: 500, description: "Full-scale web applications and complex projects",
    features: ["Unlimited pages", "Custom web application", "Database integration", "API development", "User authentication", "Unlimited revisions", "Priority support", "14-day delivery"],
    visible: true,
  },
];

const defaultEducation: Education[] = [
  { id: "1", title: "B.S. Computer Science", org: "State University", year: "2018", description: "Graduated with honors. Focused on software engineering and distributed systems.", type: "degree", visible: true },
  { id: "2", title: "AWS Solutions Architect", org: "Amazon Web Services", year: "2022", description: "Professional certification for designing distributed systems on AWS.", type: "certification", visible: true },
  { id: "3", title: "Meta Front-End Developer", org: "Meta / Coursera", year: "2021", description: "Professional certificate covering React, testing, and UI/UX best practices.", type: "certification", visible: true },
  { id: "4", title: "Full-Stack Web Development", org: "Online Bootcamp", year: "2018", description: "Intensive program covering MERN stack, algorithms, and data structures.", type: "degree", visible: true },
];

const defaultTestimonials: Testimonial[] = [
  { id: "1", quote: "Delivered a complex e-commerce platform ahead of schedule. Clean code, great communication, and incredible attention to detail.", name: "Sarah Johnson", role: "CEO, TechStartup", visible: true },
  { id: "2", quote: "The best developer I've worked with. Turned our vague ideas into a polished product that our users absolutely love.", name: "Michael Chen", role: "Product Manager, DataFlow", visible: true },
  { id: "3", quote: "Reliable, skilled, and always goes above and beyond. Our API performance improved by 300% after their optimization work.", name: "Emily Rodriguez", role: "CTO, CloudNine", visible: true },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [pricing, setPricing] = useState<PricingPackage[]>(defaultPricing);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  return (
    <DataContext.Provider value={{ projects, setProjects, services, setServices, experiences, setExperiences, pricing, setPricing, education, setEducation, testimonials, setTestimonials }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
