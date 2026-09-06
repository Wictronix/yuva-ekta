"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { exportToCSV } from "@/lib/export";
import { Search, Download, Filter, Play, Pause, XCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { SubscriptionWithDonor } from "@/lib/supabase/types";

export default function SubscriptionsClient({ subscriptions }: { subscriptions: SubscriptionWithDonor[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Action dialog state
  const [selectedSub, setSelectedSub] = useState<SubscriptionWithDonor | null>(null);
  const [actionType, setActionType] = useState<"pause" | "resume" | "cancel">("pause");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = 
      sub.donor?.name?.toLowerCase().includes(search.toLowerCase()) || 
      sub.donor?.email?.toLowerCase().includes(search.toLowerCase()) ||
      sub.razorpay_subscription_id?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    exportToCSV(filteredSubscriptions.map(s => ({
      ID: s.id,
      "Subscription ID": s.razorpay_subscription_id,
      Donor: s.donor?.name || "Unknown",
      Email: s.donor?.email || "",
      Campaign: s.campaign?.title || "General Fund",
      "Plan Amount": s.plan_amount,
      Status: s.status,
      "Started At": s.started_at ? new Date(s.started_at).toLocaleDateString() : "",
      "Paused At": s.paused_at ? new Date(s.paused_at).toLocaleDateString() : "",
      "Cancelled At": s.cancelled_at ? new Date(s.cancelled_at).toLocaleDateString() : "",
      "Admin Note": s.admin_note || ""
    })), "subscriptions-export");
  };

  const handleOpenAction = (sub: SubscriptionWithDonor, action: "pause" | "resume" | "cancel") => {
    setSelectedSub(sub);
    setActionType(action);
    setReason("");
  };

  const handleExecuteAction = async () => {
    if (!selectedSub) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/razorpay/manage-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: selectedSub.razorpay_subscription_id,
          action: actionType,
          reason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update subscription");
      }

      toast.success(data.message || `Subscription ${actionType}d successfully`);
      setSelectedSub(null);
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-playfair text-brand-brown tracking-tight">Subscriptions</h1>
          <p className="text-brand-brown/60 font-medium">View, manage, and export recurring donation subscriptions.</p>
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
            placeholder="Search by donor name, email or subscription ID..." 
            className="pl-9 bg-white border-brand-brown/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
          <SelectTrigger className="w-[180px] bg-white border-brand-brown/10">
            <Filter className="w-4 h-4 mr-2 text-brand-brown/60" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl border border-brand-brown/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-brand-brown">
            <thead className="text-xs text-brand-brown/60 uppercase bg-brand-offwhite border-b border-brand-brown/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Started</th>
                <th className="px-6 py-4 font-bold tracking-wider">Donor</th>
                <th className="px-6 py-4 font-bold tracking-wider">Campaign</th>
                <th className="px-6 py-4 font-bold tracking-wider">Amount / Month</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-brand-brown/40">
                    No subscriptions found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((s) => (
                  <tr key={s.id} className="border-b border-brand-brown/5 hover:bg-brand-brown/[0.02]">
                    <td className="px-6 py-4 text-brand-brown/70">{s.started_at ? new Date(s.started_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4 font-medium">
                      <div>{s.donor?.name || "Unknown"}</div>
                      <div className="text-xs text-brand-brown/50 font-normal">{s.donor?.email}</div>
                      <div className="text-[10px] text-brand-brown/30 font-mono mt-0.5">{s.razorpay_subscription_id}</div>
                    </td>
                    <td className="px-6 py-4 text-brand-brown/70 truncate max-w-[200px]">
                      {s.campaign?.title || "General Fund"}
                    </td>
                    <td className="px-6 py-4 font-bold">{formatCurrency(s.plan_amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        s.status === 'active' ? 'bg-brand-green/10 text-brand-green' :
                        s.status === 'paused' ? 'bg-amber-100 text-amber-700' :
                        s.status === 'cancelled' || s.status === 'expired' ? 'bg-red-100 text-red-700' :
                        'bg-brand-brown/10 text-brand-brown/70'
                      }`}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {s.status === "active" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenAction(s, "pause")}
                              className="h-8 text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                              <Pause className="w-3 h-3 mr-1" />
                              Pause
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenAction(s, "cancel")}
                              className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {s.status === "paused" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenAction(s, "resume")}
                              className="h-8 text-xs border-brand-green/30 text-brand-green hover:bg-brand-green/10"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Resume
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenAction(s, "cancel")}
                              className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {s.status !== "active" && s.status !== "paused" && (
                          <span className="text-xs text-brand-brown/40 italic">None</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!selectedSub} onOpenChange={() => !isSubmitting && setSelectedSub(null)}>
        <DialogContent className="max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black font-playfair text-brand-brown capitalize">
              {actionType} Subscription
            </DialogTitle>
            <DialogDescription className="text-sm text-brand-brown/70 mt-1">
              Are you sure you want to {actionType} this subscription for{" "}
              <span className="font-bold text-brand-brown">{selectedSub?.donor?.name || "this supporter"}</span> (
              {formatCurrency(selectedSub?.plan_amount || 0)}/month)?
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 space-y-2">
            <label className="text-xs font-bold text-brand-brown/60">Reason / Note (Optional)</label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Supporter requested via email/phone"
              className="border-brand-brown/20 focus-visible:ring-brand-pink text-sm"
            />
          </div>

          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setSelectedSub(null)}
              disabled={isSubmitting}
              className="border-brand-brown/10 text-brand-brown"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExecuteAction}
              disabled={isSubmitting}
              className={
                actionType === "cancel"
                  ? "bg-red-600 hover:bg-red-700 text-white font-bold"
                  : "bg-brand-pink hover:bg-brand-pink-dark text-white font-bold"
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  Updating...
                </>
              ) : (
                `Confirm ${actionType ? actionType.charAt(0).toUpperCase() + actionType.slice(1) : ""}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
