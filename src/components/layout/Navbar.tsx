"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-white rounded-full p-1 shadow-sm overflow-hidden border border-gray-100">
                        <Image
                            src="/yuva-ekta-logo.jpg"
                            alt={SITE.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "font-bold text-lg leading-tight transition-colors",
                            isScrolled ? "text-gray-900" : "text-white"
                        )}>
                            YUVA EKTA
                        </span>
                        <span className={cn(
                            "text-[10px] uppercase tracking-widest font-medium transition-colors",
                            isScrolled ? "text-primary" : "text-white/80"
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
                                "font-medium text-sm transition-all hover:text-primary",
                                isScrolled ? "text-gray-700" : "text-white"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/donate"
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95",
                            isScrolled
                                ? "bg-primary text-white shadow-lg hover:bg-primary-dark"
                                : "bg-white text-primary shadow-xl hover:bg-gray-50"
                        )}
                    >
                        Donate Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={cn(isScrolled ? "text-gray-900" : "text-white")} />
                    ) : (
                        <Menu className={cn(isScrolled ? "text-gray-900" : "text-white")} />
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
                        className="text-2xl font-bold text-gray-900 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link
                    href="/donate"
                    className="px-10 py-4 bg-primary text-white rounded-full text-lg font-bold shadow-2xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Donate Now
                </Link>
            </div>
        </nav>
    );
}
