import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import TechStackScroll from "@/components/TechStackScroll";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesPreview from "@/components/ServicesPreview";
import ContactCTA from "@/components/ContactCTA";
import { AboutMe, WhyWorkWithMe, Testimonials } from "@/components/HomeSections";

const Index = () => (
  <Layout>
    <HeroSection />
    <TechStackScroll />
    <AboutMe />
    <FeaturedProjects />
    <WhyWorkWithMe />
    <ServicesPreview />
    <Testimonials />
    <ContactCTA />
  </Layout>
);

export default Index;
