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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14041.597148560383!2d77.06979603022459!3d28.225575799999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d402636be0e65%3A0xe67096fb007cf7c9!2sSehjawas%2C%20Haryana%20122103!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin"
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
