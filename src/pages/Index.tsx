import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import TechStackScroll from "@/components/TechStackScroll";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesPreview from "@/components/ServicesPreview";
import ContactCTA from "@/components/ContactCTA";
import { AboutMe, WhyWorkWithMe, Testimonials, ProcessSection } from "@/components/HomeSections";

const Index = () => (
  <Layout>
    <HeroSection />
    <TechStackScroll />
    <AboutMe />
    <FeaturedProjects />
    <WhyWorkWithMe />
    <ServicesPreview />
    <Testimonials />
    <ProcessSection />
    <ContactCTA />
  </Layout>
);

export default Index;
