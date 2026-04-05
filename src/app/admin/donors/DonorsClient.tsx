"use client";

import { useState } from "react";
import { exportToCSV } from "@/lib/export";
import { Donor } from "@/lib/supabase/types";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DonorsClient({ donors }: { donors: Donor[] }) {
  const [search, setSearch] = useState("");

  const filteredDonors = donors.filter((donor) => 
    donor.name.toLowerCase().includes(search.toLowerCase()) || 
    donor.email.toLowerCase().includes(search.toLowerCase()) ||
    donor.phone.includes(search)
  );

  const handleExport = () => {
    exportToCSV(filteredDonors.map(d => ({
      ID: d.id,
      Name: d.name,
      Email: d.email,
      Phone: d.phone,
      "Registered On": new Date(d.created_at).toLocaleDateString()
    })), "donors-export");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-playfair text-brand-brown tracking-tight">Donors</h1>
          <p className="text-brand-brown/60 font-medium">View and export donor records.</p>
        </div>
        <Button onClick={handleExport} className="bg-brand-pink text-white hover:bg-brand-pink/90">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown/40" />
        <Input 
          placeholder="Search by name, email, or phone..." 
          className="pl-9 max-w-md bg-white border-brand-brown/10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-brand-brown/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-brand-brown">
            <thead className="text-xs text-brand-brown/60 uppercase bg-brand-offwhite border-b border-brand-brown/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Name</th>
                <th className="px-6 py-4 font-bold tracking-wider">Email</th>
                <th className="px-6 py-4 font-bold tracking-wider">Phone</th>
                <th className="px-6 py-4 font-bold tracking-wider">Registered</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brand-brown/40">
                    No donors found matching your search.
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor) => (
                  <tr key={donor.id} className="border-b border-brand-brown/5 hover:bg-brand-brown/[0.02]">
                    <td className="px-6 py-4 font-medium">{donor.name}</td>
                    <td className="px-6 py-4 text-brand-brown/70">{donor.email}</td>
                    <td className="px-6 py-4 text-brand-brown/70">{donor.phone}</td>
                    <td className="px-6 py-4 text-brand-brown/70">{new Date(donor.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
