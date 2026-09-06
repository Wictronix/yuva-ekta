"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { exportToCSV } from "@/lib/export";
import { 
  Search, 
  Download, 
  RefreshCw, 
  Inbox, 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  ExternalLink, 
  Trash2 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { FormSubmission, SubmissionStatus, SubmissionType } from "@/lib/supabase/types";



export default function SubmissionsClient({ 
  initialSubmissions, 
  tableConfigured 
}: { 
  initialSubmissions: FormSubmission[]; 
  tableConfigured: boolean;
}) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<FormSubmission[]>(initialSubmissions);
  const [activeTab, setActiveTab] = useState<"all" | SubmissionType>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Detail Modal State
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);



  // Metrics
  const totalCount = submissions.length;
  const unreadCount = submissions.filter(s => s.status === "unread").length;
  const volunteerCount = submissions.filter(s => s.type === "volunteer").length;
  const csrCount = submissions.filter(s => s.type === "csr").length;
  const contactCount = submissions.filter(s => s.type === "contact").length;

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesTab = activeTab === "all" || sub.type === activeTab;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const term = search.toLowerCase().trim();
    const matchesSearch = 
      !term ||
      sub.name.toLowerCase().includes(term) ||
      sub.email.toLowerCase().includes(term) ||
      (sub.phone && sub.phone.includes(term)) ||
      (sub.company_name && sub.company_name.toLowerCase().includes(term)) ||
      (sub.subject && sub.subject.toLowerCase().includes(term)) ||
      (sub.message && sub.message.toLowerCase().includes(term));

    return matchesTab && matchesStatus && matchesSearch;
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Submissions refreshed");
    }, 600);
  };



  const handleOpenDetail = (sub: FormSubmission) => {
    setSelectedSubmission(sub);
    setAdminNotes(sub.admin_notes || "");
  };

  const handleUpdateStatus = async (newStatus: SubmissionStatus) => {
    if (!selectedSubmission) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSubmission.id,
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update submission");
      }

      setSubmissions(prev => 
        prev.map(item => item.id === selectedSubmission.id ? { ...item, status: newStatus, admin_notes: adminNotes } : item)
      );
      setSelectedSubmission(prev => prev ? { ...prev, status: newStatus, admin_notes: adminNotes } : null);
      toast.success(`Submission marked as ${newStatus}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error updating submission");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete submission");

      setSubmissions(prev => prev.filter(item => item.id !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
      toast.success("Submission deleted");
    } catch {
      toast.error("Failed to delete submission");
    }
  };

  const handleExport = () => {
    exportToCSV(
      filteredSubmissions.map(s => ({
        ID: s.id,
        Date: new Date(s.created_at).toLocaleString("en-IN"),
        Type: s.type.toUpperCase(),
        Status: s.status.toUpperCase(),
        Name: s.name,
        Email: s.email,
        Phone: s.phone || "",
        Company: s.company_name || "",
        "Thematic Focus": s.thematic_focus || "",
        "Budget Range": s.budget_range || "",
        Subject: s.subject || "",
        Skills: s.skills || "",
        Availability: s.availability || "",
        Message: s.message || "",
        "Admin Notes": s.admin_notes || "",
      })),
      `yuva-ekta-submissions-${activeTab}`
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner if SQL table is not configured */}
      {!tableConfigured && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3 text-amber-900">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Inbox size={20} />
          </div>
          <div>
            <p className="font-bold text-sm">Supabase Table Setup Required</p>
            <p className="text-xs text-amber-900/80">
              Execute <code className="font-mono font-semibold text-brand-pink">supabase/migrations/20260906_create_form_submissions.sql</code> in your Supabase SQL Editor to enable database storage for submissions.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-playfair text-brand-brown">Inquiries & Form Submissions</h1>
          <p className="text-sm text-brand-brown/60">
            Manage volunteer registrations, CSR partnership proposals, and general contact messages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm"
            disabled={isRefreshing}
            className="rounded-xl flex items-center gap-1.5"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin text-brand-pink" : ""} />
            <span>Refresh</span>
          </Button>

          <Button 
            onClick={handleExport} 
            variant="outline" 
            size="sm"
            className="rounded-xl flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-brand-brown/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-brand-brown/50">
            <span className="text-xs uppercase tracking-wider font-bold">Total</span>
            <Inbox size={16} />
          </div>
          <p className="text-2xl font-bold font-playfair text-brand-brown">{totalCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-brown/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-brand-pink">
            <span className="text-xs uppercase tracking-wider font-bold">Unread</span>
            <Clock size={16} />
          </div>
          <p className="text-2xl font-bold font-playfair text-brand-pink">{unreadCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-brown/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs uppercase tracking-wider font-bold">Volunteers</span>
            <Users size={16} />
          </div>
          <p className="text-2xl font-bold font-playfair text-emerald-700">{volunteerCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-brown/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-xs uppercase tracking-wider font-bold">CSR Inquiries</span>
            <Building2 size={16} />
          </div>
          <p className="text-2xl font-bold font-playfair text-purple-700">{csrCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-brown/5 shadow-sm space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs uppercase tracking-wider font-bold">General</span>
            <MessageSquare size={16} />
          </div>
          <p className="text-2xl font-bold font-playfair text-blue-700">{contactCount}</p>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white rounded-3xl border border-brand-brown/5 shadow-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-brand-brown/5 pb-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "all", label: "All Submissions", count: totalCount },
              { id: "volunteer", label: "Volunteers", count: volunteerCount },
              { id: "csr", label: "CSR Proposals", count: csrCount },
              { id: "contact", label: "Contact Us", count: contactCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "all" | SubmissionType)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-brand-pink text-white shadow-sm"
                    : "bg-brand-brown/5 text-brand-brown/70 hover:bg-brand-brown/10"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-black/5 text-brand-brown/60"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Status & Search Filter */}
          <div className="flex items-center gap-3">
            <div className="w-40">
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
                <SelectTrigger className="rounded-xl border-brand-brown/10 text-xs font-semibold">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown/40 w-4 h-4" />
              <Input
                placeholder="Search name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl border-brand-brown/10 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submissions List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-brown/5 text-brand-brown/50 uppercase tracking-wider font-bold">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Submitter / Entity</th>
                <th className="py-3 px-3">Details / Subject</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-brown/5">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-brand-brown/50">
                    <Inbox className="w-8 h-8 mx-auto mb-2 text-brand-brown/30" />
                    <p className="font-semibold">No submissions found</p>
                    <p className="text-[11px]">Submissions from the website forms will appear here in real-time.</p>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => {
                  const isUnread = sub.status === "unread";
                  const dateStr = new Date(sub.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr 
                      key={sub.id} 
                      className={`hover:bg-brand-offwhite/50 transition-colors cursor-pointer ${
                        isUnread ? "bg-brand-pink/[0.02] font-medium" : ""
                      }`}
                      onClick={() => handleOpenDetail(sub)}
                    >
                      <td className="py-4 px-3 whitespace-nowrap text-brand-brown/60">
                        {dateStr}
                      </td>

                      <td className="py-4 px-3 whitespace-nowrap">
                        {sub.type === "volunteer" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                            <Users size={11} />
                            Volunteer
                          </span>
                        )}
                        {sub.type === "csr" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold text-[10px] border border-purple-200">
                            <Building2 size={11} />
                            CSR Proposal
                          </span>
                        )}
                        {sub.type === "contact" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                            <Mail size={11} />
                            Contact
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-brown text-sm">{sub.name}</span>
                          <span className="text-brand-brown/60 text-[11px]">{sub.email}</span>
                          {sub.company_name && (
                            <span className="text-purple-700 font-semibold text-[10px] mt-0.5">
                              {sub.company_name}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-3 max-w-xs">
                        <div className="truncate text-brand-brown">
                          {sub.thematic_focus && (
                            <span className="font-semibold text-brand-pink mr-1.5">
                              [{sub.thematic_focus}]
                            </span>
                          )}
                          {sub.budget_range && (
                            <span className="font-semibold text-emerald-700 mr-1.5">
                              ({sub.budget_range})
                            </span>
                          )}
                          <span>{sub.subject || sub.message || "No subject"}</span>
                        </div>
                        {sub.skills && (
                          <p className="text-[10px] text-brand-brown/50 truncate mt-0.5">
                            Skills: {sub.skills}
                          </p>
                        )}
                      </td>

                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          sub.status === "unread" 
                            ? "bg-rose-100 text-rose-700 animate-pulse" 
                            : sub.status === "contacted"
                            ? "bg-emerald-100 text-emerald-700"
                            : sub.status === "reviewed"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {sub.status}
                        </span>
                      </td>

                      <td className="py-4 px-3 text-right whitespace-nowrap">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 px-2 text-brand-pink hover:bg-brand-pink/10 rounded-lg text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(sub);
                          }}
                        >
                          <span>Review</span>
                          <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Inspection Modal */}
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
          {selectedSubmission && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      selectedSubmission.type === "volunteer" ? "bg-emerald-100 text-emerald-800" :
                      selectedSubmission.type === "csr" ? "bg-purple-100 text-purple-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {selectedSubmission.type}
                    </span>
                    <span className="text-xs text-brand-brown/50">
                      {new Date(selectedSubmission.created_at).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedSubmission.status === "unread" ? "bg-rose-100 text-rose-700" :
                    selectedSubmission.status === "contacted" ? "bg-emerald-100 text-emerald-800" :
                    selectedSubmission.status === "reviewed" ? "bg-amber-100 text-amber-800" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {selectedSubmission.status}
                  </span>
                </div>

                <DialogTitle className="text-2xl font-bold font-playfair text-brand-brown mt-2">
                  {selectedSubmission.name}
                  {selectedSubmission.company_name && (
                    <span className="block text-base font-inter font-normal text-purple-700 mt-1">
                      {selectedSubmission.company_name}
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-xs text-brand-brown/60">
                  Detailed view of inquiry details and direct responder actions.
                </DialogDescription>
              </DialogHeader>

              {/* Submitter Quick Contact Row */}
              <div className="p-4 bg-brand-offwhite/80 rounded-2xl border border-brand-brown/5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-brand-brown/60">Contact Email</p>
                  <a 
                    href={`mailto:${selectedSubmission.email}`}
                    className="font-bold text-sm text-brand-pink hover:underline flex items-center gap-1.5"
                  >
                    <Mail size={14} />
                    <span>{selectedSubmission.email}</span>
                  </a>
                </div>

                {selectedSubmission.phone && (
                  <div className="space-y-1">
                    <p className="text-xs text-brand-brown/60">Phone Number</p>
                    <a 
                      href={`tel:${selectedSubmission.phone}`}
                      className="font-bold text-sm text-brand-brown hover:text-brand-pink flex items-center gap-1.5"
                    >
                      <Phone size={14} />
                      <span>{selectedSubmission.phone}</span>
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <a 
                    href={`mailto:${selectedSubmission.email}?subject=Re: Yuva Ekta Foundation Inquiry`}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-pink text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-brand-pink-dark transition-all"
                  >
                    <Mail size={13} />
                    <span>Reply Email</span>
                  </a>
                  {selectedSubmission.phone && (
                    <a 
                      href={`https://wa.me/${selectedSubmission.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-emerald-700 transition-all"
                    >
                      <span>WhatsApp</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

              {/* Specific Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {selectedSubmission.thematic_focus && (
                  <div className="p-3 bg-white rounded-xl border border-brand-brown/10 space-y-1">
                    <span className="text-[10px] text-brand-brown/50 uppercase tracking-wider font-bold">Thematic Focus</span>
                    <p className="font-bold text-brand-brown">{selectedSubmission.thematic_focus}</p>
                  </div>
                )}
                {selectedSubmission.budget_range && (
                  <div className="p-3 bg-white rounded-xl border border-brand-brown/10 space-y-1">
                    <span className="text-[10px] text-brand-brown/50 uppercase tracking-wider font-bold">CSR Budget Range</span>
                    <p className="font-bold text-emerald-700">{selectedSubmission.budget_range}</p>
                  </div>
                )}
                {selectedSubmission.skills && (
                  <div className="p-3 bg-white rounded-xl border border-brand-brown/10 space-y-1 sm:col-span-2">
                    <span className="text-[10px] text-brand-brown/50 uppercase tracking-wider font-bold">Volunteer Skills / Background</span>
                    <p className="font-bold text-brand-brown">{selectedSubmission.skills}</p>
                  </div>
                )}
                {selectedSubmission.availability && (
                  <div className="p-3 bg-white rounded-xl border border-brand-brown/10 space-y-1 sm:col-span-2">
                    <span className="text-[10px] text-brand-brown/50 uppercase tracking-wider font-bold">Availability</span>
                    <p className="font-bold text-brand-brown">{selectedSubmission.availability}</p>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">Submitted Message</span>
                <div className="p-4 bg-gray-50 rounded-2xl border border-brand-brown/10 text-xs sm:text-sm text-brand-brown/80 font-inter leading-relaxed whitespace-pre-wrap">
                  {selectedSubmission.message || "No additional message provided."}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">Internal Admin Notes</span>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about call outcomes, scheduled meetings, or internal follow-ups..."
                  className="w-full p-3 rounded-xl border border-brand-brown/10 text-xs font-inter focus:ring-2 focus:ring-brand-pink/20 outline-none"
                />
              </div>

              {/* Status Update Actions */}
              <div className="pt-4 border-t border-brand-brown/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-brown/60">Update Status:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(["unread", "reviewed", "contacted", "archived"] as SubmissionStatus[]).map((st) => (
                      <button
                        key={st}
                        disabled={isUpdatingStatus}
                        onClick={() => handleUpdateStatus(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                          selectedSubmission.status === st
                            ? "bg-brand-brown text-white"
                            : "bg-brand-brown/5 text-brand-brown/70 hover:bg-brand-brown/15"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                  className="text-rose-600 hover:bg-rose-50 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
