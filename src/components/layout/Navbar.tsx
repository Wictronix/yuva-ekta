"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import DonationModal from "../donation/DonationModal";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/auth");

    const isDarkText = isScrolled || !isHomePage;

    if (isAdminPage) return null;

    return (
        <>
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled || !isHomePage ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-brand-brown/5" : "bg-transparent py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 bg-white rounded-full p-0.5 shadow-sm overflow-hidden flex items-center justify-center border border-gray-100 group-hover:border-brand-pink/50 transition-colors">
                        <Image
                            src="/yuva-ekta-logo.jpg"
                            alt="Yuva Ekta"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "font-black font-playfair text-lg leading-none tracking-wide transition-colors",
                            isDarkText ? "text-gray-900" : "text-white"
                        )}>
                            YUVA EKTA
                        </span>
                        <span className={cn(
                            "text-[10px] uppercase tracking-widest font-bold transition-colors mt-1 opacity-80",
                            isDarkText ? "text-brand-pink" : "text-white/80"
                        )}>
                            India Foundation
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "font-bold text-sm transition-all hover:text-brand-pink",
                                isDarkText ? "text-brand-brown/80" : "text-white/90"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => setIsDonateModalOpen(true)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md",
                            isDarkText
                                ? "bg-brand-pink text-white hover:bg-brand-pink-dark shadow-brand-pink/20 hover:shadow-brand-pink/40"
                                : "bg-white text-brand-brown hover:bg-brand-offwhite"
                        )}
                    >
                        Donate Now
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 transition-colors relative z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={cn(isDarkText || isMobileMenuOpen ? "text-gray-900" : "text-white")} />
                    ) : (
                        <Menu className={cn(isDarkText ? "text-gray-900" : "text-white")} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="text-2xl font-bold text-gray-900 hover:text-brand-pink"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <button
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsDonateModalOpen(true);
                    }}
                    className="px-10 py-4 bg-brand-pink text-white rounded-full text-lg font-bold shadow-2xl shadow-brand-pink/20"
                >
                    Donate Now
                </button>
            </div>
        </nav>
        
        <DonationModal
            isOpen={isDonateModalOpen}
            onClose={() => setIsDonateModalOpen(false)}
        />
        </>
    );
}
