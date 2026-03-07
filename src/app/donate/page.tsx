import { constructMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import DonateForm from "@/components/sections/DonateForm";
import Credentials from "@/components/sections/Credentials";

export const metadata = constructMetadata({
    title: 'Donate Now',
    description: 'Support grassroot communities in Gurugram. Your donations are tax-exempt under Section 80G. Choose a project or contribute to our general fund.',
});

export default function DonatePage() {
    return (
        <main className="min-h-screen bg-brand-offwhite/30">
            <PageHero
                title="Make a Difference"
                subtitle="Your contribution directly reaches children in need of education and nutrition in the villages of Sohna Block."
                imageUrl="/campaign/yuva_ekta_02.jpeg"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Donate" }
                ]}
            />

            <section className="py-24">
                <div className="container">
                    <DonateForm />
                </div>
            </section>

            <section className="pb-24">
                <div className="container">
                    <div className="mb-12">
                        <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Trust & Transparency</span>
                        <h3 className="text-3xl font-black text-brand-brown font-playfair">Registered & Certified</h3>
                    </div>
                    <Credentials />
                </div>
            </section>
        </main>
    );
}
