"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Heart, MapPin, Users } from "lucide-react";

interface CampaignsHeroProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    breadcrumb: { label: string; href?: string }[];
}

export default function CampaignsHero({ title, subtitle, imageUrl, breadcrumb }: CampaignsHeroProps) {
    return (
        <section className="relative h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-brown">
            {/* Background Image with Cinematic Treatment */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    priority
                    className="object-cover brightness-[0.35] contrast-[1.1] scale-105"
                />
            </div>

            {/* Premium Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-brand-brown/40 z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" />

            <div className="container relative z-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Status Badges e.g. Glassmorphism */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/90 shadow-2xl"
                            >
                                <ShieldCheck size={14} className="text-brand-green" />
                                80G Tax Exempted
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/90 shadow-2xl"
                            >
                                <MapPin size={14} className="text-brand-pink" />
                                Based in Gurugram
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/90 shadow-2xl"
                            >
                                <Users size={14} className="text-blue-400" />
                                10,000+ Lives Impacted
                            </motion.div>
                        </div>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center justify-center gap-2 mb-10 text-[11px] uppercase tracking-[0.4em] font-bold text-white/40">
                            {breadcrumb.map((item, index) => (
                                <div key={item.label} className="flex items-center gap-2">
                                    {item.href ? (
                                        <Link href={item.href} className="hover:text-brand-pink transition-all duration-300">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-brand-pink/80">{item.label}</span>
                                    )}
                                    {index < breadcrumb.length - 1 && <ChevronRight size={12} className="opacity-20" />}
                                </div>
                            ))}
                        </nav>

                        <h1 className="text-6xl md:text-9xl font-black text-white mb-10 font-playfair tracking-tight leading-[1] drop-shadow-sm">
                            {title}
                        </h1>

                        <p className="text-xl md:text-3xl text-white/90 max-w-2xl mx-auto font-inter font-light leading-relaxed mb-12 drop-shadow-md">
                            {subtitle}
                        </p>

                    </motion.div>
                </div>
            </div>

            {/* Decorative bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-offwhite to-transparent z-20" />
        </section>
    );
}
