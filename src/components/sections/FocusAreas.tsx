"use client";

import { motion } from "framer-motion";
import { FOCUS_AREAS } from "@/lib/constants";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export default function FocusAreas() {
    return (
        <section id="focus-areas" className="py-24 bg-white scroll-mt-20">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4"
                    >
                        What We Work On
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black gradient-text-desi mb-6"
                    >
                        Four Areas. One Mission.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-brown/70 max-w-2xl"
                    >
                        Everything we do is designed to create lasting change at the grassroot level
                        by addressing the most critical needs of our community.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FOCUS_AREAS.map((area, i) => {
                        const Icon = (Icons as any)[area.icon] as LucideIcon;
                        return (
                            <motion.div
                                key={area.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="desi-card group"
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                                    style={{ backgroundColor: `${area.color}20`, color: area.color }}
                                >
                                    {Icon && <Icon size={32} strokeWidth={1.5} />}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">{area.title}</h3>
                                <p className="text-sm text-brand-brown/70 leading-relaxed">
                                    {area.desc}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More
                                    <Icons.ArrowRight size={14} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
