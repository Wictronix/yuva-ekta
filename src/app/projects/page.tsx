import { constructMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ProjectDetail from "@/components/sections/ProjectDetail";
import CommunityProgrammes from "@/components/sections/CommunityProgrammes";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
    title: 'Our Projects & Programmes',
    description: 'Four active projects and seven community programmes delivering education, digital literacy, women\'s livelihood, and nutrition across Sohna Block, Gurugram.',
});

export default function ProjectsPage() {
    return (
        <main className="min-h-screen">
            <PageHero
                title="Our Projects"
                subtitle="Four active projects. Seven community initiatives. One shared mission."
                imageUrl="/campaign/yuva_ekta_01.jpeg"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Projects" }
                ]}
            />

            {/* Project 1: Sakshar Sohna */}
            <ProjectDetail
                id="sakshar-sohna"
                name="Sakshar Sohna"
                tagline="Remedial Education for Dropout and At-Risk Children"
                supporter="Expert Solutions for Non Profit"
                image="/campaign/yuva_ekta_01.jpeg"
                description={[
                    "In the villages around Sohna Block, hundreds of children have slipped through the cracks of the formal education system — children whose families cannot afford private tuition, whose schools are overcrowded, and who fall behind until they stop coming at all. Sakshar Sohna exists to bring them back.",
                    "Through a team of trained educators, we run structured hourly classes that build the core skills every child needs: reading, writing, arithmetic, and the ability to understand and use information. But we go far beyond academics. Our sessions include leadership workshops, art and craft, poetry, music, and drama — because a child's development is never just about grades. It is about confidence, expression, and the belief that they belong.",
                    "One of our proudest achievements is the network of village libraries we have established inside government schools across the Sohna Block. We don't just set them up — we train the school students themselves to run and maintain them. These are libraries built by the community, for the community."
                ]}
                stats={[
                    { label: "Target (2022-23)", value: "200 children enrolled" },
                    { label: "Objective", value: "1,000 children mainstreamed" }
                ]}
                fundingHeads={["Salaries to Educators", "Rent for Centres", "Community Mobilisation", "Learning Resources"]}
                monthlyRequirement="₹30,000"
            />

            {/* Project 2: Digital Saksharta */}
            <ProjectDetail
                id="digital-saksharta"
                name="Digital Saksharta"
                tagline="Free Computer Education for Rural Children and Youth"
                supporter="Morning Star Foundation"
                image="/campaign/yuva_ekta_02.jpeg"
                reverse
                description={[
                    "In a world that runs on digital skills, the rural children of Sehjawas Village had no access to computer education. The nearest private computer centre charges fees that most village families cannot afford. Digital Saksharta changes that — completely free, completely accessible.",
                    "With the generous support of Morning Star Foundation, we have established a Digital Learning Centre in Sehjawas Village equipped with 30 computers and a printer. The centre runs Monday to Friday, providing free computer education to 50 children and adolescents between the ages of 6 and 16. Every child who walks in leaves with skills they can actually use.",
                    "On weekends, the centre opens its doors to rural youth seeking employment. Free workshops teach the practical skills that entry-level jobs demand — computer operation, data entry, digital communication. These are not theoretical lessons. They are directly linked to real jobs in Gurugram's growing economy."
                ]}
                stats={[
                    { label: "Target (2022-23)", value: "240 children and youth" },
                    { label: "Infrastructure", value: "30 computers + 1 printer" }
                ]}
                fundingHeads={["Salary to Trainer", "Rent for Centre", "Mobilisation", "Curriculum Materials"]}
                monthlyRequirement="₹35,000"
            />

            {/* Project 3: Mahila Ajeevika */}
            <ProjectDetail
                id="mahila-ajeevika"
                name="Mahila Ajeevika"
                tagline="Building Women's Livelihoods Through Real Skills and Real Income"
                supporter="Srujna Charitable Trust"
                image="/campaign/yuva_ekta_03.jpeg"
                description={[
                    "For many women in rural Gurugram, the ability to stitch and tailor has been part of their lives for as long as they can remember. But skill alone has never been enough. Without the right tools, the right training in running a small business, and the right market connections, that skill earns nothing. Mahila Ajeevika changes that.",
                    "With support from Srujna Charitable Trust, the foundation provides sewing machines, raw materials, and structured business training to 50 rural women. We don't just teach skills — we help participants set up income-generating stalls, procure orders from local markets, and build their own micro-enterprises from the ground up.",
                    "Each woman who completes the programme is expected to add ₹5,000 to her household's monthly income. That is not a gift. That is her own work, her own business, and her own financial independence."
                ]}
                stats={[
                    { label: "Target (2022-23)", value: "50 women" },
                    { label: "Income Goal", value: "₹5,000 increment/month" }
                ]}
                fundingHeads={["Skill Trainers", "Setting Up Stalls", "Exposure Visits", "Order Fulfillment"]}
                monthlyRequirement="₹45,000"
            />

            {/* Project 4: Swastha Sohna */}
            <ProjectDetail
                id="swastha-sohna"
                name="Swastha Sohna"
                tagline="Daily Nutrition for Malnourished and Critically Ill Children"
                supporter="Taj Gateway Resort"
                image="/campaign/yuva-ekta-03.png"
                reverse
                description={[
                    "Hunger is not a statistic. It is a child who cannot concentrate in class because their stomach is empty. It is a body fighting a serious illness on a diet of nothing. It is a future dimmed by something as basic — and as preventable — as food. Swastha Sohna exists because we refuse to accept that.",
                    "Every day, without exception, the foundation distributes free food packets to 100 children who would otherwise go without. These include malnourished children identified in the villages around Sohna Block and children with critical illnesses identified through our partnerships.",
                    "The initiative is made possible through the generous and sustained support of Taj Gateway Resort, whose commitment to the community goes far beyond a single donation. This is an ongoing, daily operation — 365 days a year, no holidays."
                ]}
                stats={[
                    { label: "Daily Beneficiaries", value: "100 children" },
                    { label: "Partners", value: "Dil se Mehek · One Each One Feed" }
                ]}
                fundingHeads={["Food Packet Procurement", "Distribution Logistics", "Volunteer Stipends"]}
                monthlyRequirement="₹50,000"
            />

            <CommunityProgrammes />

            <CTABanner />
        </main>
    );
}
