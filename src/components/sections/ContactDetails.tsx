"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function ContactDetails() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-brown p-8 sm:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background circle */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-8 sm:space-y-10">
                    <div className="space-y-3 sm:space-y-4">
                        <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Direct Contact</span>
                        <h3 className="text-2xl sm:text-3xl font-black font-playfair">Get in Touch</h3>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-pink transition-colors">
                                <Phone size={20} className="text-brand-pink group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Give us a call</p>
                                <p className="text-lg font-medium">{SITE.phone1}</p>
                                <p className="text-lg font-medium">{SITE.phone2}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-pink transition-colors">
                                <MessageCircle size={20} className="text-brand-pink group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">WhatsApp</p>
                                <p className="text-lg font-medium">{SITE.whatsapp}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-pink transition-colors">
                                <Mail size={20} className="text-brand-pink group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Email Address</p>
                                <p className="text-lg font-medium">{SITE.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-pink transition-colors">
                                <MapPin size={20} className="text-brand-pink group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Our Location</p>
                                <p className="text-base leading-relaxed text-white/80">
                                    {SITE.address}
                                </p>
                                <p className="text-sm border-t border-white/10 pt-4 mt-4 text-white/40 italic">
                                    Also: {SITE.addressAlt}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-brand-pink/5 rounded-3xl border border-brand-pink/10"
            >
                <p className="text-xs text-brand-brown/60 leading-relaxed font-inter italic">
                    * We are a field organisation. The fastest way to reach us is WhatsApp or email. We typically respond within 1–2 working days.
                </p>
            </motion.div>
        </div>
    );
}
