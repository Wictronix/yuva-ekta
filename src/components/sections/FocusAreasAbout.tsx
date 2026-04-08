"use client";

import { motion } from "framer-motion";
import { BookOpen, Monitor, Briefcase, HeartPulse } from "lucide-react";

const detailedFocusSession = [
    {
        icon: BookOpen,
        title: 'Remedial Education',
        content: "We run hourly classes across multiple centres in Sohna Block, using a structured curriculum that builds reading, writing, arithmetic, and comprehension skills. Our educators are trained community members not outsiders. We also run village libraries inside government schools and train student librarians who maintain them independently.",
        color: 'brand-pink',
    },
    {
        icon: Monitor,
        title: 'Digital Literacy',
        content: "Our Digital Learning Centre in Sehjawas Village runs Monday to Friday for children aged 6–16 and opens on weekends for employability workshops for rural youth. 30 computers, one printer, and a dedicated trainer make this the only free digital education facility in the area.",
        color: 'brand-green',
    },
    {
        icon: Briefcase,
        title: "Women's Livelihood",
        content: "Mahila Ajeevika is not a charity. It is a business training programme. Women learn stitching and tailoring, receive machines and raw materials, and are then helped to set up stalls, procure orders, and build micro-enterprises. The target is not just skill. It is income, independence, and standing in the household.",
        color: 'brand-terra',
    },
    {
        icon: HeartPulse,
        title: 'Health & Nutrition',
        content: "Every day, 100 malnourished children and children with critical illnesses receive free food packets through Swastha Sohna. We partner with Dil se Mehek (heart disease and cancer) and One Each One Feed (severe malnourishment) to identify and serve the most vulnerable children.",
        color: 'brand-brown',
    },
];

export default function FocusAreasAbout() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="mb-16 space-y-4">
                    <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Our Work in Detail</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair">Four Focus Areas, <span className="italic text-brand-pink text-opacity-80">Real Results</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {detailedFocusSession.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-10 rounded-[2.5rem] bg-brand-offwhite/50 border border-brand-brown/5 hover:bg-white hover:shadow-2xl hover:shadow-brand-brown/5 transition-all duration-500"
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                                    style={{ backgroundColor: `var(--color-${item.color})` }}>
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-brand-brown font-playfair">{item.title}</h3>
                            </div>
                            <p className="text-brand-brown/70 font-inter font-light leading-relaxed">
                                {item.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
