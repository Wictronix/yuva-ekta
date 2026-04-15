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
                            
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-white p-4 rounded-3xl shadow-lg shrink-0">
                                    <Image 
                                        src="/globe.svg" 
                                        alt="UPI QR" 
                                        width={160} 
                                        height={160} 
                                        className="w-40 h-40 object-contain grayscale opacity-30" 
                                    />
                                </div>
                                <div className="space-y-4 text-center md:text-left">
                                    <p className="text-brand-brown/60 text-sm leading-relaxed">
                                        Scan this QR using any UPI app (PhonePe, GPay, Paytm) for quick, secure donations.
                                    </p>
                                    <div className="p-3 bg-white rounded-xl border border-brand-brown/5 inline-block">
                                        <p className="text-xs font-bold text-brand-brown">UPI ID: <span className="text-brand-pink select-all">{SITE.upi}</span></p>
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
