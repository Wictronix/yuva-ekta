"use client";

import PageHero from "./PageHero";
import { useDonation } from "@/components/providers/DonationProvider";

export default function DonateHero() {
    const { openDonationModal } = useDonation();

    return (
        <PageHero
            title="Support Our Mission"
            subtitle="Your contribution directly impacts lives in the grassroot communities of Gurugram. Every donation counts towards creating a better future."
            imageUrl="/campaign/yuva_ekta_03.jpeg"
            breadcrumb={[
                { label: "Home", href: "/" },
                { label: "Donate" }
            ]}
            cta={{
                label: "Donate Now",
                onClick: () => openDonationModal()
            }}
        />
    );
}
