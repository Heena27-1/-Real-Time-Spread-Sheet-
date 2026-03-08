"use client";

import Link from "next/link";
import { ArrowRight, FileSpreadsheet, Lock, ExternalLink } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 glass-dark rounded-3xl border border-white/10 shadow-2xl relative z-10 mx-6 hover:border-white/20 transition-all duration-500 hover:shadow-brand-500/10">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 mb-6">
            <FileSpreadsheet size={32} strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome to <span className="gradient-text">Nexus</span></h1>
          <p className="text-white/60 text-center">Your real-time collaborative workspace. Sign in to continue to your dashboard.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="hello@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-white/80">Password</label>
              <a href="#" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
            />
          </div>

          <Link href="/dashboard" className="w-full mt-6 group relative flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-white bg-brand-600 rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-600/30">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Sign In</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/50 flex items-center justify-center gap-2">
            <Lock size={14} /> Secure Firebase Auth Integration
          </p>
        </div>

      </div>
    </div>
  );
}
