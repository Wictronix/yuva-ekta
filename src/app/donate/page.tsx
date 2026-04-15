import { constructMetadata } from "@/lib/seo";
import DonateHero from "@/components/sections/DonateHero";
import BankDetails from "@/components/sections/BankDetails";
import DonationUtilisation from "@/components/sections/DonationUtilisation";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
    title: "Donate to Yuva Ekta foundation - 80G Tax Exemption",
    description: "Support Yuva Ekta India Foundation's work in Gurugram. Your donations provide education, healthcare, and nutrition to those in need. 100% tax-exempt under Section 80G.",
});

export default function DonatePage() {
    return (
        <main className="min-h-screen bg-brand-offwhite/30">

            <DonateHero />

            <BankDetails />

            <DonationUtilisation />

            <CTABanner />
        </main>
    );
}
