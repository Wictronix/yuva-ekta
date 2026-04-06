"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulating submission for now
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => setStatus("idle"), 5000);
        }, 1500);
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 bg-brand-green/5 border-2 border-dashed border-brand-green/20 rounded-[2.5rem] p-12"
            >
                <div className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-green/20">
                    <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black font-playfair text-brand-brown">Message Sent!</h3>
                    <p className="text-brand-brown/60 font-inter">Thank you — we'll get back to you within 2 working days.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[2.5rem] border border-brand-brown/5 shadow-xl shadow-brand-brown/5"
        >
            <div className="mb-10 space-y-4">
                <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Message Us</span>
                <h3 className="text-3xl font-black font-playfair text-brand-brown">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Full Name *</label>
                        <input
                            required
                            type="text"
                            placeholder="Your full name"
                            className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 font-inter text-brand-brown placeholder:text-brand-brown/20 focus:ring-2 focus:ring-brand-pink/20 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Email Address *</label>
                        <input
                            required
                            type="email"
                            placeholder="you@example.com"
                            className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 font-inter text-brand-brown placeholder:text-brand-brown/20 focus:ring-2 focus:ring-brand-pink/20 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 font-inter text-brand-brown placeholder:text-brand-brown/20 focus:ring-2 focus:ring-brand-pink/20 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Subject *</label>
                        <select
                            required
                            className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 font-inter text-brand-brown focus:ring-2 focus:ring-brand-pink/20 outline-none transition-all appearance-none"
                        >
                            <option value="General Enquiry">General Enquiry</option>
                            <option value="Donation">Donation</option>
                            <option value="CSR Partnership">CSR Partnership</option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Media Enquiry">Media Enquiry</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 ml-4">Your Message *</label>
                    <textarea
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full bg-brand-offwhite/50 border-none rounded-2xl px-6 py-4 font-inter text-brand-brown placeholder:text-brand-brown/20 focus:ring-2 focus:ring-brand-pink/20 outline-none transition-all resize-none"
                    />
                </div>

                <button
                    disabled={status === "submitting"}
                    className="w-full bg-brand-pink text-white font-bold py-5 rounded-2xl shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-3 hover:bg-brand-pink/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    {status === "submitting" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Send size={18} />
                            <span>Send Message</span>
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
