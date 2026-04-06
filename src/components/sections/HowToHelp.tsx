"use client";

import { motion } from "framer-motion";
import { WAYS_TO_HELP } from "@/lib/projects";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useDonation } from "../providers/DonationProvider";

export default function HowToHelp() {
    const { openDonationModal } = useDonation();
    return (
        <section className="py-24 bg-brand-pink relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-black rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white/80 font-bold text-[10px] uppercase tracking-[0.3em] mb-4"
                    >
                        Get Involved
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white mb-6 font-playfair"
                    >
                        Three Ways to Make a Difference
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {WAYS_TO_HELP.map((way, i) => {
                        const Icon = (Icons as any)[way.icon] as LucideIcon;
                        const isDonate = way.cta.label === 'Donate Now';
                        return (
                            <motion.div
                                key={way.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-white transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white text-brand-pink flex items-center justify-center mb-8 shadow-xl group-hover:bg-brand-pink group-hover:text-white transition-colors">
                                    {Icon && <Icon size={32} strokeWidth={1.5} />}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 font-playfair group-hover:text-gray-900 transition-colors">{way.title}</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-10 group-hover:text-gray-900 transition-colors font-inter font-light">
                                    {way.description}
                                </p>
                                {isDonate ? (
                                    <button
                                        onClick={() => openDonationModal()}
                                        className="mt-auto px-8 py-3 bg-white text-brand-pink rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all group-hover:bg-brand-pink group-hover:text-white"
                                    >
                                        {way.cta.label}
                                    </button>
                                ) : (
                                    <Link
                                        href={way.cta.href}
                                        className="mt-auto px-8 py-3 bg-white text-brand-pink rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all group-hover:bg-brand-pink group-hover:text-white"
                                    >
                                        {way.cta.label}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

