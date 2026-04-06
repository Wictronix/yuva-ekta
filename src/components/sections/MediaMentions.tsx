"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const mediaData = [
    { source: "Dainik Jagran", date: "April 2022", title: "Police Commissioner commends YEIF's education drive" },
    { source: "Hindustan Times", date: "Nov 2021", title: "Empowering rural women in Sohna" },
    { source: "Amar Ujala", date: "Dec 2022", title: "Digital literacy for village kids" },
    { source: "Punjab Kesari", date: "Jan 2023", title: "NGO serving 100 poor children daily" },
];

export default function MediaMentions() {
    return (
        <section className="py-24 bg-brand-brown relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="container relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-white/60 font-bold text-[10px] uppercase tracking-[0.4em] block text-center">In the News</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white font-playfair">Recognised Across Haryana</h2>
                    <p className="text-white/70 max-w-2xl mx-auto font-inter font-light">
                        Our work has been covered by regional and national publications in Hindi and English.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {mediaData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors group cursor-pointer"
                        >
                            <Newspaper className="text-brand-pink mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/55">
                                    <span>{item.source}</span>
                                    <span>{item.date}</span>
                                </div>
                                <h4 className="text-lg font-bold text-white leading-snug group-hover:text-brand-pink transition-colors">
                                    "{item.title}"
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] italic">
                        + featuring multiple clippings across Hindi & English press
                    </p>
                </div>
            </div>
        </section>
    );
}
