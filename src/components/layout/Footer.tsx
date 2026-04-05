"use client";

import { SITE, NAV_LINKS, FOCUS_AREAS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart, ShieldCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/auth");

    if (isAdminPage) return null;

    return (
        <footer className="relative bg-[#1a110a] text-white pt-24 pb-12 mt-auto overflow-hidden">
            {/* Cinematic background depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(191,52,117,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-green to-brand-terra opacity-30" />

            <div className="container relative z-10">
                {/* Brand Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-8 mb-20 pb-12 border-b border-white/5 text-center md:text-left">
                    <Link href="/" className="flex flex-col sm:flex-row items-center gap-5 group">
                        <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl transition-transform group-hover:scale-105 duration-500 overflow-hidden flex items-center justify-center p-0.5">
                            <Image
                                src="/yuva-ekta-logo.jpg"
                                alt={SITE.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <h2 className="font-playfair font-black text-2xl tracking-tight">YUVA EKTA</h2>
                            <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em]">{SITE.tagline}</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {[
                            { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
                            { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
                            { icon: Youtube, href: SITE.social.youtube, label: "YouTube" }
                        ].map((soc) => (
                            <Link
                                key={soc.label}
                                href={soc.href}
                                target="_blank"
                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-pink hover:border-brand-pink hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <soc.icon size={20} className="group-hover:scale-110 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-20 text-center md:text-left">
                    {/* Column 1: Mission */}
                    <div className="flex flex-col items-center md:items-start gap-8">
                        <div>
                            <h4 className="font-playfair font-bold text-xl mb-6 text-white capitalize">Our Mission</h4>
                            <p className="text-sm text-white/50 leading-relaxed font-inter font-light">
                                A registered NGO in Gurugram delivering free education, digital literacy, and women's livelihood to families that formal systems leave behind.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Donate via UPI</span>
                                <span className="text-xs font-mono text-white/80">{SITE.upi}</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-playfair font-bold text-xl mb-6 text-white capitalize">Explore</h4>
                        <ul className="flex flex-col gap-4">
                            {NAV_LINKS.map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-brand-pink hover:translate-x-2 transition-all flex items-center justify-center md:justify-start gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink/40 group-hover:bg-brand-pink transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-playfair font-bold text-xl mb-6 text-white capitalize">Contact</h4>
                        <ul className="flex flex-col gap-6 text-sm text-white/50 items-center md:items-start">
                            <li className="flex gap-4 justify-center md:justify-start">
                                <MapPin size={20} className="text-secondary shrink-0" />
                                <span className="leading-relaxed">{SITE.address}</span>
                            </li>
                            <li className="flex flex-col gap-3">
                                <div className="flex items-center gap-4 justify-center md:justify-start">
                                    <Phone size={20} className="text-secondary shrink-0" />
                                    <span className="font-medium text-white/80">{SITE.phone1}</span>
                                </div>
                                <div className="flex items-center gap-4 justify-center md:justify-start md:pl-9">
                                    <span className="font-medium text-white/80">{SITE.phone2}</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 justify-center md:justify-start">
                                <Mail size={20} className="text-secondary shrink-0" />
                                <span className="hover:text-white transition-colors">{SITE.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Verification */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-playfair font-bold text-xl mb-6 text-white capitalize">Transparency</h4>
                        <div className="flex flex-col gap-5 items-center md:items-start">
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Govt. Registration</p>
                                <p className="text-sm font-medium text-white/70">{SITE.regNo} <span className="text-white/20 mx-2">|</span> {SITE.pan}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                                {[
                                    { label: "80G Certified", icon: ShieldCheck },
                                    { label: "CSR-1 Registered", icon: ShieldCheck },
                                    { label: "NITI Aayog", icon: ExternalLink }
                                ].map((badge) => (
                                    <span key={badge.label} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold tracking-wider text-white/60">
                                        <badge.icon size={12} className="text-brand-green" />
                                        {badge.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar before divider */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium text-center md:text-left">
                    <p className="text-brand-pink/50 italic lowercase tracking-normal text-sm">Empowering communities since {SITE.founded.split(' ').pop()}</p>
                    <p>Tax exemption available under Section 80G of IT Act, 1961.</p>
                </div>

                {/* Final Sub-Footer Divider */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[10px] text-white/10 uppercase tracking-[0.3em] font-medium order-2 md:order-1">
                        © 2024 {SITE.name}. All Rights Reserved.
                    </p>

                    {/* Powered By Section */}
                    {/* <div className="flex items-center gap-5 group order-1 md:order-2">
                        <span className="text-[8px] uppercase tracking-[0.5em] text-white/10 font-bold whitespace-nowrap">Powered by</span>
                        <Link
                            href="https://wictronix.com"
                            target="_blank"
                            className="relative w-32 h-8 transition-all duration-500 hover:scale-110"
                        >
                            <Image
                                src="/wxblack.png"
                                alt="WictroniX Logo"
                                fill
                                className="object-contain invert hue-rotate-180 opacity-50 group-hover:opacity-100 transition-opacity"
                            />
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
