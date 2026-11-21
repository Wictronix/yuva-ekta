"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";

export default function AboutTeaser() {
    return (
        <section className="py-24 bg-brown-light overflow-hidden">
            <div className="container overflow-visible">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 relative group">
                        <m.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
                        >
                            <Image
                                src="/campaign/yuva_ekta_01.jpeg"
                                alt="Balram Kumar with community"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                quality={60}
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
                        </m.div>

                        {/* Decorative Frame */}
                        <m.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/20 rounded-[2.5rem] z-0"
                        />

                        <div className="absolute bottom-6 left-6 right-6 z-20 p-5 sm:p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-2 px-3 py-1 bg-brand-pink/30 rounded-full border border-brand-pink/40 text-white text-[11px] font-bold uppercase tracking-widest mb-2.5 w-fit shadow-sm">
                                <Award size={13} className="text-brand-pink-tint" />
                                <span>Reg. No. 03485</span>
                            </div>
                            <p className="text-white font-playfair text-lg sm:text-xl italic font-semibold leading-snug drop-shadow-md">
                                &ldquo;Real change happens closest<br className="hidden sm:inline" /> to the ground.&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="w-full lg:w-1/2">
                        <m.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block"
                        >
                            Who We Are
                        </m.span>
                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight font-playfair"
                        >
                            Yuva Ekta India Foundation: Top NGO in Gurugram
                        </m.h2>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-brand-brown/80 leading-relaxed"
                        >
                            <p>
                                <strong>Yuva Ekta India Foundation</strong> is a youth-led, community-focused NGO based in Gurugram,
                                registered under the Haryana Registration and Regulation of Societies Act, 2012.
                                We deliver direct impact in <strong>remedial education</strong>, <strong>healthcare</strong>,
                                and <strong>women empowerment</strong> across Sohna block and rural NCR.
                            </p>
                            <div className="bg-brand-pink/5 p-6 rounded-2xl border border-brand-pink/10 space-y-3">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-pink">Key Impact Highlights</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                                    <li className="flex items-center gap-2 text-brand-brown">
                                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                                        <span>1,000+ Children Educated</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-brand-brown">
                                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                                        <span>100+ Malnourished Children Fed</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-brand-brown">
                                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                                        <span>50+ Women Livelihoods Created</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-brand-brown">
                                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                                        <span>12A & 80G Certified NGO</span>
                                    </li>
                                </ul>
                            </div>
                            <p>
                                Founded on 21 November 2018 by Mr. Balram Kumar - a social worker mentored and trained by
                                <strong> Dr. Kiran Bedi</strong>, India&apos;s first female IPS officer. Our foundation has grown from
                                a handful of children in a single room to a multi-project NGO serving over 1,000 lives.
                            </p>
                        </m.div>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-12 flex flex-wrap gap-8 items-center"
                        >
                            <Link
                                href="/about"
                                className="group flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm"
                            >
                                Read Our Full Story
                                <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white group-hover:translate-x-1">
                                    <ArrowRight size={18} />
                                </span>
                            </Link>

                            <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
                                <div className="flex -space-x-3">
                                    {[
                                        "/campaign/yuva_ekta_01.jpeg",
                                        "/campaign/yuva_ekta_02.jpeg",
                                        "/campaign/yuva_ekta_03.jpeg",
                                        "/campaign/yuva-ekta-03.png"
                                    ].map((src, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                                            <Image
                                                src={src}
                                                alt={`volunteer ${i + 1}`}
                                                fill
                                                sizes="40px"
                                                quality={60}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-900 font-bold text-sm">50+ Volunteers</span>
                                    <span className="text-[10px] text-brand-brown/60 uppercase tracking-tighter">Joined the movement</span>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
