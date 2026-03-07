"use client";

import { motion } from "framer-motion";
import { FileCheck, CreditCard, Calendar, BadgeCheck, Globe, Building2 } from "lucide-react";

const credentialsData = [
    { label: 'Society Registration', detail: 'Haryana Registration and Regulation of Societies Act, 2012 · Reg. No. 03485', icon: FileCheck },
    { label: 'PAN', detail: 'AAATY6815D', icon: CreditCard },
    { label: 'Date of Incorporation', detail: '21 November 2018', icon: Calendar },
    { label: '80G Certificate', detail: 'Donations made to YEIF are eligible for 50% tax deduction under the Income Tax Act', icon: BadgeCheck },
    { label: '12A Certificate', detail: "YEIF's income is exempt from Income Tax — ensuring every rupee serves the mission", icon: BadgeCheck },
    { label: 'CSR-1 Registration', detail: 'YEIF is eligible to receive Corporate Social Responsibility funds from Indian companies', icon: Building2 },
    { label: 'NITI Aayog Darpan', detail: "Registered on NITI Aayog's national NGO portal — verifiable by any donor or partner", icon: Globe },
];

export default function Credentials() {
    return (
        <section className="py-24 bg-brand-offwhite">
            <div className="container">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.3em] block">Legal & Compliance</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair">Built on Accountability</h2>
                    <p className="text-brand-brown/50 max-w-2xl mx-auto font-inter font-light">
                        All certifications relevant for individual donations, CSR funding, and grant applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {credentialsData.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-brand-brown/5 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-brand-pink/5 text-brand-pink flex items-center justify-center mb-6 group-hover:bg-brand-pink group-hover:text-white transition-colors">
                                <item.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-lg font-bold text-brand-brown mb-3 font-playfair">{item.label}</h4>
                            <p className="text-sm text-brand-brown/60 font-inter font-light leading-relaxed">
                                {item.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
