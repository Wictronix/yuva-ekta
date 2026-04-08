import { constructMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import AboutStory from "@/components/sections/AboutStory";
import VisionMission from "@/components/sections/VisionMission";
import FounderDetail from "@/components/sections/FounderDetail";
import FocusAreasAbout from "@/components/sections/FocusAreasAbout";
import Credentials from "@/components/sections/Credentials";
import MediaMentions from "@/components/sections/MediaMentions";

export const metadata = constructMetadata({
    title: 'About Us',
    description: 'Learn about Yuva Ekta India Foundation founded by Balram Kumar, mentored by Dr. Kiran Bedi, registered since 2018, and serving over 1,000 lives in Gurugram.',
});

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">

            <PageHero
                title="About Us"
                subtitle="A story rooted in community, driven by purpose."
                imageUrl="/campaign/yuva_ekta_02.jpeg"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "About" }
                ]}
            />

            <AboutStory />

            <VisionMission />

            <FounderDetail />

            <FocusAreasAbout />

            <Credentials />

            <MediaMentions />
        </main>
    );
}
