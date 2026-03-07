import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ImpactStatsDetail from "@/components/sections/ImpactStatsDetail";
import DonationUtilisation from "@/components/sections/DonationUtilisation";
import WishList from "@/components/sections/WishList";
import ImpactGallery from "@/components/sections/ImpactGallery";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
    title: 'Our Impact | Yuva Ekta India Foundation',
    description: 'See the real-world impact of your support. 1,000+ children educated, 100+ women empowered, and daily nutrition for those in need.',
};

export default function ImpactPage() {
    return (
        <main className="min-h-screen">
            <PageHero
                title="Our Impact"
                subtitle="Numbers tell part of the story. Faces tell the rest. Here is how we are changing lives together."
                imageUrl="/initiatives/shiksha-ka-saath.png"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Impact" }
                ]}
            />

            <ImpactStatsDetail />

            <DonationUtilisation />

            <WishList />

            <ImpactGallery />

            <CTABanner />
        </main>
    );
}
