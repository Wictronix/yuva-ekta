"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart, ArrowRight, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { useDonation } from "../providers/DonationProvider";

export default function HeroSection({
    imageUrl = "/campaign/yuva_ekta_02.jpeg"
}: {
    imageUrl?: string
}) {
    const { openDonationModal } = useDonation();

    return (
        <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-brand-brown pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-14">
            {/* Background with cinematic treatment */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt="Yuva Ekta Rural Gurugram Outreach"
                    fill
                    priority
                    sizes="100vw"
                    quality={75}
                    className="object-cover brightness-[0.36] contrast-[1.15] scale-105"
                />
            </div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/60 via-brand-brown/25 to-brand-brown/95 z-10" />
            <div className="absolute -top-32 left-1/4 w-[500px] h-[350px] bg-brand-pink/20 rounded-full blur-[140px] pointer-events-none z-10" />

            <div className="container relative z-20 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Text Outside the Card */}
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:col-span-7 flex flex-col items-start text-left"
                    >
                        {/* Institutional Trust Pill */}
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold mb-2.5 sm:mb-4 text-white shadow-md">
                            <ShieldCheck size={14} className="text-brand-pink flex-shrink-0" />
                            <span>Haryana Govt. Reg. 03485 · 80G Certified · NITI Aayog Verified</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-black mb-2 sm:mb-3 leading-[1.15] sm:leading-[1.1] tracking-tight text-white font-playfair drop-shadow-2xl">
                            Empowering Rural Gurugram <br />
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-pink-400 to-[#E05C94]">
                                One Child, One Family
                            </span>{" "}
                            at a Time.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-base text-white/90 max-w-xl leading-relaxed font-inter font-light">
                            A grassroots foundation delivering free quality education, digital literacy,
                            healthcare, and daily nutrition to underprivileged children and families formal systems leave behind.
                        </p>
                    </m.div>

                    {/* Right Column: Unified Card with Metrics on Top & Buttons Below */}
                    <m.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
                    >
                        <div className="backdrop-blur-xl bg-black/45 border border-white/20 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col gap-3.5 sm:gap-5">
                            {/* Subtle top sheen */}
                            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-pink">
                                    Verified Impact
                                </span>
                                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                                    80G & 12A Certified
                                </span>
                            </div>

                            {/* 1. METRICS AT THE TOP */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                                <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <Users className="w-4 h-4 text-brand-pink mb-1" />
                                    <p className="text-sm sm:text-base lg:text-lg font-black text-white leading-tight">50K+</p>
                                    <p className="text-[9px] sm:text-[10px] text-white/75 font-medium leading-tight mt-0.5">Lives Impacted</p>
                                </div>

                                <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <GraduationCap className="w-4 h-4 text-brand-pink mb-1" />
                                    <p className="text-sm sm:text-base lg:text-lg font-black text-white leading-tight">1,000+</p>
                                    <p className="text-[9px] sm:text-[10px] text-white/75 font-medium leading-tight mt-0.5">Mainstreamed</p>
                                </div>

                                <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <CheckCircle2 className="w-4 h-4 text-brand-pink mb-1" />
                                    <p className="text-sm sm:text-base lg:text-lg font-black text-white leading-tight">100%</p>
                                    <p className="text-[9px] sm:text-[10px] text-white/75 font-medium leading-tight mt-0.5">Tax Relief</p>
                                </div>
                            </div>

                            {/* 2. BUTTONS BELOW */}
                            <div className="flex flex-row sm:flex-row lg:flex-col xl:flex-row gap-2 sm:gap-2.5 pt-0.5">
                                <button
                                    onClick={() => openDonationModal()}
                                    className="flex-1 py-3 sm:py-3.5 bg-brand-pink text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm lg:text-base transition-all duration-300 hover:scale-[1.02] hover:bg-brand-pink-dark shadow-[0_0_25px_rgba(191,52,117,0.45)] active:scale-98 flex items-center justify-center gap-1.5 sm:gap-2 group"
                                >
                                    <Heart size={16} className="fill-white group-hover:scale-110 transition-transform" />
                                    <span>Donate Now</span>
                                </button>
                                <Link
                                    href="/projects"
                                    className="flex-1 py-3 sm:py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm lg:text-base transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-1.5 group text-center"
                                >
                                    <span>Explore Work</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
