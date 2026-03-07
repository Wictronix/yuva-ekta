"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECT_CARDS } from "@/lib/projects";

export default function FeaturedProjects() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.3em] mb-4"
                    >
                        Our Active Projects
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-playfair"
                    >
                        Projects That Change Lives
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted max-w-2xl font-inter"
                    >
                        Each project targets a specific gap — together they address education,
                        livelihoods, and survival for Gurugram's rural communities.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {PROJECT_CARDS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6">
                                    <span
                                        className="px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg"
                                        style={{ backgroundColor: project.badgeColor }}
                                    >
                                        {project.badge}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="text-[10px] text-muted uppercase tracking-widest font-bold block mb-1">
                                        Supported by {project.supporter}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 font-playfair">{project.name}</h3>
                                </div>
                                <p className="text-muted text-sm leading-relaxed mb-8 flex-1 font-inter">
                                    {project.summary}
                                </p>
                                <Link
                                    href={project.href}
                                    className="inline-flex items-center gap-2 text-brand-pink font-bold uppercase tracking-widest text-xs group/link"
                                >
                                    Learn More
                                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
