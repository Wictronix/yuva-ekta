"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { CreditCard, Landmark, QrCode, ShieldCheck, Heart } from "lucide-react";

const presets = ["500", "1000", "2500", "5000"];

export default function DonateForm() {
    const [amount, setAmount] = useState<string>("1000");
    const [isCustom, setIsCustom] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] border border-brand-brown/5 shadow-2xl"
            >
                <div className="space-y-12">
                    <div className="space-y-4">
                        <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Your Contribution</span>
                        <h2 className="text-3xl md:text-4xl font-black text-brand-brown font-playfair">Make a Difference</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-brown/60">Select Amount (₹)</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {presets.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => { setAmount(p); setIsCustom(false); }}
                                        className={`py-4 rounded-2xl font-bold transition-all ${amount === p && !isCustom ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/20 scale-[1.05]' : 'bg-brand-offwhite text-brand-brown hover:bg-brand-pink/10'}`}
                                    >
                                        ₹{p}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-brown/40 font-bold">₹</span>
                                <input
                                    type="number"
                                    placeholder="Enter custom amount"
                                    value={isCustom ? amount : ""}
                                    onChange={(e) => { setAmount(e.target.value); setIsCustom(true); }}
                                    className={`w-full bg-brand-offwhite border-none rounded-2xl pl-10 pr-6 py-5 font-bold text-brand-brown focus:ring-2 focus:ring-brand-pink/20 transition-all outline-none ${isCustom ? 'ring-2 ring-brand-pink/20' : ''}`}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-brown/60">Allocate to Project (Optional)</p>
                            <select className="w-full bg-brand-offwhite border-none rounded-2xl px-6 py-5 font-inter text-brand-brown focus:ring-2 focus:ring-brand-pink/20 transition-all outline-none appearance-none">
                                <option value="General">General Fund (Where needed most)</option>
                                <option value="Sakshar Sohna">Sakshar Sohna (Education)</option>
                                <option value="Digital Saksharta">Digital Saksharta (Digital Literacy)</option>
                                <option value="Mahila Ajeevika">Mahila Ajeevika (Women Livelihood)</option>
                                <option value="Swastha Sohna">Swastha Sohna (Nutrition)</option>
                            </select>
                        </div>

                        <button className="w-full bg-brand-pink text-white font-black py-6 rounded-2xl shadow-xl shadow-brand-pink/20 flex items-center justify-center gap-4 hover:bg-brand-pink/90 hover:scale-[1.02] active:scale-95 transition-all text-lg">
                            <Heart size={20} />
                            <span>Donate Now</span>
                        </button>

                        <div className="flex items-center justify-center gap-6 text-brand-brown/40">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-brand-green" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Secure SSL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-brand-green" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">80G Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Column: Other Ways */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-8"
            >
                <div className="bg-brand-brown p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    <div className="relative z-10 space-y-8">
                        <div className="space-y-2">
                            <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Offline Donation</span>
                            <h3 className="text-2xl font-black font-playfair">Bank Transfer</h3>
                        </div>

                        <div className="space-y-6 text-sm font-inter">
                            <div className="space-y-1">
                                <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Account Name</p>
                                <p className="font-medium">Yuva Ekta India Foundation</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Bank Name</p>
                                <p className="font-medium">Union Bank of India</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Account Number</p>
                                    <p className="font-medium tracking-wider">220711100001158</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">IFSC Code</p>
                                    <p className="font-medium tracking-wider">UBIN0565091</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                            <div className="w-24 h-24 bg-white p-2 rounded-2xl shrink-0">
                                <Image src="/globe.svg" alt="UPI QR Code" width={100} height={100} className="w-full h-full object-contain" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Scan & Pay (UPI)</p>
                                <p className="text-lg font-bold font-playfair">Q64836034@ybl</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 bg-brand-green/5 border border-brand-green/10 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-green text-white rounded-xl flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-black text-brand-brown font-playfair">Tax Exemption</h4>
                    </div>
                    <p className="text-brand-brown/60 text-sm leading-relaxed font-inter">
                        Donations to Yuva Ekta India Foundation are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive your tax receipt via email after the transaction is confirmed.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
