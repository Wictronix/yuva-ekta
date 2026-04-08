"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { type Campaign } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils";
import ProgressWidget from "./ProgressWidget";
import FundingBreakdown from "./FundingBreakdown";
import ProductGrid from "./ProductGrid";
import CampaignUpdates from "./CampaignUpdates";
import { useDonation } from "@/components/providers/DonationProvider";
import { ShoppingBag, Heart } from "lucide-react";

export default function CampaignDetail({ campaign }: { campaign: Campaign }) {
  const {
    openDonationModal,
    isOpen: isModalOpen,
    getCampaignCartTotal,
    getTotalItems
  } = useDonation();
  const [activeSection, setActiveSection] = useState<string>("");

  // Compute cart total for THIS campaign
  const cartTotal = getCampaignCartTotal(campaign.id);
  const totalItems = getTotalItems();

  const handleDonateOpen = (amount?: number) => {
    // Priority: 1. Explicit amount passed 2. This campaign's cart total 3. Global total (handled inside openDonationModal via provider logic)
    const donationAmount = amount && amount > 0 ? amount : cartTotal > 0 ? cartTotal : undefined;
    openDonationModal({
      campaignId: campaign.id,
      campaignName: campaign.title,
      defaultAmount: donationAmount
    });
  };

  // Build section list based on campaign data
  const sections: { id: string; label: string }[] = [];
  if (campaign.products && campaign.products.length > 0) {
    sections.push({ id: "products", label: "Products" });
  }
  if (campaign.funding_breakdown && campaign.funding_breakdown.length > 0) {
    sections.push({ id: "funding", label: "How It's Used" });
  }
  sections.push({ id: "description", label: "Description" });
  if (campaign.updates && campaign.updates.length > 0) {
    sections.push({ id: "updates", label: "Updates" });
  }

  // Scroll spy for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    const ids = sections.map((s) => s.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // account for navbar + sub-navbar
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-brand-brown overflow-hidden">
        {campaign.cover_image_url && (
          <Image
            src={campaign.cover_image_url}
            alt={campaign.title}
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/80 to-transparent"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {campaign.category && (
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
                {campaign.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-playfair text-white leading-tight">
              {campaign.title}
            </h1>
            <p className="text-lg md:text-xl text-brand-offwhite/90 leading-relaxed max-w-3xl mx-auto">
              {campaign.short_desc}
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-brand-green">✅</span> 80G Tax Receipt via Email
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span>🏛️</span> Reg. No. 03485
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span>🔒</span> Secure Payment via Razorpay
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-brand-offwhite/30">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative items-start">

            {/* Mobile Progress Widget */}
            <div className="w-full lg:hidden -mt-24 relative z-20 mb-4">
              <ProgressWidget campaign={campaign} onDonateClick={handleDonateOpen} />
            </div>

            {/* Section Sub-Navbar */}
            {sections.length > 1 && (
              <div className="w-full lg:hidden sticky top-[68px] z-30 -mx-6 px-6 py-3 bg-white/95 backdrop-blur-md border-b border-brand-brown/5 shadow-sm">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all flex-shrink-0 ${activeSection === section.id
                          ? "bg-brand-pink text-white shadow-md shadow-brand-pink/20"
                          : "bg-brand-offwhite text-brand-brown/70 hover:bg-brand-pink/10 hover:text-brand-pink"
                        }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Left Column (Content) */}
            <div className="w-full lg:w-[60%] xl:w-[65%] space-y-16">

              {/* Desktop Section Sub-Navbar */}
              {sections.length > 1 && (
                <div className="hidden lg:block sticky top-[80px] z-30 -mt-4 mb-4">
                  <div className="flex gap-2 flex-wrap bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-brand-brown/5 shadow-sm">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeSection === section.id
                            ? "bg-brand-pink text-white shadow-md shadow-brand-pink/20"
                            : "text-brand-brown/70 hover:bg-brand-pink/10 hover:text-brand-pink"
                          }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 1. Products (moved to top) */}
              {campaign.products && campaign.products.length > 0 && (
                <div id="products">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black font-playfair text-brand-brown mb-2">Choose What You Want to Fund</h3>
                    <p className="text-brand-brown/60 text-lg">Each item below represents a specific, tangible contribution.</p>
                  </div>
                  <ProductGrid
                    campaignId={campaign.id}
                    products={campaign.products}
                  />

                  {/* Cart summary */}
                  {cartTotal > 0 && (
                    <div className="mt-6 p-4 bg-brand-pink/5 border-2 border-brand-pink/20 rounded-2xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-pink/10 rounded-xl flex items-center justify-center">
                          <ShoppingBag size={18} className="text-brand-pink" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-brand-brown/50">{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
                          <p className="text-xl font-black text-brand-pink">{formatCurrency(cartTotal)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDonateOpen(cartTotal)}
                        className="px-6 py-3 bg-brand-pink text-white rounded-xl font-bold text-sm hover:bg-brand-pink-dark transition-all shadow-lg shadow-brand-pink/20 active:scale-95 hidden sm:block"
                      >
                        Donate This Amount
                      </button>
                    </div>
                  )}

                  <div className="text-center pt-4">
                    <p className="text-sm text-brand-brown/60 mb-3">Or donate any amount, every rupee helps.</p>
                    <button
                      onClick={() => handleDonateOpen()}
                      className="text-brand-pink font-bold text-sm hover:underline decoration-brand-pink/30 underline-offset-4"
                    >
                      Donate a Custom Amount →
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Funding Breakdown */}
              {campaign.funding_breakdown && campaign.funding_breakdown.length > 0 && (
                <div id="funding">
                  <FundingBreakdown breakdown={campaign.funding_breakdown} />
                </div>
              )}

              {/* 3. Description */}
              <div id="description">
                <div className="prose prose-lg prose-headings:font-playfair prose-headings:font-black prose-headings:text-brand-brown prose-p:text-brand-brown/80 prose-p:leading-relaxed prose-a:text-brand-pink prose-a:font-bold max-w-none">
                  {campaign.long_desc.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={i}>{paragraph.replace('## ', '')}</h2>;
                    }
                    return <p key={i}>{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* 4. Updates */}
              {campaign.updates && campaign.updates.length > 0 && (
                <div id="updates">
                  <div className="mb-8">
                    <h3 className="text-3xl font-black font-playfair text-brand-brown mb-2">Impact Updates</h3>
                    <p className="text-brand-brown/60 text-lg">Regular updates from the ground so you can see your donation at work.</p>
                  </div>
                  <CampaignUpdates updates={campaign.updates} />
                </div>
              )}

              {/* Bottom CTA */}
              <div className="pt-16 pb-8 border-t border-brand-brown/10 text-center">
                <h3 className="text-2xl font-black font-playfair text-brand-brown mb-6">Ready to make an impact?</h3>
                <button
                  onClick={() => handleDonateOpen()}
                  className="px-12 py-5 bg-brand-pink text-white rounded-full font-black text-xl hover:bg-brand-pink-dark transition-all shadow-xl shadow-brand-pink/30 hover:-translate-y-1"
                >
                  Donate to {campaign.title}
                </button>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="hidden lg:block w-[40%] xl:w-[35%] relative">
              <ProgressWidget campaign={campaign} onDonateClick={handleDonateOpen} />
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Mobile Donate Bar */}
      {!isModalOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
          <div className="bg-white/95 backdrop-blur-xl border-t border-brand-brown/10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-bottom">
            <div className="flex items-center gap-3">
              {cartTotal > 0 && (
                <div className="flex-shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/40">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                  <p className="text-lg font-black text-brand-pink leading-none">{formatCurrency(cartTotal)}</p>
                </div>
              )}
              <button
                onClick={() => handleDonateOpen(cartTotal > 0 ? cartTotal : undefined)}
                className="flex-1 py-3.5 bg-brand-pink text-white rounded-xl font-black text-base hover:bg-brand-pink-dark transition-all shadow-lg shadow-brand-pink/30 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Heart size={18} fill="white" />
                {cartTotal > 0 ? `Donate ${formatCurrency(cartTotal)}` : "Donate Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal Handler Removed - Now handled globally */}
    </>
  );
}
