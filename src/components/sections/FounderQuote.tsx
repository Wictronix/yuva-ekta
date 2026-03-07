"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderQuote() {
    return (
        <section className="py-24 bg-brand-offwhite relative overflow-hidden">
            <div className="container relative z-10 text-center max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-brand-pink/20 font-playfair text-[120px] leading-none select-none mb-0"
                >
                    &ldquo;
                </motion.div>

                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-4xl font-black text-gray-900 leading-tight md:leading-snug mb-12 font-playfair italic px-4"
                >
                    Every child deserves to learn. Every woman deserves to earn.
                    Every family deserves dignity. That is why we do this work — every single day.
                </motion.blockquote>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-pink/20 shadow-xl">
                        <Image
                            src="/campaign/yuva_ekta_01.jpeg" // Replace with Balram Kumar photo if available
                            alt="Balram Kumar"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-gray-900 font-playfair">Balram Kumar</span>
                        <span className="text-xs uppercase tracking-widest text-muted font-bold">
                            Founder, Yuva Ekta India Foundation
                        </span>
                        <span className="text-[10px] text-brand-pink font-medium uppercase tracking-[0.2em] mt-1">
                            Social Worker · Mentored by Dr. Kiran Bedi
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
