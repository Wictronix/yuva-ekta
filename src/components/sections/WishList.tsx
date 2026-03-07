"use client";

import { motion } from "framer-motion";
import { Gift, Book, ShoppingBag, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const wishes = [
    {
        icon: Book,
        title: "Remedial Kits",
        cost: "₹1,500",
        description: "Stationery, books, and learning aids for 5 children for 3 months.",
        color: "brand-pink"
    },
    {
        icon: Gift,
        title: "Daily Nutrition",
        cost: "₹5,000",
        description: "Daily evening food packets for 10 children for one month.",
        color: "brand-green"
    },
    {
        icon: ShoppingBag,
        title: "Sewing Machine",
        cost: "₹7,500",
        description: "A professional sewing machine for a woman starting her micro-business.",
        color: "brand-terra"
    },
    {
        icon: GraduationCap,
        title: "Youth Scholarship",
        cost: "₹10,000",
        description: "Full vocational course fee for a rural youth at a city institute.",
        color: "brand-brown"
    }
];

export default function WishList() {
    return (
        <section className="py-24 bg-brand-offwhite/30">
            <div className="container">
                <div className="mb-16 space-y-4">
                    <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">The Wish List</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair">What We Need Today</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishes.map((wish, i) => (
                        <motion.div
                            key={wish.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-brand-brown/5 shadow-xl shadow-brand-brown/5 group hover:bg-brand-brown hover:text-white transition-all duration-500"
                        >
                            <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:bg-white group-hover:text-brand-brown transition-colors`}
                                style={{ backgroundColor: `var(--color-${wish.color})` }}>
                                <wish.icon size={24} />
                            </div>
                            <h3 className="text-2xl font-black font-playfair mb-2">{wish.title}</h3>
                            <p className="text-brand-pink font-bold text-lg mb-4 group-hover:text-white transition-colors">{wish.cost}</p>
                            <p className="text-brand-brown/60 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
                                {wish.description}
                            </p>
                            <Link
                                href="/donate"
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-pink group-hover:text-white transition-colors"
                            >
                                <span>Fulfill this wish</span>
                                <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
