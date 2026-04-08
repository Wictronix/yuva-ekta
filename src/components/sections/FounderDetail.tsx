"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export default function FounderDetail() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="/campaign/yuva_ekta_01.jpeg" // Using existing authentic image
                            alt="Balram Kumar"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="text-sm uppercase tracking-[0.3em] font-bold mb-2">Founder & Social Worker</p>
                            <h3 className="text-4xl font-black font-playfair tracking-tight text-white">Balram Kumar</h3>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.3em] block">Meet the Founder</span>
                            <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair leading-tight">
                                Driven by <span className="italic text-brand-pink">Service</span>
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {[
                                "Mentored by Dr. Kiran Bedi",
                                "Recognised by Haryana Govt.",
                                "Commended by Gurugram Police"
                            ].map((badge) => (
                                <div key={badge} className="flex items-center gap-2 px-4 py-2 bg-brand-pink/5 border border-brand-pink/20 rounded-xl text-xs font-bold text-brand-pink uppercase tracking-widest shadow-sm">
                                    <BadgeCheck size={14} />
                                    {badge}
                                </div>
                            ))}
                        </div>

                        <div className="prose prose-lg text-brand-brown/75 font-inter font-light leading-relaxed space-y-6">
                            <p>
                                Balram Kumar has dedicated his life to community service in the villages around Sohna Block, Gurugram. A social worker by calling, he was mentored and trained by <strong>Dr. Kiran Bedi</strong>, whose lifelong commitment to grassroot change shaped how he approaches every challenge.
                            </p>
                            <p>
                                Under Balram Kumar's leadership, YEIF has grown from a single remedial class to four active projects, seven community programmes, and a network of partnerships with corporations, charitable trusts, and civic bodies.
                            </p>
                        </div>

                        <div className="p-8 bg-brand-pink/5 rounded-3xl border border-brand-pink/10 relative overflow-hidden">
                            <span className="absolute -top-6 -left-2 text-9xl text-brand-pink/10 font-playfair pointer-events-none">"</span>
                            <blockquote className="relative z-10 text-xl text-brand-brown font-playfair italic leading-relaxed">
                                I don't see myself as running an NGO. I see myself as belonging to this community and doing what any responsible member of a community should do.
                            </blockquote>
                            <cite className="block mt-4 text-xs font-bold text-brand-pink uppercase tracking-widest not-italic">
                                Balram Kumar
                            </cite>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
