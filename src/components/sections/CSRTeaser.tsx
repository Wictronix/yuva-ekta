"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { Building2, ShieldCheck, CheckCircle2, FileText, ArrowRight, TrendingUp } from "lucide-react";

export default function CSRTeaser() {
  return (
    <section className="py-24 bg-[#18120E] text-white relative overflow-hidden">
      {/* Cinematic ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
                <Building2 size={13} className="text-brand-pink" />
                <span>Companies Act 2013 · Section 135</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-playfair leading-tight text-white">
                Institutional CSR <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-brand-pink via-[#E85D9E] to-brand-green bg-clip-text text-transparent">
                  Partnerships in Gurugram
                </span>
              </h2>

              <p className="text-white/80 font-inter font-light text-base sm:text-lg leading-relaxed">
                Partner with an audit-verified, MCA-registered non-profit to fulfill Schedule VII CSR mandates. We deploy <strong>88%</strong> of allocated funds directly to grassroots education, skilling, and nutrition centres across Sohna Block with transparent utilization reporting.
              </p>

              {/* Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span className="font-semibold text-white/90">MCA CSR-1 Registered</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <ShieldCheck size={16} className="text-brand-pink shrink-0" />
                  <span className="font-semibold text-white/90">80G & 12A Certified</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <TrendingUp size={16} className="text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white/90">88% Direct Field Deployment</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <FileText size={16} className="text-amber-400 shrink-0" />
                  <span className="font-semibold text-white/90">Audited Financials & Reports</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/csr"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-pink text-white font-bold text-sm shadow-xl shadow-brand-pink/25 hover:bg-brand-pink-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                >
                  <span>Explore CSR & Annual Reports</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/csr#csr-inquiry"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm transition-all"
                >
                  <span>Request Proposal</span>
                </Link>
              </div>
            </m.div>

            {/* Right Interactive Card Column */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 space-y-6 shadow-2xl relative"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-pink block">
                  Schedule VII Alignment
                </span>
                <h3 className="text-2xl font-black font-playfair text-white">
                  Grassroots Project Adoption
                </h3>
                <p className="text-xs text-white/70 font-inter leading-relaxed">
                  Adopt verified village centres with real-time KPI tracking and customized corporate attribution:
                </p>
              </div>

              <div className="space-y-3.5 text-xs font-inter">
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <span className="text-white/90 font-medium">Digital Literacy Lab (Sehjawas)</span>
                  <span className="px-2 py-0.5 rounded-md bg-brand-green/20 text-brand-green font-bold text-[10px]">
                    240 Youth/yr
                  </span>
                </div>
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <span className="text-white/90 font-medium">Remedial Education & Library</span>
                  <span className="px-2 py-0.5 rounded-md bg-brand-pink/20 text-brand-pink font-bold text-[10px]">
                    1,000+ Enrolled
                  </span>
                </div>
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <span className="text-white/90 font-medium">Women Stitching & Livelihood</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold text-[10px]">
                    50 Micro-units
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Statutory Audit</p>
                  <p className="text-xs font-bold text-white/90">Section 135 Compliant</p>
                </div>
                <Link
                  href="/csr#reports"
                  className="text-xs text-brand-pink hover:underline font-bold flex items-center gap-1"
                >
                  <span>Download Certs</span>
                  <span>→</span>
                </Link>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
