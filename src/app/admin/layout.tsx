"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, Users, HandHeart, CreditCard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const ADMIN_NAV = [
  { term: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { term: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { term: "Donations", href: "/admin/donations", icon: HandHeart },
  { term: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { term: "Donors", href: "/admin/donors", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-brand-offwhite/50 overflow-hidden text-brand-brown">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-brown/5 hidden md:flex flex-col shadow-sm">
        <div className="p-6 border-b border-brand-brown/5">
          <Link href="/" className="flex items-center gap-3 group" target="_blank">
            <div className="relative w-10 h-10 bg-white rounded-full p-0.5 shadow-sm overflow-hidden flex items-center justify-center border border-brand-pink/20 transition-transform group-hover:scale-105">
              <Image
                src="/yuva-ekta-logo.jpg"
                alt="Yuva Ekta"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide">Yuva Ekta</p>
              <p className="text-[10px] text-brand-brown/50 uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {ADMIN_NAV.map((l) => {
            const isActive = pathname === l.href || (l.href.length > 6 && pathname.startsWith(l.href));
            const Icon = l.icon;
            
            return (
              <Link
                key={l.term}
                href={l.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all group",
                  isActive 
                    ? "bg-brand-pink text-white shadow-sm" 
                    : "text-brand-brown/70 hover:bg-brand-pink/5 hover:text-brand-pink"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-brand-brown/40 group-hover:text-brand-pink")} />
                {l.term}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-brand-brown/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-bold text-brand-brown/70 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut className="w-4 h-4 text-brand-brown/40 group-hover:text-red-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-brand-brown/5 p-4 flex items-center justify-between">
           <div className="font-bold font-playfair flex items-center gap-2">
             <div className="relative w-6 h-6 bg-white rounded-full p-0.5 shadow-sm border border-brand-pink/20 overflow-hidden">
               <Image src="/yuva-ekta-logo.jpg" alt="Logo" fill className="object-contain" />
             </div> 
             Admin
           </div>
           {/* Add a simple mobile menu or just handle it if needed */}
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
