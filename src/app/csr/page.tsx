import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { 
  // FileText, 
  // Download, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Laptop, 
  HeartHandshake, 
  Apple, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight
} from "lucide-react";
import CSRContactForm from "@/components/sections/CSRContactForm";

export const metadata = constructMetadata({
  title: "CSR Partnerships & Annual Reports | Yuva Ekta India Foundation",
  description: "Section 135 & Schedule VII compliant CSR partnerships in Gurugram. Download audited annual reports, 80G, 12A, and MCA CSR-1 registration certificates.",
  pathname: "/csr",
});

/*
const COMPLIANCE_DOCS = [
  {
    id: "annual-report",
    title: "Annual Programme & Impact Report 2023–24",
    category: "Annual Reports",
    type: "PDF Document",
    size: "1.4 MB",
    period: "FY 2023–2024",
    description: "Comprehensive review of village remediation classes, digital literacy milestones, women micro-enterprises, and field operational metrics in Sohna Block.",
    fileUrl: "/reports/annual-report-2023-24.pdf",
    highlight: true,
  },
  {
    id: "audit-report",
    title: "Audited Financial Statements & Balance Sheet",
    category: "Financial Audits",
    type: "PDF Document",
    size: "860 KB",
    period: "FY 2023–2024",
    description: "Certified audit report prepared by statutory independent chartered accountants covering balance sheet, income/expenditure, and line-item deployment.",
    fileUrl: "/reports/audited-financial-summary-2023-24.pdf",
    highlight: false,
  },
  {
    id: "80g-12a",
    title: "80G & 12A Tax Exemption Certificates",
    category: "Statutory Filings",
    type: "PDF Document",
    size: "520 KB",
    period: "Active & Perpetual",
    description: "Official Income Tax Department certification granting 50% tax exemption under Section 80G and institutional registration under Section 12A.",
    fileUrl: "/reports/80g-12a-tax-exemption-certificate.pdf",
    highlight: false,
  },
  {
    id: "csr-1",
    title: "Ministry of Corporate Affairs CSR-1 Registration",
    category: "Statutory Filings",
    type: "PDF Document",
    size: "410 KB",
    period: "Government Registered",
    description: "Official MCA Form CSR-1 filing confirmation authorizing Yuva Ekta India Foundation to undertake corporate CSR funding under Section 135.",
    fileUrl: "/reports/csr-1-registration-mca.pdf",
    highlight: false,
  },
  {
    id: "society-reg",
    title: "Haryana Societies Registration (Reg. No. 03485)",
    category: "Legal Formation",
    type: "PDF Document",
    size: "480 KB",
    period: "Reg. 21 Nov 2018",
    description: "Foundational registration under Haryana Registration and Regulation of Societies Act, 2012 by District Registrar, Gurugram.",
    fileUrl: "/reports/society-registration-certificate.pdf",
    highlight: false,
  },
  {
    id: "darpan",
    title: "NITI Aayog NGO Darpan Registration Certificate",
    category: "Government Portals",
    type: "PDF Document",
    size: "390 KB",
    period: "Verified NGO",
    description: "Official verification on the Government of India NITI Aayog NGO Darpan portal establishing verified institutional credentials.",
    fileUrl: "/reports/niti-aayog-darpan-certificate.pdf",
    highlight: false,
  },
];
*/

const SCHEDULE_VII_PILLARS = [
  {
    scheduleItem: "Schedule VII Item (ii) · Education",
    title: "Remedial Learning & School Libraries",
    project: "Sakshar Sohna",
    beneficiaries: "200+ dropout & at-risk children enrolled",
    kpis: "1,000+ children mainstreamed into regular government schools",
    icon: BookOpen,
    desc: "Hourly remedial tutoring by trained grassroots educators, paired with student-managed Baal Pustakalayas (libraries) inside government schools.",
    color: "brand-pink",
  },
  {
    scheduleItem: "Schedule VII Item (ii) · Vocational Skills",
    title: "Digital Literacy & Employment Skills",
    project: "Digital Saksharta",
    beneficiaries: "240 children & youth trained annually",
    kpis: "30 computers + printer operating 7 days a week at Sehjawas",
    icon: Laptop,
    desc: "Free weekday foundational computing for children and weekend job-readiness workshops (data entry, digital tools) for rural job-seekers.",
    color: "brand-green",
  },
  {
    scheduleItem: "Schedule VII Item (iii) · Women Empowerment",
    title: "Women's Stitching & Micro-Enterprise",
    project: "Mahila Ajeevika",
    beneficiaries: "50 rural women trained with sewing machines",
    kpis: "Average ₹5,000/month supplemental household income",
    icon: HeartHandshake,
    desc: "Provides sewing machinery, raw materials, and business training to enable rural women to secure market linkages and financial autonomy.",
    color: "brand-terra",
  },
  {
    scheduleItem: "Schedule VII Item (i) · Malnutrition & Hunger",
    title: "Daily Nutrition for Malnourished Children",
    project: "Swastha Sohna",
    beneficiaries: "100 free meal packets distributed daily",
    kpis: "365 days / year unbroken operations with Taj Gateway Resort",
    icon: Apple,
    desc: "Daily distribution of verified nutritious food packets to malnourished children and those fighting critical health conditions in Sohna Block.",
    color: "brand-brown",
  },
];

export default function CSRPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#1B1B1B] text-white overflow-hidden">
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(191,52,117,0.25)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(111,166,86,0.15)_0%,transparent_50%)]" />

        <div className="container relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-pink font-bold">CSR Partnerships</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Building2 size={13} className="text-brand-pink" />
              <span>Section 135 & Schedule VII Compliant</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-playfair leading-[1.1] text-white tracking-tight">
              Institutional CSR Partnerships & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-pink via-[#E85D9E] to-brand-green bg-clip-text text-transparent">
                Programme Reports
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-inter font-light leading-relaxed max-w-3xl">
              Yuva Ekta India Foundation is an MCA-registered, audit-verified non-profit partner empowering grassroots communities across rural Gurugram. We provide complete statutory compliance, traceable fund utilization, and institutional project documentation.
            </p>

            {/* Statutory Compliance Pills */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                <CheckCircle2 size={14} className="text-brand-green" />
                <span>MCA Form CSR-1 Registered</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                <ShieldCheck size={14} className="text-brand-pink" />
                <span>80G & 12A Tax Exemption</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                <Award size={14} className="text-amber-400" />
                <span>Haryana Societies Reg. 03485</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                <TrendingUp size={14} className="text-emerald-400" />
                <span>NITI Aayog NGO Darpan Verified</span>
              </div>
            </div>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <Link
                href="/impact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-pink text-white font-bold text-sm shadow-lg shadow-brand-pink/30 hover:bg-brand-pink-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span>Explore On-Ground Impact</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <a
                href="#reports"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <Download size={15} />
                <span>Download Reports</span>
              </a> */}
              <a
                href="#csr-contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all"
              >
                <span>Request CSR Proposal</span>
              </a>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black font-playfair text-white">50,000+</p>
              <p className="text-xs sm:text-sm text-white/60 font-medium">Lives Directly Impacted</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black font-playfair text-brand-pink">1,000+</p>
              <p className="text-xs sm:text-sm text-white/60 font-medium">Children Mainstreamed</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black font-playfair text-brand-green">88%</p>
              <p className="text-xs sm:text-sm text-white/60 font-medium">Direct Field Deployment</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black font-playfair text-amber-400">100%</p>
              <p className="text-xs sm:text-sm text-white/60 font-medium">Audited & Traceable</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Downloadable Reports & Compliance Documents Repository (Temporarily Commented Out) */}
      {/*
      <section id="reports" className="py-20 md:py-28 bg-[#FAF8F5] scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-brand-pink font-bold text-xs uppercase tracking-[0.3em] block">
              Official Documentation Archive
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-brown font-playfair">
              Download Programme Reports & Filings
            </h2>
            <p className="text-brand-brown/70 font-inter font-light text-sm sm:text-base">
              All statutory certificates, audited financial statements, and annual reports are archived here for transparent due diligence by CSR committees and institutional grant makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {COMPLIANCE_DOCS.map((doc) => (
              <div
                key={doc.id}
                className={`bg-white rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 ${
                  doc.highlight
                    ? "border-brand-pink/30 ring-1 ring-brand-pink/20 shadow-md"
                    : "border-brand-brown/10 hover:border-brand-pink/30"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center">
                      <FileText size={22} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-brown/5 text-brand-brown/70">
                      {doc.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black font-playfair text-brand-brown group-hover:text-brand-pink transition-colors leading-snug">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-brand-brown/50 mt-1 font-mono">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.period}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-brown/70 font-inter font-light leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-brown/5">
                  <a
                    href={doc.fileUrl}
                    download
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all bg-brand-brown/5 hover:bg-brand-pink hover:text-white text-brand-brown active:scale-95"
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-brand-brown/60 font-medium">
              Need custom due-diligence documentation or past year physical audits?{" "}
              <a href="#csr-contact" className="text-brand-pink font-bold hover:underline">
                Request custom compliance pack →
              </a>
            </p>
          </div>
        </div>
      </section>
      */}

      {/* 3. Schedule VII Aligned Intervention Pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-green font-bold text-xs uppercase tracking-[0.3em] block">
              Companies Act 2013 Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-brown font-playfair">
              Eligible CSR Focus Pillars
            </h2>
            <p className="text-brand-brown/70 font-inter font-light text-sm sm:text-base">
              All ongoing programmes strictly qualify under Schedule VII of the Companies Act, 2013, offering turnkey execution and monthly impact tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {SCHEDULE_VII_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-[#FAF8F5] border border-brand-brown/10 rounded-3xl p-8 sm:p-10 space-y-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-brand-pink uppercase tracking-wider block">
                        {pillar.scheduleItem}
                      </span>
                      <h3 className="text-2xl font-black font-playfair text-brand-brown">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-bold text-brand-green uppercase tracking-wide">
                        Core Programme: {pillar.project}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-brand-brown shadow-sm border border-brand-brown/5 flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-brand-pink" />
                    </div>
                  </div>

                  <p className="text-sm text-brand-brown/75 font-inter font-light leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-brown/10">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-brand-brown/50">Beneficiaries</p>
                      <p className="text-xs font-bold text-brand-brown">{pillar.beneficiaries}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-brand-brown/50">Verified KPI</p>
                      <p className="text-xs font-bold text-brand-brown">{pillar.kpis}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Fund Utilization & Financial Deployment Transparency */}
      <section className="py-20 md:py-24 bg-[#1F1916] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-brand-pink font-bold text-xs uppercase tracking-[0.3em] block">
                Financial Accountability
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-playfair text-white leading-tight">
                88% Direct Field Deployment Ratio
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-inter font-light leading-relaxed">
                Corporate funds are deployed with zero leakage. Every rupee is mapped to educator salaries, digital hardware, student learning supplies, or meal procurement in Sohna Block.
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold">
                  <CheckCircle2 size={15} className="text-brand-green" />
                  <span>Unique serial receipt with QR tracking for every disbursement</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 backdrop-blur-md">
              <h3 className="text-lg font-bold font-playfair text-white">How Every ₹100 is Allocated:</h3>

              {/* Graphical Stacked Bar */}
              <div className="w-full h-8 rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: "88%" }} className="bg-brand-pink flex items-center justify-center text-[10px] font-bold text-white">
                  88%
                </div>
                <div style={{ width: "7%" }} className="bg-brand-green flex items-center justify-center text-[10px] font-bold text-white">
                  7%
                </div>
                <div style={{ width: "5%" }} className="bg-amber-400 flex items-center justify-center text-[10px] font-bold text-black">
                  5%
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-brand-pink shrink-0 mt-1" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-white">88%</span>
                      <span className="text-sm font-bold text-white/90">Direct Field Programme Delivery</span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">
                      Educator stipends, Baal Pustakalaya books, student kits, computer hardware, stitching raw materials, meal packets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-brand-green shrink-0 mt-1" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-white">7%</span>
                      <span className="text-sm font-bold text-white/90">Centre Rents & Village Infrastructure</span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">
                      Sehjawas Village Centre lease, electricity, high-speed broadband connection, and facility upkeep.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-amber-400 shrink-0 mt-1" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-white">5%</span>
                      <span className="text-sm font-bold text-white/90">Audits, Administration & Statutory Filings</span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">
                      Independent chartered accountant audit fees, statutory ROC filings, banking transaction costs, compliance maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Photographic Proof of Work */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-brand-pink font-bold text-xs uppercase tracking-[0.3em] block">
              Field Execution Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-brown font-playfair">
              Verified Grassroots Operations
            </h2>
            <p className="text-brand-brown/70 font-inter font-light text-sm sm:text-base">
              Direct photographs from village centres in Sohna Block, Gurugram. Corporate partners are warmly welcomed to schedule field inspection visits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
              <Image
                src="/campaign/yuva_ekta_01.jpeg"
                alt="Sakshar Sohna Classroom"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">Sakshar Sohna</p>
                  <p className="text-sm font-bold text-white">Remedial Classes & Baal Pustakalaya</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
              <Image
                src="/campaign/yuva_ekta_02.jpeg"
                alt="Digital Saksharta Computer Lab"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Digital Saksharta</p>
                  <p className="text-sm font-bold text-white">Sehjawas Village Digital Lab</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
              <Image
                src="/campaign/yuva_ekta_03.jpeg"
                alt="Mahila Ajeevika Women Collective"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Mahila Ajeevika</p>
                  <p className="text-sm font-bold text-white">Rural Women Stitching Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CSR Partnership Proposal Request & Contact Section */}
      <section id="csr-contact" className="py-20 md:py-28 bg-[#FAF8F5] scroll-mt-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-brand-pink font-bold text-xs uppercase tracking-[0.3em] block">
                  Partner With Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-brown font-playfair leading-tight">
                  Request a Customized CSR Proposal
                </h2>
                <p className="text-sm sm:text-base text-brand-brown/75 font-inter font-light leading-relaxed">
                  Connect directly with our institutional partnerships team. We design bespoke CSR proposals aligned with your company&apos;s thematic focus areas, budget cycles, and ESG reporting goals.
                </p>
              </div>

              {/* Direct Institutional Contacts */}
              <div className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-brand-brown/10 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-brown/60">
                  Institutional Outreach Desk
                </h3>
                <div className="space-y-3.5 text-sm text-brand-brown">
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-brand-pink shrink-0 mt-0.5" />
                    <div>
                      <a href="tel:+918569923173" className="font-bold hover:text-brand-pink block">+91 85699 23173</a>
                      <a href="tel:+919990911405" className="font-bold hover:text-brand-pink block">+91 99909 11405</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-brand-pink shrink-0" />
                    <a href="mailto:yuvaekta2018@gmail.com" className="font-bold hover:text-brand-pink">
                      yuvaekta2018@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-pink shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed text-brand-brown/80 font-medium">
                      Damdama Lake Road, Vill. Bahelpa / Sehjawas, Sohna Block, Gurugram, Haryana – 122102
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive CSR Form */}
            <div className="lg:col-span-7">
              <CSRContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
