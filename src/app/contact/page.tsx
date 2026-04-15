import { constructMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactDetails from "@/components/sections/ContactDetails";
import ContactForm from "@/components/sections/ContactForm";
import VolunteerSection from "@/components/sections/VolunteerSection";
import MapEmbed from "@/components/sections/MapEmbed";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
    title: "Contact Yuva Ekta foundation - NGO in Gurugram, Haryana",
    description: "Connect with Yuva Ekta India Foundation in Gurugram for donations, volunteering, and CSR. Our office is located near Damdama Lake. 80G and 12A certified.",
});

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-brand-offwhite/30">

            <PageHero
                title="Get in Touch"
                subtitle="Whether you want to donate, volunteer, partner on CSR, or simply know more. We'd love to hear from you."
                imageUrl="/campaign/yuva_ekta_03.jpeg"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Contact" }
                ]}
            />

            <section className="py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                        <ContactDetails />
                        <ContactForm />
                    </div>
                </div>
            </section>

            <VolunteerSection />

            <MapEmbed />

            <CTABanner />
        </main>
    );
}
