import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, HandHeart, RefreshCw } from "lucide-react";

export const revalidate = 0; // Always dynamic

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch recent data for summary
  const [
    { count: totalCampaigns },
    { count: totalDonors },
    { data: donations },
    { data: subscriptions }
  ] = await Promise.all([
    supabase.from("campaigns").select("*", { count: "exact", head: true }),
    supabase.from("donors").select("*", { count: "exact", head: true }),
    supabase.from("donations").select("amount, status").eq("status", "captured"),
    supabase.from("subscriptions").select("plan_amount, status").eq("status", "active")
  ]);

  const totalRaised = (donations || []).reduce((acc, curr) => acc + curr.amount, 0);
  const monthlyRecurring = (subscriptions || []).reduce((acc, curr) => acc + curr.plan_amount, 0);

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-black font-playfair text-brand-brown tracking-tight">Dashboard Overview</h1>
        <p className="text-brand-brown/60 font-medium">Welcome back to the Yuva Ekta admin portal.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-brand-brown/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-brand-brown/60">Total Raised</CardTitle>
            <TrendingUp className="h-4 w-4 text-brand-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-playfair text-brand-brown">{formatCurrency(totalRaised)}</div>
            <p className="text-xs text-brand-brown/40 font-medium mt-1">From one-time donations</p>
          </CardContent>
        </Card>

        <Card className="border-brand-brown/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-brand-brown/60">Active Recurring</CardTitle>
            <RefreshCw className="h-4 w-4 text-brand-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-playfair text-brand-brown">{formatCurrency(monthlyRecurring)}</div>
            <p className="text-xs text-brand-brown/40 font-medium mt-1">Expected monthly</p>
          </CardContent>
        </Card>

        <Card className="border-brand-brown/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-brand-brown/60">Total Donors</CardTitle>
            <HandHeart className="h-4 w-4 text-brand-brown/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-playfair text-brand-brown">{totalDonors || 0}</div>
            <p className="text-xs text-brand-brown/40 font-medium mt-1">Registered in database</p>
          </CardContent>
        </Card>

        <Card className="border-brand-brown/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-brand-brown/60">Campaigns</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-brand-brown/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-playfair text-brand-brown">{totalCampaigns || 0}</div>
            <p className="text-xs text-brand-brown/40 font-medium mt-1">Total created</p>
          </CardContent>
        </Card>
      </div>

      {/* Put a placeholder for tables here like "Recent Donations" */}
      <div className="bg-white desi-card border border-brand-brown/5 p-6 md:p-8">
         <h2 className="text-xl font-bold font-playfair text-brand-brown mb-4">Quick Actions</h2>
         <p className="text-brand-brown/60 mb-6">Manage all data from the sidebar sections.</p>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Example quick actions */}
             <a href="/admin/campaigns" className="p-4 border border-brand-brown/10 rounded-xl hover:border-brand-pink transition-colors font-bold text-sm text-center text-brand-brown">
                 Manage Campaigns
             </a>
             <a href="/admin/donations" className="p-4 border border-brand-brown/10 rounded-xl hover:border-brand-pink transition-colors font-bold text-sm text-center text-brand-brown">
                 View Donations
             </a>
         </div>
      </div>
    </div>
  );
}
