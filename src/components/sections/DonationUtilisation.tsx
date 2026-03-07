"use client";

import { motion } from "framer-motion";

const utilisationData = [
    { head: "Nutrition (Daily Meals for 100 Children)", percentage: "35%", focus: "Swastha Sohna" },
    { head: "Educator Salaries (Across 4 Centres)", percentage: "25%", focus: "Sakshar Sohna" },
    { head: "Digital Infrastructure (Maintenance & Software)", percentage: "15%", focus: "Digital Saksharta" },
    { head: "Livelihood Materials (Sewing Machines & Raw Materials)", percentage: "10%", focus: "Mahila Ajeevika" },
    { head: "Community Mobilisation & Events (Khalbali)", percentage: "5%", focus: "Outreach" },
    { head: "Centre Rent & Utilities", percentage: "5%", focus: "Operations" },
    { head: "Academic Resources (Books, Kits, Stationery)", percentage: "5%", focus: "Education" },
];

export default function DonationUtilisation() {
    return (
        <section className="py-24 bg-brand-brown text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/cinematic-hero.png')] bg-cover opacity-5 grayscale" />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Full Transparency</span>
                        <h2 className="text-4xl md:text-5xl font-black font-playfair">How Your Donation is Used</h2>
                        <p className="text-white/60 font-inter font-light">
                            Every rupee is accounted for. We prioritize direct beneficiary impact above all else.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
                    >
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5 font-inter text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                                    <th className="px-10 py-6">Expense Head</th>
                                    <th className="px-10 py-6">Allocation</th>
                                    <th className="px-10 py-6 hidden md:table-cell">Primary Focus</th>
                                </tr>
                            </thead>
                            <tbody className="font-inter">
                                {utilisationData.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-10 py-6 text-sm md:text-base">{row.head}</td>
                                        <td className="px-10 py-6 font-bold text-brand-pink">{row.percentage}</td>
                                        <td className="px-10 py-6 text-sm text-white/40 hidden md:table-cell">{row.focus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
