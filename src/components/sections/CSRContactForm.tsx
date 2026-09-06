"use client";

import { useState } from "react";
import { Send, CheckCircle2, Building2 } from "lucide-react";

export default function CSRContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    thematicFocus: "Education & Literacy",
    budgetRange: "₹5L - ₹15L",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "csr",
          name: formData.name,
          company_name: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          thematic_focus: formData.thematicFocus,
          budget_range: formData.budgetRange,
          subject: `CSR Proposal Request: ${formData.companyName} (${formData.thematicFocus})`,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit CSR proposal request.");
      }

      setStatus("success");
      setFormData({
        companyName: "",
        name: "",
        email: "",
        phone: "",
        thematicFocus: "Education & Literacy",
        budgetRange: "₹5L - ₹15L",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-10 sm:p-12 rounded-3xl border border-brand-green/20 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black font-playfair text-brand-brown">Proposal Request Submitted</h3>
          <p className="text-sm text-brand-brown/70 font-inter max-w-md mx-auto">
            Thank you for reaching out. Our institutional CSR desk will review your focus areas and connect with a customized project proposal within 2 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-brown/10 shadow-xl space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-pink">
          <Building2 size={14} />
          <span>Institutional Inquiry Form</span>
        </div>
        <h3 className="text-2xl font-black font-playfair text-brand-brown">Submit CSR Proposal Request</h3>
      </div>

      {status === "error" && errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-brown/70">Company / Foundation Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. Acme Technologies Ltd."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-brown/70">Contact Person Name *</label>
            <input
              required
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-brown/70">Corporate Email Address *</label>
            <input
              required
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-brown/70">Official Phone Number *</label>
            <input
              required
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-brown/70">Primary Thematic Focus</label>
            <select
              value={formData.thematicFocus}
              onChange={(e) => setFormData({ ...formData, thematicFocus: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors appearance-none cursor-pointer"
            >
              <option value="Education & Literacy">Education & Baal Pustakalayas</option>
              <option value="Digital Literacy">Digital Saksharta Computer Lab</option>
              <option value="Women Empowerment">Women&apos;s Micro-Enterprises</option>
              <option value="Child Nutrition">Child Daily Nutrition & Meals</option>
              <option value="Multi-Thematic Partnership">Comprehensive Multi-Thematic</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-brown/70">Estimated Project Outlay</label>
            <select
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors appearance-none cursor-pointer"
            >
              <option value="₹5L - ₹15L">₹5 Lakh – ₹15 Lakh</option>
              <option value="₹15L - ₹30L">₹15 Lakh – ₹30 Lakh</option>
              <option value="₹30L - ₹50L">₹30 Lakh – ₹50 Lakh</option>
              <option value="₹50L+">₹50 Lakh+</option>
              <option value="Exploratory / Need Proposal First">Exploratory / Need Proposal First</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-brand-brown/70">Specific Goals or Queries (Optional)</label>
          <textarea
            rows={3}
            placeholder="Describe your company's target geography, employee volunteering interests, or timeline..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-brand-brown/10 rounded-xl px-4 py-3 text-sm font-inter text-brand-brown outline-none focus:border-brand-pink transition-colors resize-none"
          />
        </div>

        <button
          disabled={status === "submitting"}
          className="w-full py-4 rounded-xl bg-brand-pink text-white font-bold text-sm tracking-wider uppercase transition-all hover:bg-brand-pink-dark shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {status === "submitting" ? (
            <span>Sending Proposal Request...</span>
          ) : (
            <>
              <Send size={15} />
              <span>Submit Proposal Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
