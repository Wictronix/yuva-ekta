"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    { src: "/campaign/yuva_ekta_01.jpeg", alt: "Remedial class in progress", size: "lg" },
    { src: "/campaign/yuva_ekta_02.jpeg", alt: "Digital literacy training", size: "sm" },
    { src: "/campaign/yuva_ekta_03.jpeg", alt: "Community reachout event", size: "sm" },
    { src: "/campaign/yuva-ekta-03.png", alt: "Nutrition drive distribution", size: "md" },
    { src: "/initiatives/khalibali-yuva-ekta.png", alt: "Khalbali event mobilization", size: "sm" },
    { src: "/initiatives/shiksha-ka-saath.png", alt: "Village education session", size: "md" },
];

export default function ImpactGallery() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block text-center">Visual Stories</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair">Ground Reality</h2>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative rounded-[2rem] overflow-hidden group shadow-xl"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-brand-brown/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                <p className="text-white font-medium text-sm">{img.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
