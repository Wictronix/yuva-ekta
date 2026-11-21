"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { FOCUS_AREAS } from "@/lib/constants";
import { BookOpen, HeartPulse, Leaf, HandHeart, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, { icon: LucideIcon; bg: string; text: string; border: string; glow: string }> = {
    Education: {
        icon: BookOpen,
        bg: "bg-orange-50",
        text: "text-orange-500",
        border: "border-orange-100",
        glow: "group-hover:shadow-orange-100",
    },
    Healthcare: {
        icon: HeartPulse,
        bg: "bg-rose-50",
        text: "text-rose-500",
        border: "border-rose-100",
        glow: "group-hover:shadow-rose-100",
    },
    Environment: {
        icon: Leaf,
        bg: "bg-emerald-50",
        text: "text-emerald-500",
        border: "border-emerald-100",
        glow: "group-hover:shadow-emerald-100",
    },
    "Women Empowerment": {
        icon: HandHeart,
        bg: "bg-purple-50",
        text: "text-purple-500",
        border: "border-purple-100",
        glow: "group-hover:shadow-purple-100",
    },
};

export default function FocusAreas() {
    return (
        <section id="focus-areas" className="py-24 bg-white scroll-mt-20">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-16">
                    <m.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.3em] mb-4"
                    >
                        What We Work On
                    </m.span>
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-brand-brown font-playfair mb-6"
                    >
                        Four Areas. One Mission.
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-brown/70 max-w-2xl text-base sm:text-lg font-inter"
                    >
                        Everything we do is designed to create lasting change at the grassroot level
                        by addressing the most critical needs of rural Gurugram.
                    </m.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FOCUS_AREAS.map((area, i) => {
                        const styleInfo = ICON_MAP[area.title] || {
                            icon: Sparkles,
                            bg: "bg-pink-50",
                            text: "text-brand-pink",
                            border: "border-pink-100",
                            glow: "group-hover:shadow-pink-100",
                        };
                        const Icon = styleInfo.icon;

                        return (
                            <m.div
                                key={area.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-brown/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Top colored indicator line */}
                                    <div
                                        className="h-1 w-12 rounded-full mb-6 transition-all duration-300 group-hover:w-20"
                                        style={{ backgroundColor: area.color }}
                                    />

                                    {/* Icon container */}
                                    <div
                                        className={`w-16 h-16 rounded-2xl ${styleInfo.bg} ${styleInfo.border} border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                                    >
                                        <Icon size={28} className={styleInfo.text} strokeWidth={2} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 font-playfair">
                                        {area.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-brand-brown/70 leading-relaxed font-inter">
                                        {area.desc}
                                    </p>
                                </div>
                            </m.div>
                        );
                    })}
                </div>

                {/* Explore Impact CTA */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-14 flex items-center justify-center text-center"
                >
                    <Link
                        href="/impact"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-pink text-white font-bold text-sm shadow-xl shadow-brand-pink/20 hover:bg-brand-pink-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                    >
                        <span>Explore Our On-Ground Impact</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </m.div>
            </div>
        </section>
    );
}
