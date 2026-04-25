/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchProjects, fetchServices, fetchExperiences, fetchPricing, fetchEducation, fetchTestimonials } from "@/lib/api";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link?: string;
  github?: string;
  showOnHome?: boolean;
  createdAt?: string;
  updatedAt?: string;
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
  projectsLoading: boolean;
  services: Service[];
  setServices: (s: Service[]) => void;
  servicesLoading: boolean;
  experiences: Experience[];
  setExperiences: (e: Experience[]) => void;
  experiencesLoading: boolean;
  pricing: PricingPackage[];
  setPricing: (p: PricingPackage[]) => void;
  pricingLoading: boolean;
  education: Education[];
  setEducation: (e: Education[]) => void;
  educationLoading: boolean;
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => void;
  testimonialsLoading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  const [pricing, setPricing] = useState<PricingPackage[]>([]);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [education, setEducation] = useState<Education[]>([]);
  const [educationLoading, setEducationLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data ?? []))
      .catch(() => { setProjects([]); })
      .finally(() => setProjectsLoading(false));

    fetchServices()
      .then((res) => setServices(res.data ?? []))
      .catch(() => { setServices([]); })
      .finally(() => setServicesLoading(false));

    fetchExperiences()
      .then((res) => setExperiences(res.data ?? []))
      .catch(() => { setExperiences([]); })
      .finally(() => setExperiencesLoading(false));

    fetchPricing()
      .then((res) => setPricing(res.data ?? []))
      .catch(() => { setPricing([]); })
      .finally(() => setPricingLoading(false));

    fetchEducation()
      .then((res) => setEducation(res.data ?? []))
      .catch(() => { setEducation([]); })
      .finally(() => setEducationLoading(false));

    fetchTestimonials()
      .then((res) => setTestimonials(res.data ?? []))
      .catch(() => { setTestimonials([]); })
      .finally(() => setTestimonialsLoading(false));
  }, []);

  return (
    <DataContext.Provider value={{
      projects, setProjects, projectsLoading,
      services, setServices, servicesLoading,
      experiences, setExperiences, experiencesLoading,
      pricing, setPricing, pricingLoading,
      education, setEducation, educationLoading,
      testimonials, setTestimonials, testimonialsLoading,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
