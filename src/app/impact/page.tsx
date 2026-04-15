import { constructMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ImpactStatsDetail from "@/components/sections/ImpactStatsDetail";
import DonationUtilisation from "@/components/sections/DonationUtilisation";
import WishList from "@/components/sections/WishList";
import ImpactGallery from "@/components/sections/ImpactGallery";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
    title: "Our Impact | Yuva Ekta foundation Gurugram",
    description: "Discover the measurable change Yuva Ekta foundation has brought to 1000+ children and families in Gurugram through education and nutrition. Verified 80G NGO.",
});

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
