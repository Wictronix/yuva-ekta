"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PARTNERS } from "@/lib/projects";
import { Handshake, CheckCircle2, ArrowRight } from "lucide-react";

export default function Partners() {
    return (
        <section className="py-12 sm:py-16 bg-white border-y border-brand-brown/5 relative overflow-hidden">
            {/* Subtle background ambient blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-pink/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2.5">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/5 border border-brand-pink/15 text-brand-pink text-[10px] font-bold uppercase tracking-wider"
                    >
                        <Handshake size={12} />
                        <span>Institutional Ecosystem</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl font-black text-brand-brown font-playfair"
                    >
                        Alliances Making Change Possible
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-brand-brown/70 font-inter font-light text-xs sm:text-sm leading-relaxed"
                    >
                        Collaborating with trusted foundations, hospitality partners, and trusts to sustain grassroots initiatives in Gurugram.
                    </motion.p>
                </div>

                {/* Compact 4-Card Modern Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
                    {PARTNERS.map((partner, i) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className="group relative bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 sm:p-5 border border-brand-brown/10 hover:border-brand-pink/30 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                {/* Top Monogram & Role Pill */}
                                <div className="flex items-center justify-between gap-2">
                                    <div 
                                        className="w-9 h-9 rounded-xl flex items-center justify-center font-playfair font-black text-xs text-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                                        style={{ backgroundColor: partner.color }}
                                    >
                                        {partner.initials}
                                    </div>
                                    <span className="px-2 py-0.5 rounded-md bg-white border border-brand-brown/10 text-[9px] font-bold uppercase tracking-wide text-brand-brown/70 group-hover:border-brand-pink/20 group-hover:text-brand-pink transition-colors">
                                        {partner.role}
                                    </span>
                                </div>

                                {/* Partner Name */}
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold font-playfair text-brand-brown leading-snug group-hover:text-brand-pink transition-colors">
                                        {partner.name}
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-brand-brown/65 font-inter font-light leading-snug mt-1.5">
                                        {partner.impact}
                                    </p>
                                </div>
                            </div>

                            {/* Minimal Footer */}
                            <div className="pt-3 mt-3 border-t border-brand-brown/5 flex items-center justify-between text-[10px] text-brand-brown/50">
                                <span className="flex items-center gap-1 font-medium text-emerald-700 text-[10px]">
                                    <CheckCircle2 size={11} className="text-brand-green" />
                                    <span>Verified Supporter</span>
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink/30 group-hover:bg-brand-pink transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Partnership Invitation */}
                <div className="mt-8 sm:mt-10 text-center">
                    <Link
                        href="/csr"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink hover:text-brand-pink-dark transition-colors group"
                    >
                        <span>Explore CSR Alliances & Corporate Partnerships</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
