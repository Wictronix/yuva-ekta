import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ImpactStrip from "@/components/sections/ImpactStrip";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FocusAreas from "@/components/sections/FocusAreas";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import HowToHelp from "@/components/sections/HowToHelp";
import FounderQuote from "@/components/sections/FounderQuote";
import Partners from "@/components/sections/Partners";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: 'Yuva Ekta India Foundation — Empowering Grassroot Communities in Gurugram',
  description: 'A registered NGO in Gurugram delivering free education, digital literacy, women\'s livelihood, and daily nutrition to over 1,000 children and families. Donate today — 80G certified.',
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <ImpactStrip />
      <AboutTeaser />
      <FocusAreas />
      <FeaturedProjects />
      <HowToHelp />
      <FounderQuote />
      <Partners />
      <CTABanner />
    </main>
  );
}
