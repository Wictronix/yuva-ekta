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
        <section id={id} className="py-24 bg-white scroll-mt-20">
            <div className="container">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group ${reverse ? 'lg:order-2' : ''}`}
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-8 left-8">
                            <div className="bg-brand-green text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                                <BadgeCheck size={14} />
                                Supported by {supporter}
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`space-y-10 ${reverse ? 'lg:order-1' : ''}`}
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair leading-tight">
                                {name}
                            </h2>
                            <p className="text-xl text-brand-pink font-playfair italic font-medium">
                                {tagline}
                            </p>
                        </div>

                        <div className="space-y-6 text-brand-brown/70 font-inter font-light leading-relaxed text-lg">
                            {description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {/* Stats Box */}
                        <div className="bg-brand-offwhite/50 border border-brand-brown/5 rounded-[2.5rem] p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60">{stat.label}</p>
                                        <p className="text-lg font-bold text-brand-brown">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-brand-brown/10 pt-8">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60">Funding breakdown</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {fundingHeads.map((head) => (
                                        <li key={head} className="flex items-center gap-2 text-sm text-brand-brown/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                                            {head}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => openDonationModal()}
                                className="w-full bg-brand-pink text-white font-bold py-5 rounded-2xl shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-3 hover:bg-brand-pink/90 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <span>Adopt This Project — {monthlyRequirement}/month</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
