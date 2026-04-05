"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Campaign } from "@/lib/supabase/types";
import { deleteCampaignAction } from "@/app/actions/campaigns";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CampaignsClient({ campaigns }: { campaigns: Campaign[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the campaign "${title}"? This cannot be undone.`)) return;
    
    setIsDeleting(id);
    const result = await deleteCampaignAction(id);
    setIsDeleting(null);
    
    if (result.error) {
      toast.error(`Error deleting campaign: ${result.error}`);
    } else {
      toast.success("Campaign deleted successfully");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-playfair text-brand-brown tracking-tight">Campaigns</h1>
          <p className="text-brand-brown/60 font-medium">Manage fundraising campaigns.</p>
        </div>
        <Link href="/admin/campaigns/new">
          <Button className="bg-brand-pink text-white hover:bg-brand-pink/90">
            <Plus className="w-4 h-4 mr-2" />
            Add New Campaign
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown/40" />
          <Input 
            placeholder="Search campaigns..." 
            className="pl-9 bg-white border-brand-brown/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
          <SelectTrigger className="w-[180px] bg-white border-brand-brown/10">
            <SelectValue placeholder="Status Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl border border-brand-brown/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-brand-brown">
            <thead className="text-xs text-brand-brown/60 uppercase bg-brand-offwhite border-b border-brand-brown/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Campaign</th>
                <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold tracking-wider">Progress</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-brand-brown/40">
                    No campaigns found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((c) => {
                  const progress = c.campaign_goal ? Math.min(100, Math.round((c.amount_raised / c.campaign_goal) * 100)) : 0;
                  return (
                    <tr key={c.id} className="border-b border-brand-brown/5 hover:bg-brand-brown/[0.02]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-brand-brown/5 flex-shrink-0 overflow-hidden relative">
                            {c.cover_image_url ? (
                              <img src={c.cover_image_url} alt={c.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-brand-brown/30">No Img</div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-2">
                              {c.title}
                              {c.is_featured && (
                                <span className="bg-brand-pink/10 text-brand-pink text-[10px] px-1.5 py-0.5 rounded font-bold">FEAT</span>
                              )}
                            </div>
                            <div className="text-xs text-brand-brown/50 truncate max-w-[250px]">{c.short_desc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-brand-brown/70 capitalize">{c.category || "-"}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-xs">{formatCurrency(c.amount_raised)} / {formatCurrency(c.campaign_goal || 0)}</div>
                        <div className="w-full h-1.5 bg-brand-brown/10 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-brand-green" style={{ width: `${progress}%` }} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          c.status === 'active' ? 'bg-brand-green/10 text-brand-green' :
                          c.status === 'archived' ? 'bg-brand-brown/10 text-brand-brown/60' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/campaigns/${c.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-brown/50 hover:text-brand-pink" title="View Public Page">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/campaigns/${c.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-brown/50 hover:text-brand-pink" title="Edit Campaign">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-brand-brown/50 hover:text-red-500" 
                            title="Delete Campaign"
                            disabled={isDeleting === c.id}
                            onClick={() => handleDelete(c.id, c.title)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
