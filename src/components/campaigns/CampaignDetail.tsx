"use client";

import { useState } from "react";
import Image from "next/image";
import { type Campaign } from "@/lib/supabase/types";
import ProgressWidget from "./ProgressWidget";
import FundingBreakdown from "./FundingBreakdown";
import ProductGrid from "./ProductGrid";
import CampaignUpdates from "./CampaignUpdates";
import DonationModal from "../donation/DonationModal";

export default function CampaignDetail({ campaign }: { campaign: Campaign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultAmount, setDefaultAmount] = useState<number | undefined>();

  const handleDonateOpen = (amount?: number) => {
    setDefaultAmount(amount && amount > 0 ? amount : undefined);
    setIsModalOpen(true);
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
            <div className="w-full lg:hidden -mt-24 relative z-20 mb-8">
              <ProgressWidget campaign={campaign} onDonateClick={handleDonateOpen} />
            </div>

            {/* Left Column (Content) */}
            <div className="w-full lg:w-[60%] xl:w-[65%] space-y-16">
              
              {/* Long Description (Markdown styling placeholder) */}
              <div className="prose prose-lg prose-headings:font-playfair prose-headings:font-black prose-headings:text-brand-brown prose-p:text-brand-brown/80 prose-p:leading-relaxed prose-a:text-brand-pink prose-a:font-bold max-w-none">
                {/* In a real app we'd use marked/react-markdown here */}
                {campaign.long_desc.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={i}>{paragraph.replace('## ', '')}</h2>;
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>

              {campaign.funding_breakdown && campaign.funding_breakdown.length > 0 && (
                <div id="funding">
                  <FundingBreakdown breakdown={campaign.funding_breakdown} />
                </div>
              )}

              {campaign.products && campaign.products.length > 0 && (
                <div id="products">
                  <div className="mb-8">
                    <h3 className="text-3xl font-black font-playfair text-brand-brown mb-2">Choose What You Want to Fund</h3>
                    <p className="text-brand-brown/60 text-lg">Each item below represents a specific, tangible contribution.</p>
                  </div>
                  <ProductGrid products={campaign.products} onDonateClick={handleDonateOpen} />
                </div>
              )}

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

      {/* Donation Modal Handler */}
      {isModalOpen && (
        <DonationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaignId={campaign.id}
          campaignName={campaign.title}
          defaultAmount={defaultAmount}
        />
      )}
    </>
  );
}
