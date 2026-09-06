"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { useDonation } from "../providers/DonationProvider";

interface ProjectDetailProps {
    id: string;
    name: string;
    tagline: string;
    supporter: string;
    image: string;
    description: string[];
    stats: {
        label: string;
        value: string;
    }[];
    fundingHeads: string[];
    monthlyRequirement: string;
    reverse?: boolean;
}

export default function ProjectDetail({
    id,
    name,
    tagline,
    supporter,
    image,
    description,
    stats,
    fundingHeads,
    monthlyRequirement,
    reverse = false
}: ProjectDetailProps) {
    const { openDonationModal } = useDonation();
    return (
        <section id={id} className="py-20 md:py-24 bg-white scroll-mt-20">
            <div className="container">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`lg:sticky lg:top-28 h-fit ${reverse ? 'lg:order-2' : ''}`}
                    >
                        <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-brand-brown/5">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 z-10">
                                <div className="bg-brand-green/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 border border-white/10">
                                    <BadgeCheck size={14} />
                                    <span>Supported by {supporter}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`space-y-8 ${reverse ? 'lg:order-1' : ''}`}
                    >
                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-brown font-playfair leading-tight">
                                {name}
                            </h2>
                            <p className="text-lg sm:text-xl text-brand-pink font-playfair italic font-medium">
                                {tagline}
                            </p>
                        </div>

                        <div className="space-y-5 text-brand-brown/70 font-inter font-light leading-relaxed text-base sm:text-lg">
                            {description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {/* Stats Box */}
                        <div className="bg-brand-offwhite/60 border border-brand-brown/10 rounded-3xl p-6 sm:p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60">{stat.label}</p>
                                        <p className="text-base sm:text-lg font-black text-brand-brown">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-brand-brown/10 pt-6">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60">Funding breakdown</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {fundingHeads.map((head) => (
                                        <li key={head} className="flex items-center gap-2 text-xs sm:text-sm text-brand-brown/70 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                                            <span>{head}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => openDonationModal()}
                                className="w-full bg-brand-pink text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2 hover:bg-brand-pink/90 hover:scale-[1.01] active:scale-95 transition-all text-sm tracking-wide"
                            >
                                <span>Adopt Project · {monthlyRequirement}/mo</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
