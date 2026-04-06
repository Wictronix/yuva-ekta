"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useDonation } from "../providers/DonationProvider";

export default function HeroSection({
    imageUrl = "/campaign/yuva_ekta_02.jpeg"
}: {
    imageUrl?: string
}) {
    const { openDonationModal } = useDonation();
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-brown">
            {/* Background with cinematic treatment */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover brightness-[0.45] contrast-[1.1] scale-105"
                />
            </div>

            {/* Cinematic Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/40 via-transparent to-brand-brown/90 z-10" />

            <div className="container relative z-20 text-center max-w-5xl py-20 sm:py-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="px-6 py-2 rounded-full bg-brand-pink/20 backdrop-blur-md border border-brand-pink/30 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-8 sm:mb-10 text-white inline-block shadow-2xl"
                    >
                        Recognised by Haryana Government · Reg. No. 03485
                    </motion.span>

                    <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black mb-8 sm:mb-10 leading-[1.1] sm:leading-[1.05] tracking-tight text-white font-playfair drop-shadow-2xl">
                        Empowering <span className="italic text-brand-pink underline decoration-white/20 underline-offset-8">Communities</span>,<br />
                        One Life at a Time
                    </h1>

                    <p className="text-base sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 sm:mb-16 leading-relaxed font-inter font-light">
                        A grassroot NGO in Gurugram delivering free education, digital skills,
                        and daily nutrition to the children and families formal systems leave behind.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full max-w-lg">
                        <button
                            onClick={() => openDonationModal()}
                            className="w-full sm:w-auto px-8 sm:px-14 py-4 sm:py-5 bg-brand-pink text-white rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(191,52,117,0.5)] active:scale-95 text-center"
                        >
                            Donate Now
                        </button>
                        <Link
                            href="/projects"
                            className="w-full sm:w-auto px-8 sm:px-14 py-4 sm:py-5 bg-white/5 backdrop-blur-xl border border-white/30 text-white rounded-full font-bold text-base sm:text-lg transition-all hover:bg-white/10 hover:scale-105 active:scale-95 text-center"
                        >
                            See Our Work
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3"
                >
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">Scroll to Explore</span>
                    <ChevronDown className="animate-bounce text-white/60 w-4 h-4 sm:w-6 sm:h-6" />
                </motion.div>
            </div>
        </section>
    );
}
