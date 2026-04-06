"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { IMPACT_STATS } from "@/lib/constants";

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function ImpactStrip() {
    return (
        <section className="bg-brand-brown py-12 relative overflow-hidden">
            {/* Decorative abstract elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center text-white">
                    {IMPACT_STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="flex flex-col gap-2"
                        >
                            <span className="text-4xl md:text-5xl font-black text-brand-pink-tint">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white/80">
                                {stat.label}
                            </span>
                            {/* Animated underline */}
                            <div className="w-8 h-1 bg-brand-pink/30 mx-auto mt-4 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileInView={{ x: "0%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                                    className="w-full h-full bg-brand-pink"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
