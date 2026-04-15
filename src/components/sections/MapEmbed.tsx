"use client";

import { motion } from "framer-motion";

export default function MapEmbed() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">Find Us</span>
                        <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair leading-tight">Visit Our Centre</h2>
                        <p className="text-brand-brown/50 font-inter font-light">
                            Our primary centre is in Sehjawas Village, Sohna Block, Gurugram.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-brand-offwhite"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.371379873688!2d77.0892611!3d28.347619599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d212818e7859b%3A0x6a8f067d1b4452f0!2sYuva%20EKTA%20INDIA%20Foundation!5e0!3m2!1sen!2sin!4v1776208529487!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale contrast-[1.1] brightness-[0.9]"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
