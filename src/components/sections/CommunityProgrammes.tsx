"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Megaphone, BookOpen, MessageCircle, GraduationCap, Star, Laptop, Droplets, X, ArrowRight, Heart } from "lucide-react";
import { useDonation } from "../providers/DonationProvider";

const iconMap = {
    Megaphone,
    BookOpen,
    MessageCircle,
    GraduationCap,
    Star,
    Laptop,
    Droplets
};

const programmes = [
    {
        id: 'khalbali',
        name: 'Khalbali',
        icon: 'Megaphone',
        color: 'brand-pink',
        image: '/initiatives/khalibali-yuva-ekta.png',
        summary: 'Monthly community mobilisation event where educators and volunteers visit villages to share programme updates and connect with local leaders.',
        details: 'Khalbali is our bridge to the villages. Every month, we organise a large-scale mobilisation drive where our entire team, along with local volunteers, goes door-to-door. We share success stories from our centres, discuss challenges families are facing, and ensure that every household in Sohna Block knows exactly what free resources are available to them. It is about creating a "khalbali" (commotion/buzz) for positive change.',
    },
    {
        id: 'shiksha-ka-saath',
        name: 'Shiksha Ka Saath',
        icon: 'BookOpen',
        color: 'brand-green',
        image: '/initiatives/shiksha-ka-saath.png',
        summary: 'Volunteer-run education sessions in villages that build children\'s literacy and numeracy, alongside library setup in government schools.',
        details: 'Education shouldn\'t just happen at a centre; it should happen in the heart of the village. Our "Educators in Residence" model places trained volunteers directly within community spaces to conduct hourly literacy and numeracy sessions. Simultaneously, we work with school administrations to install "Baal Pustakalayas" (Children\'s Libraries) that are curated and managed by the students themselves, fostering a lifelong love for reading.',
    },
    {
        id: 'nukkad-sabha',
        name: 'Nukkad Sabha',
        icon: 'MessageCircle',
        color: 'brand-terra',
        image: '/initiatives/nukkad-sabha-yuva-ekta.png',
        summary: 'Street-level community forum where young people\'s issues - education, employment, girls\' futures are discussed and solved together.',
        details: 'Change happens when communities talk. Nukkad Sabhas are informal street-corner meetings where we bring together youth, parents, and village elders. We discuss critical topics like preventing dropouts, the importance of girls\' higher education, and mental health. These sabhas often turn into action committees where the village itself takes ownership of its children\'s future.',
    },
    {
        id: 'paramarsh',
        name: 'Paramarsh',
        icon: 'GraduationCap',
        color: 'brand-brown',
        image: '/initiatives/paramarsh-yuva-ekta.png',
        summary: 'Free career counselling for students in Class VIII–XII and their families at the end of every academic year.',
        details: 'In rural areas, many brilliant students stop studying after Class X or XII simply because they don\'t know what comes next. Paramarsh connects these students with professionals and career counsellors who provide free guidance. We help them choose streams, find scholarships, and understand vocational pathways that they otherwise wouldn\'t have access to.',
    },
    {
        id: 'shiksha-aur-kaushal-mela',
        name: 'Shiksha Aur Kaushal Mela',
        icon: 'Star',
        color: 'brand-pink',
        image: '/initiatives/shiksha-aur-kaushal-mela.png',
        summary: 'Annual education and skill fair bringing schools, colleges, and skill institutes from Gurugram directly into Sohna Block villages.',
        details: 'Every year, we bring the opportunities of the city to the village. Our Education and Skill Fair features stalls from vocational institutes, ITIs, and higher education colleges. Over 1,000 youth from across Sohna Block visit the fair to get on-the-spot career advice, register for courses, and understand the requirements of the modern job market.',
    },
    {
        id: 'yuva-kaushal-centre',
        name: 'Yuva Kaushal Centre',
        icon: 'Laptop',
        color: 'brand-green',
        image: '/initiatives/yuva-kaushal-centre.png',
        summary: 'Vocational training in computers and languages for adolescents and youth of all genders, with entrepreneurship pathways for women.',
        details: 'Our skill centres are hubs of employability. We provide high-quality, free training in Tally, Graphic Design, and basic computer applications. For women, the focus shifts to micro-entrepreneurship, teaching them how to manage accounts, find markets for their crafts, and use digital tools to scale their home-based businesses.',
    },
    {
        id: 'swachta-aur-sanrakshan',
        name: 'Swachta Aur Sanrakshan',
        icon: 'Droplets',
        color: 'brand-terra',
        image: '/initiatives/suraksha-yuva-ekta.png',
        summary: 'Community-driven water conservation, cleanliness, and plantation drives across urban and rural Gurugram.',
        details: 'Environmental stewardship is key to community health. We lead weekly drives to clean water bodies, plant native trees, and educate households on waste segregation. Our "Eco-Warriors" team, made up of village youth, ensures that these initiatives remain consistent and lead to measurable improvements in the local environment.',
    },
];

export default function CommunityProgrammes() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedProg = programmes.find(p => p.id === selectedId);
    const { openDonationModal } = useDonation();

    return (
        <section className="py-24 bg-brand-offwhite/50">
            <div className="container">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block text-center">Beyond the Projects</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-brown font-playfair">Community Initiatives</h2>
                    <p className="text-brand-brown/70 max-w-2xl mx-auto font-inter font-light">
                        Ongoing programmes that mobilise communities, build awareness, and connect villages to education and employment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {programmes.map((prog, i) => {
                        const Icon = iconMap[prog.icon as keyof typeof iconMap];
                        return (
                            <m.div
                                key={prog.id}
                                layoutId={prog.id}
                                onClick={() => setSelectedId(prog.id)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-0 rounded-[2.5rem] overflow-hidden border border-brand-brown/5 shadow-sm hover:shadow-2xl hover:shadow-brand-brown/5 transition-all duration-500 group cursor-pointer"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={prog.image}
                                        alt={prog.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-brand-brown/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="p-10 -mt-12 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110`}
                                        style={{ backgroundColor: `var(--color-${prog.color})` }}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-brown font-playfair mb-4">{prog.name}</h3>
                                    <p className="text-brand-brown/60 font-inter font-light leading-relaxed line-clamp-3">
                                        {prog.summary}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-brand-pink font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Learn More</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </m.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && selectedProg && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                        />

                        <m.div
                            layoutId={selectedId}
                            className="relative w-full max-w-4xl bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh] z-[101]"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-brand-brown hover:text-brand-pink shadow-md flex items-center justify-center transition-all z-30"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto min-h-[220px] md:min-h-[440px] overflow-hidden bg-brand-brown/10">
                                <Image
                                    src={selectedProg.image}
                                    alt={selectedProg.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-2">
                                        <span>Village Mobilisation</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/90 line-clamp-2 font-inter font-light">
                                        {selectedProg.summary}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                                            style={{ backgroundColor: `var(--color-${selectedProg.color})` }}
                                        >
                                            {(() => {
                                                const Icon = iconMap[selectedProg.icon as keyof typeof iconMap];
                                                return <Icon size={24} />;
                                            })()}
                                        </div>
                                        <div>
                                            <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.3em] block mb-1">
                                                Community Initiative · Grassroots
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-black text-brand-brown font-playfair">
                                                {selectedProg.name}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="text-brand-brown/75 font-inter font-light leading-relaxed text-sm sm:text-base">
                                        <p>{selectedProg.details}</p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-brand-brown/10">
                                    <button
                                        onClick={() => {
                                            setSelectedId(null);
                                            openDonationModal();
                                        }}
                                        className="w-full bg-brand-pink text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2 hover:bg-brand-pink-dark hover:scale-[1.01] active:scale-95 transition-all text-sm tracking-wide"
                                    >
                                        <Heart size={16} />
                                        <span>Donate to this Initiative</span>
                                    </button>
                                </div>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
