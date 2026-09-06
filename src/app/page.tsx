import { constructMetadata } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FocusAreas from "@/components/sections/FocusAreas";
import FeaturedCampaigns from "@/components/sections/FeaturedCampaigns";
import HowToHelp from "@/components/sections/HowToHelp";
import FounderQuote from "@/components/sections/FounderQuote";
import CSRTeaser from "@/components/sections/CSRTeaser";
import Partners from "@/components/sections/Partners";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
  title: "Top NGO in Gurugram | Yuva Ekta India Foundation",
  description: "Yuva Ekta India Foundation is a registered grassroots NGO in Gurugram (80G & 12A certified) offering free education, healthcare, and women's livelihood programs to 1000+ families. Support our mission today.",
  pathname: "/",
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <AboutTeaser />
      <FocusAreas />
      <FeaturedCampaigns />
      <HowToHelp />
      <FounderQuote />
      <CSRTeaser />
      <Partners />
      <CTABanner />
    </main>
  );
}
