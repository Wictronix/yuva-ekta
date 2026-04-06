"use client";

import { motion } from "framer-motion";
import { Users, Heart, Sparkles } from "lucide-react";

export default function VolunteerSection() {
    return (
        <section className="py-24 bg-brand-green/5 relative overflow-hidden" id="volunteer">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/20">
                                    <Users size={32} />
                                </div>
                                <span className="text-brand-green font-bold text-[10px] uppercase tracking-[0.4em] block">Our Community</span>
                                <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair leading-tight">
                                    Volunteer With <br />
                                    <span className="italic text-brand-green">Us</span>
                                </h2>
                            </div>

                            <div className="prose prose-lg text-brand-brown/70 font-inter font-light leading-relaxed space-y-6">
                                <p>
                                    We welcome volunteers with skills in education, healthcare, technology, graphic design, communications, fundraising, and community outreach. You don't need to be a professional — you need to care.
                                </p>
                                <p>
                                    Whether you can give a few hours on a weekend, run a workshop, or support us remotely — we'll find something meaningful for you to do.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-green/10">
                                    <Heart className="text-brand-green" size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-brand-brown">Direct Impact</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-green/10">
                                    <Sparkles className="text-brand-green" size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-brand-brown">Skill Sharing</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-brand-green/5 border border-brand-green/10"
                        >
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Full Name *</label>
                                    <input required type="text" placeholder="Your full name" className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-green/20 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Email Address *</label>
                                    <input required type="email" placeholder="you@example.com" className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-green/20 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Skills / Background</label>
                                    <textarea rows={3} placeholder="Tell us what you're good at..." className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-green/20 transition-all resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Monthly Availability</label>
                                    <input type="text" placeholder="e.g. 5-10 hours per month" className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-green/20 transition-all" />
                                </div>
                                <button className="w-full bg-brand-green text-white font-bold py-5 rounded-2xl shadow-lg shadow-brand-green/20 transition-all hover:bg-brand-green/90 hover:scale-[1.02] active:scale-95">
                                    Register as a Volunteer
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background pattern */}
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
