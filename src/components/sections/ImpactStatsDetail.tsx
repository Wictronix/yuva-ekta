"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, Heart, Calendar } from "lucide-react";

const impactDetails = [
    {
        icon: GraduationCap,
        value: "1,000+",
        label: "Children Educated",
        description: "Mainstreamed from dropouts to formal schools through our remedial classes in Sohna Block.",
        color: "brand-pink"
    },
    {
        icon: Users,
        value: "100+",
        label: "Women Empowered",
        description: "Trained in tailoring and entrepreneurship, now contributing to household incomes.",
        color: "brand-green"
    },
    {
        icon: Heart,
        value: "100",
        label: "Children Fed Daily",
        description: "Nutritious food packets provided every single day to malnourished children in Sehjawas.",
        color: "brand-terra"
    },
    {
        icon: Calendar,
        value: "7+",
        label: "Years of Service",
        description: "Registered in 2018, operating on the ground for over seven years across Gurugram.",
        color: "brand-brown"
    }
];

export default function ImpactStatsDetail() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {impactDetails.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] bg-brand-offwhite/50 border border-brand-brown/5 text-center group hover:bg-white hover:shadow-2xl transition-all duration-500"
                        >
                            <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}
                                style={{ backgroundColor: `var(--color-${stat.color})` }}>
                                <stat.icon size={32} />
                            </div>
                            <h3 className="text-4xl font-black text-brand-brown font-playfair mb-2">{stat.value}</h3>
                            <p className="text-brand-pink font-bold text-xs uppercase tracking-widest mb-4">{stat.label}</p>
                            <p className="text-brand-brown/60 font-inter text-sm leading-relaxed">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
