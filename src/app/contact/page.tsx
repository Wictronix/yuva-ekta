import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactDetails from "@/components/sections/ContactDetails";
import ContactForm from "@/components/sections/ContactForm";
import VolunteerSection from "@/components/sections/VolunteerSection";
import MapEmbed from "@/components/sections/MapEmbed";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
    title: 'Contact Us | Yuva Ekta India Foundation',
    description: 'Get in touch with Yuva Ekta India Foundation for donations, volunteering, CSR partnerships, or media enquiries. Call, email, or fill our contact form.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-brand-offwhite/30">

            <PageHero
                title="Get in Touch"
                subtitle="Whether you want to donate, volunteer, partner on CSR, or simply know more — we'd love to hear from you."
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
