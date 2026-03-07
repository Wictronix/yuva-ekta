"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionMission() {
    return (
        <section className="py-24 bg-brand-offwhite/50 relative">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Vision Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-pink/5 border-l-8 border-brand-pink p-12 rounded-3xl space-y-6 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-brand-pink text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-pink/20">
                                <Eye size={28} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.4em] font-bold text-brand-pink">Our Vision</span>
                        </div>
                        <h3 className="text-3xl font-black text-brand-brown font-playfair">Empowerment</h3>
                        <p className="text-lg text-brand-brown/70 font-inter font-light leading-relaxed">
                            To empower grassroot communities of Gurugram through direct interventions in Remedial Education, Life Skills Education, Livelihood, and Community Health and Nutrition.
                        </p>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-green/5 border-l-8 border-brand-green p-12 rounded-3xl space-y-6 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/20">
                                <Target size={28} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.4em] font-bold text-brand-green">Our Mission</span>
                        </div>
                        <h3 className="text-3xl font-black text-brand-brown font-playfair">Leadership</h3>
                        <p className="text-lg text-brand-brown/70 font-inter font-light leading-relaxed">
                            To be a leader in Community Development Initiatives through Projects and Campaigns aligned with achieving the Sustainable Development Goals — building communities that no longer need us.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
