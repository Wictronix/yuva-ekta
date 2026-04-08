"use client";

import { motion } from "framer-motion";

export default function AboutStory() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.3em] block">How It Began</span>
                            <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair leading-tight">
                                From One Room to a <br />
                                <span className="italic text-brand-pink">Thousand Lives</span>
                            </h2>
                        </div>

                        <div className="prose prose-lg max-w-none text-brand-brown/75 font-inter font-light leading-relaxed space-y-8">
                            <p className="text-xl text-brand-brown/80 font-normal border-l-4 border-brand-pink pl-8 py-2">
                                Yuva Ekta India Foundation was born out of a simple conviction: that the children and families at the margins of society deserve the same opportunities as everyone else.
                            </p>

                            <p>
                                On 21 November 2018, Mr. Balram Kumar. a social worker inspired and trained by <strong>Dr. Kiran Bedi</strong>, India's first female IPS officer, registered the foundation in the villages of Sohna Block, Gurugram. What began with a handful of children attending remedial classes in a borrowed room has grown into a multi-project NGO serving over 1,000 children, 100 women, and hundreds of families.
                            </p>

                            <p>
                                We hold 80G, 12A, and CSR-1 certifications, are registered with NITI Aayog's Darpan portal, and are recognised by the Haryana Government. We have been featured across local and regional media for our work in education, health, and environment and in 2022, we received a formal commendation from the Gurugram Police Commissioner.
                            </p>

                            <p>
                                We believe trust is earned, not assumed. That is why we publish our projects, our numbers, and our funding needs openly. So every donor, partner, and volunteer can see exactly where their contribution goes.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Ornamental background element */}
            <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
