"use client";

import { motion } from "framer-motion";
import { Landmark, QrCode, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/constants";
import Image from "next/image";

export default function BankDetails() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Offline Contributions</span>
                            <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair">Direct Bank Transfer</h2>
                            <p className="text-brand-brown/70 text-lg font-inter font-light leading-relaxed">
                                For larger contributions or corporate CSR, we recommend direct bank transfers. 
                                This ensures zero processing fees and 100% of your gift reaches our programmes.
                            </p>
                        </div>

                        <div className="bg-brand-brown p-10 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50" />
                            
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Landmark className="text-brand-pink" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black font-playfair">Bank Account Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-inter">
                                    <div className="space-y-1">
                                        <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Account Name</p>
                                        <p className="font-medium text-lg italic">Yuva Ekta India Foundation</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Bank Name</p>
                                        <p className="font-medium text-lg italic">Union Bank of India</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Account Number</p>
                                        <p className="font-medium text-lg tracking-wider">220711100001158</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">IFSC Code</p>
                                        <p className="font-medium text-lg tracking-wider">UBIN0565091</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-brand-offwhite p-10 md:p-12 rounded-[3rem] border border-brand-brown/5">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-brand-pink/10 text-brand-pink rounded-xl flex items-center justify-center">
                                    <QrCode size={24} />
                                </div>
                                <h3 className="text-2xl font-black font-playfair text-brand-brown">Scan to Pay (UPI)</h3>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="relative bg-white p-3.5 rounded-3xl shadow-xl border border-brand-brown/10 shrink-0 group">
                                    <Image 
                                        src="/qr-square.jpeg" 
                                        alt="Yuva Ekta India Foundation UPI QR Code" 
                                        width={180} 
                                        height={180} 
                                        className="w-44 h-44 object-contain rounded-2xl" 
                                    />
                                    <div className="absolute inset-0 bg-brand-pink/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="px-3 py-1 bg-white/95 text-brand-pink font-bold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                                            Scan with any UPI App
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-wider">
                                        <span>Instant & Zero Processing Fee</span>
                                    </div>
                                    <p className="text-brand-brown/70 text-sm leading-relaxed">
                                        Scan using PhonePe, Google Pay, Paytm, BHIM, or any banking app for instant donations.
                                    </p>
                                    <div className="p-3 bg-white rounded-2xl border border-brand-brown/10 shadow-sm inline-flex flex-col gap-1 w-full sm:w-auto">
                                        <span className="text-[10px] uppercase font-bold text-brand-brown/50 tracking-wider">Official UPI VPA</span>
                                        <span className="text-sm font-mono font-bold text-brand-pink select-all">{SITE.upi}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-brand-green/5 border border-brand-green/10 rounded-[2.5rem] flex items-start gap-6">
                            <div className="w-12 h-12 bg-brand-green text-white rounded-xl flex items-center justify-center shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xl font-black text-brand-brown font-playfair">Tax Benefit (80G)</h4>
                                <p className="text-brand-brown/60 text-sm leading-relaxed">
                                    All donations are tax-deductible under Section 80G. Please email your transfer screenshot to <span className="font-bold text-brand-brown">{SITE.email}</span> to receive your receipt.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
