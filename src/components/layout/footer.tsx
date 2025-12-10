"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

const platformLinks = [
  { label: "Dashboard Kader", href: "/dashboard" },
  { label: "Aplikasi Mobile", href: "#" },
  { label: "Laporan Data", href: "/dashboard/laporan" },
  { label: "Analisis AI", href: "/dashboard/analisis" },
];

const supportLinks = [
  { label: "Bantuan Teknis", href: "#" },
  { label: "Panduan Pengguna", href: "#" },
  { label: "FAQ", href: "#" },
];

const legalLinks = [
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Syarat Layanan", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer id="kontak" className="bg-slate-900">
      {/* Trust Bar - Partners */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Official Partners</span>
            <div className="flex items-center gap-6">
              {/* Logo Kemkes (New) */}
              <div className="group flex items-center gap-3 text-slate-500 hover:text-slate-200 transition-colors duration-300">
                <div className="h-10 w-auto flex items-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <img 
                    src="/logo_kemkes.png" 
                    alt="Logo Kementerian Kesehatan" 
                    className="h-full w-auto object-contain"
                  />
                  <div className="flex flex-col ml-3 justify-center">
                    <span className="text-[9px] font-bold leading-tight uppercase text-slate-400 group-hover:text-slate-200">Kementerian</span>
                    <span className="text-[9px] font-bold leading-tight uppercase text-slate-400 group-hover:text-slate-200">Kesehatan RI</span>
                  </div>
                </div>
              </div>
              
              <div className="w-px h-8 bg-slate-700/50" />
              
              {/* Logo Bangga Buatan Indonesia */}
              <div className="group flex items-center gap-3 text-slate-500 hover:text-slate-200 transition-colors duration-300">
                <div className="h-10 w-auto flex items-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                   <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_Bangga_Buatan_Indonesia.svg/2048px-Logo_Bangga_Buatan_Indonesia.svg.png" 
                    alt="Logo Bangga Buatan Indonesia" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-10 md:gap-8 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-4">
              <span className="font-bold text-lg text-white" style={{ fontFamily: 'var(--font-nunito)' }}>
                Posyandu
              </span>
              <span className="font-bold text-lg text-emerald-400">+</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Platform digital untuk pemantauan tumbuh kembang balita Indonesia. Mendukung kader Posyandu dan orang tua.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Dukungan
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Sleek */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Newsletter
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Dapatkan update terbaru langsung ke inbox Anda.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full h-10 pl-10 pr-3 rounded-l-lg bg-slate-800/50 border border-slate-700 border-r-0 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="h-10 px-4 rounded-r-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">Langganan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              © 2024 Posyandu Digital. Hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
