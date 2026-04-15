import { constructMetadata } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import ImpactStrip from "@/components/sections/ImpactStrip";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FocusAreas from "@/components/sections/FocusAreas";
import FeaturedCampaigns from "@/components/sections/FeaturedCampaigns";
import HowToHelp from "@/components/sections/HowToHelp";
import FounderQuote from "@/components/sections/FounderQuote";
import Partners from "@/components/sections/Partners";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
  title: "Top NGO in Gurugram | Yuva Ekta India Foundation",
  description: "Yuva Ekta India Foundation is a registered grassroots NGO in Gurugram (80G & 12A certified) offering free education, healthcare, and women's livelihood programs to 1000+ families. Support our mission today.",
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <ImpactStrip />
      <AboutTeaser />
      <FocusAreas />
      <FeaturedCampaigns />
      <HowToHelp />
      <FounderQuote />
      <Partners />
      <CTABanner />
    </main>
  );
}
