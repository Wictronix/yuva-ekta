"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    breadcrumb: { label: string; href?: string }[];
    cta?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
}

export default function PageHero({ title, subtitle, imageUrl, breadcrumb, cta }: PageHeroProps) {
    return (
        <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-brown">
            {/* Background Image with Cinematic Treatment */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    priority
                    className="object-cover brightness-[0.4] contrast-[1.1] scale-105"
                />
            </div>

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-brand-brown/40 z-10" />

            <div className="container relative z-20 text-center px-6 transition-all duration-700">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-2 mb-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">
                        {breadcrumb.map((item, index) => (
                            <div key={item.label} className="flex items-center gap-2">
                                {item.href ? (
                                    <Link href={item.href} className="hover:text-brand-pink transition-colors">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-brand-pink">{item.label}</span>
                                )}
                                {index < breadcrumb.length - 1 && <ChevronRight size={12} className="opacity-30" />}
                            </div>
                        ))}
                    </nav>

                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 font-playfair tracking-tight leading-[1.1]">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-inter font-light leading-relaxed mb-10">
                            {subtitle}
                        </p>
                    )}

                    {cta && (
                        <div className="mt-4 flex justify-center">
                            {cta.href ? (
                                <Link
                                    href={cta.href}
                                    className="px-12 py-5 bg-brand-pink text-white rounded-full font-bold text-lg hover:bg-brand-pink-dark transition-all transform hover:scale-105 shadow-2xl shadow-brand-pink/30"
                                >
                                    {cta.label}
                                </Link>
                            ) : (
                                <button
                                    onClick={cta.onClick}
                                    className="px-12 py-5 bg-brand-pink text-white rounded-full font-bold text-lg hover:bg-brand-pink-dark transition-all transform hover:scale-105 shadow-2xl shadow-brand-pink/30"
                                >
                                    {cta.label}
                                </button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
