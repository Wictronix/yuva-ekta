"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-offwhite p-4">
      <div className="desi-card w-full max-w-sm bg-white p-8">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 bg-white rounded-full mx-auto mb-4 border border-brand-pink/20 shadow-sm overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <Image
              src="/yuva-ekta-logo.jpg"
              alt="Yuva Ekta"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-black font-playfair text-brand-brown">Admin Login</h1>
          <p className="text-sm text-brand-brown/60 mt-2">Sign in to manage campaigns</p>
        </div>

        {error && (
          <div className="bg-red-50 text-brand-terra p-3 border border-red-100 rounded-lg text-sm mb-6 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-brand-brown/60">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-wider font-bold text-brand-brown/60">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/50"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 rounded-xl font-bold bg-brand-pink hover:bg-brand-pink-dark text-white"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
