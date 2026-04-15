import { constructMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import AboutStory from "@/components/sections/AboutStory";
import VisionMission from "@/components/sections/VisionMission";
import FounderDetail from "@/components/sections/FounderDetail";
import FocusAreasAbout from "@/components/sections/FocusAreasAbout";
import Credentials from "@/components/sections/Credentials";
import MediaMentions from "@/components/sections/MediaMentions";

export const metadata = constructMetadata({
    title: "About Yuva Ekta foundation - Grassroot NGO in Gurugram",
    description: "Learn about Yuva Ekta India Foundation, founded in 2018. We are a registered NGO in Gurugram dedicated to education, healthcare, and women empowerment. 80G and 12A certified.",
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
