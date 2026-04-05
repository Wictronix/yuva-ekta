"use client";

import { useState } from "react";
import { exportToCSV } from "@/lib/export";
import { Search, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DonationsClient({ donations }: { donations: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.donor?.name?.toLowerCase().includes(search.toLowerCase()) || 
      donation.donor?.email?.toLowerCase().includes(search.toLowerCase()) ||
      donation.razorpay_payment_id?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    exportToCSV(filteredDonations.map(d => ({
      ID: d.id,
      "Payment ID": d.razorpay_payment_id,
      "Order ID": d.razorpay_order_id,
      Donor: d.donor?.name || "Unknown",
      Email: d.donor?.email || "",
      Campaign: d.campaign?.title || "General Fund",
      Amount: d.amount,
      "Fee Covered": d.fee_covered ? "Yes" : "No",
      "Fee Amount": d.fee_amount,
      "Total Charged": d.total_charged,
      Type: d.type,
      Status: d.status,
      "Date": new Date(d.created_at).toLocaleDateString()
    })), "donations-export");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-playfair text-brand-brown tracking-tight">Donations</h1>
          <p className="text-brand-brown/60 font-medium">View and export donation records.</p>
        </div>
        <Button onClick={handleExport} className="bg-brand-pink text-white hover:bg-brand-pink/90">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown/40" />
          <Input 
            placeholder="Search by donor name, email or payment ID..." 
            className="pl-9 bg-white border-brand-brown/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white border-brand-brown/10">
            <Filter className="w-4 h-4 mr-2 text-brand-brown/60" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="captured">Captured</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl border border-brand-brown/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-brand-brown">
            <thead className="text-xs text-brand-brown/60 uppercase bg-brand-offwhite border-b border-brand-brown/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                <th className="px-6 py-4 font-bold tracking-wider">Donor</th>
                <th className="px-6 py-4 font-bold tracking-wider">Campaign</th>
                <th className="px-6 py-4 font-bold tracking-wider">Net Amount</th>
                <th className="px-6 py-4 font-bold tracking-wider">Total</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-brand-brown/40">
                    No donations found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.id} className="border-b border-brand-brown/5 hover:bg-brand-brown/[0.02]">
                    <td className="px-6 py-4 text-brand-brown/70">{new Date(d.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">
                      <div>{d.donor?.name || "Unknown"}</div>
                      <div className="text-xs text-brand-brown/50 font-normal">{d.donor?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-brand-brown/70 truncate max-w-[200px]">
                      {d.campaign?.title || "General Fund"}
                    </td>
                    <td className="px-6 py-4">{formatCurrency(d.amount)}</td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(d.total_charged)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        d.status === 'captured' ? 'bg-brand-green/10 text-brand-green' :
                        d.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        d.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-brand-brown/10 text-brand-brown/70'
                      }`}>
                        {d.status.toUpperCase()}
                      </span>
                    </td>
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
