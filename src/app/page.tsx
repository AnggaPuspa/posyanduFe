"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Baby, Users, MapPin, BarChart3, Bell, TrendingUp, Building2, Activity } from "lucide-react";
import { Button } from "@/components/ui";
import { FloatingNav, Footer } from "@/components/layout";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString("id-ID")}{suffix}</span>;
}

function IndonesiaMap() {
  return (
    <div className="relative w-full" style={{ animationTimingFunction: 'ease-in-out' }}>
      {/* Map Image with Color Grading */}
      <img 
        src="/map.svg" 
        alt="Peta Indonesia" 
        className="w-full h-auto saturate-[0.85] contrast-[1.05] opacity-80"
      />
      
      {/* Edge Fade Overlays - Makes map blend into background */}
      {/* Top Fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none" />
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      {/* Left Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
      {/* Right Fade */}
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none" />
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative group select-none pointer-events-none">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-rose-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
      
      {/* 3D Tilt Container */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200/60"
        style={{
          transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)",
          transformStyle: "preserve-3d",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Browser Chrome - macOS Style */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-stone-100 to-stone-50 border-b border-stone-200">
          <div className="flex gap-2">
            {/* Close - Red */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-b from-rose-400 to-rose-500 shadow-sm">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1 rounded-full bg-white/40" />
            </div>
            {/* Minimize - Yellow */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 shadow-sm">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1 rounded-full bg-white/40" />
            </div>
            {/* Maximize - Green */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-500 shadow-sm">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1 rounded-full bg-white/40" />
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-lg border border-stone-200 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-xs text-stone-500 font-medium">posyandu.app/dashboard</span>
            </div>
          </div>
        </div>

        {/* Mini Dashboard */}
        <div className="p-4 bg-stone-50" style={{ transform: "translateZ(20px)" }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Selamat Pagi! 👋</p>
              <p className="text-[10px] text-stone-400">Posyandu Mawar</p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Stats Grid with Icons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { value: "168", label: "Balita", color: "from-sky-400 to-blue-500", icon: <Baby className="w-3.5 h-3.5 text-white" /> },
              { value: "28", label: "Bumil", color: "from-pink-400 to-rose-500", icon: <Users className="w-3.5 h-3.5 text-white" /> },
              { value: "89", label: "Kunjungan", color: "from-emerald-400 to-teal-500", icon: <TrendingUp className="w-3.5 h-3.5 text-white" /> },
              { value: "12", label: "Kader", color: "from-violet-400 to-purple-500", icon: <Users className="w-3.5 h-3.5 text-white" /> },
            ].map((stat, i) => (
              <div key={i} className="p-2 bg-white rounded-xl border border-stone-100">
                <div className={`h-6 w-6 rounded-lg bg-gradient-to-br ${stat.color} mb-1 flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-sm font-bold text-stone-800">{stat.value}</div>
                <div className="text-[10px] text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Chart Area - Grafik Pertumbuhan */}
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-white rounded-xl border border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-stone-600">Pertumbuhan Balita</span>
                <span className="text-[8px] text-emerald-500 font-medium">+15%</span>
              </div>
              <div className="flex items-end gap-0.5" style={{ height: '50px' }}>
                {[35, 42, 38, 55, 52, 65, 72, 68, 78, 85, 88, 95].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-t-sm" 
                    style={{ height: `${h}%` }} 
                  />
                ))}
              </div>
              <div className="flex gap-0.5 mt-1">
                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                  <span key={i} className="flex-1 text-center text-[6px] text-stone-400">{m}</span>
                ))}
              </div>
            </div>
            <div className="w-24 p-3 bg-white rounded-xl border border-stone-100">
              <span className="text-[10px] font-semibold text-stone-600">Gizi Baik</span>
              <div className="relative h-14 w-14 mx-auto mt-1">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e7e5e4" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="url(#donutGrad)" strokeWidth="3" strokeDasharray="75 25" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-stone-700">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Hero Section */}
      <section id="beranda" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
        
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Modernisasi<br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Kesehatan Balita</span><br />
                Indonesia
              </h1>

              <p className="text-lg text-stone-600 mb-8 max-w-lg">
                Platform digital untuk kader Posyandu dan orang tua dalam memantau tumbuh kembang anak. Deteksi dini stunting dengan analisis AI yang akurat.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="shadow-xl shadow-orange-200">
                    Mulai Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/beranda">
                  <Button variant="outline" size="lg">
                    Lihat Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-stone-200">
                <div>
                  <p className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <AnimatedCounter target={12500} />+
                  </p>
                  <p className="text-sm text-stone-500">Balita Terpantau</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div>
                  <p className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <AnimatedCounter target={340} />
                  </p>
                  <p className="text-sm text-stone-500">Posyandu Aktif</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div>
                  <p className="text-2xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <AnimatedCounter target={94} suffix="%" />
                  </p>
                  <p className="text-sm text-stone-500">Gizi Baik</p>
                </div>
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Transition Gradient */}
      <div className="h-16 bg-gradient-to-b from-stone-50 to-white" />

      {/* Coverage Map Section */}
      <section id="peta" className="relative py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Jangkauan Nasional</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
              Hadir di Seluruh Indonesia
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Dari Sabang sampai Merauke, Posyandu Digital mendukung kader dan tenaga kesehatan dalam memantau generasi penerus bangsa
            </p>
          </div>

          {/* Map - Command Center Style with Floating HUD */}
          <div className="relative max-w-5xl mx-auto">
            <IndonesiaMap />
            
            {/* Stats - Fully Transparent Floating */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl px-4">
              <div className="flex items-center justify-center gap-8 md:gap-12">
                  
                  {/* Stat 1: Balita */}
                  <div className="flex items-center gap-2.5 md:px-6">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-400/20">
                      <Baby className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'var(--font-nunito)' }}>
                        <AnimatedCounter target={45280} />
                      </p>
                      <p className="text-[10px] text-slate-600 font-medium">Balita</p>
                    </div>
                  </div>

                  {/* Stat 2: Posyandu */}
                  <div className="flex items-center gap-2.5 md:px-6">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-400/20">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'var(--font-nunito)' }}>
                        <AnimatedCounter target={11220} />
                      </p>
                      <p className="text-[10px] text-slate-600 font-medium">Posyandu</p>
                    </div>
                  </div>

                  {/* Stat 3: Kader */}
                  <div className="flex items-center gap-2.5 md:px-6">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-400/20">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'var(--font-nunito)' }}>
                        <AnimatedCounter target={28450} />
                      </p>
                      <p className="text-[10px] text-slate-600 font-medium">Kader</p>
                    </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JAKI-Inspired Features Section */}
      <section id="fitur" className="relative overflow-visible">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Optional Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Decorative Floating Elements */}
        <div className="absolute top-32 left-[15%] w-4 h-4 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-48 right-[20%] w-3 h-3 bg-white/20 rounded-full animate-pulse delay-300" />
        <div className="absolute top-64 left-[30%] w-2 h-2 bg-white/25 rounded-full animate-pulse delay-500" />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-16">
          {/* Section Header */}
          <div className="text-center mb-8">
            <span 
              className="inline-block text-sm font-semibold text-teal-100 uppercase tracking-[3px] mb-4"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Fitur Unggulan
            </span>
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Solusi Modern untuk<br />Posyandu Digital
            </h2>
          </div>

          {/* Phone + White Card Stack Container */}
          <div className="relative flex justify-center">
            {/* Phone Mockup - extends from top through middle to bottom */}
            <div className="relative">
              {/* Phone Shadow */}
              <div 
                className="absolute -inset-6 bg-black/20 blur-3xl"
                style={{ borderRadius: '3rem 3rem 0 0' }}
              />
              
              {/* iPhone Frame */}
              <div 
                className="relative bg-slate-900 p-3 shadow-2xl"
                style={{
                  width: '320px',
                  height: '500px',
                  borderRadius: '2.5rem 2.5rem 0 0',
                }}
              >
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
                
                {/* Screen */}
                <div 
                  className="relative w-full h-full bg-stone-50 overflow-hidden"
                  style={{ borderRadius: '2rem 2rem 0 0' }}
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-2 pt-10 bg-white">
                    <span className="text-xs font-medium text-slate-600">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4].map((i) => (
                          <div key={i} className={`w-0.5 rounded-full bg-slate-700 ${i === 1 ? 'h-1' : i === 2 ? 'h-1.5' : i === 3 ? 'h-2' : 'h-2.5'}`} />
                        ))}
                      </div>
                      <div className="w-4 h-2 border border-slate-700 rounded-sm ml-1">
                        <div className="w-3/4 h-full bg-emerald-500 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-4 py-2 bg-white border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-800" style={{ fontFamily: 'var(--font-nunito)' }}>Selamat Pagi! 👋</p>
                        <p className="text-[10px] text-slate-500">Posyandu Mawar</p>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-3 space-y-2 bg-stone-50">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "168", label: "Balita", color: "from-sky-400 to-blue-500", icon: <Baby className="w-3 h-3 text-white" /> },
                        { value: "94%", label: "Gizi Baik", color: "from-emerald-400 to-teal-500", icon: <TrendingUp className="w-3 h-3 text-white" /> },
                      ].map((stat, i) => (
                        <div key={i} className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                          <div className={`h-5 w-5 rounded bg-gradient-to-br ${stat.color} mb-1 flex items-center justify-center`}>
                            {stat.icon}
                          </div>
                          <div className="text-sm font-bold text-slate-800">{stat.value}</div>
                          <div className="text-[8px] text-slate-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-semibold text-slate-700">Pertumbuhan Bulanan</span>
                        <span className="text-[7px] text-emerald-600 font-medium bg-emerald-50 px-1 py-0.5 rounded">+15%</span>
                      </div>
                      <div className="flex items-end gap-0.5" style={{ height: '40px' }}>
                        {[35, 42, 38, 55, 52, 65, 72, 68, 78, 85, 88, 95].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-sm" 
                            style={{ height: `${h}%` }} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* More content cards */}
                    <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-[8px] font-semibold text-white">Analisis AI</span>
                      </div>
                      <p className="text-[7px] text-violet-100">3 balita perlu perhatian khusus</p>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                          <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold text-slate-700">Jadwal Posyandu</p>
                          <p className="text-[7px] text-slate-500">Minggu depan</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold text-slate-700">Kunjungan Hari Ini</p>
                          <p className="text-[7px] text-slate-500">12 balita</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <Activity className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold text-slate-700">Imunisasi</p>
                          <p className="text-[7px] text-slate-500">5 balita perlu vaksin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* White Feature Card - Positioned at MIDDLE of phone */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 z-20"
                style={{ top: '45%' }}
              >
                <div 
                  className="bg-white shadow-2xl"
                  style={{
                    width: '680px',
                    padding: '24px 32px',
                    borderRadius: '20px',
                  }}
                >
                  {/* Features Grid - Single Horizontal Row */}
                  <div className="flex justify-center gap-6 md:gap-8">
                    {[
                      { 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <circle cx="12" cy="8" r="4" stroke="#1E3A8A" strokeWidth="1.5"/>
                            <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        ), 
                        title: "Manajemen\nData Balita" 
                      },
                      { 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#1E3A8A" strokeWidth="1.5"/>
                            <path d="M12 9v6M9 12h6" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        ), 
                        title: "Pemeriksaan\nDigital" 
                      },
                      { 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#1E3A8A" strokeWidth="1.5"/>
                            <circle cx="12" cy="12" r="3" stroke="#1E3A8A" strokeWidth="1.5"/>
                          </svg>
                        ), 
                        title: "Analisis AI\nStunting" 
                      },
                      { 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <path d="M3 20h18" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M6 16l4-6 3 4 5-8" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ), 
                        title: "Grafik\nPertumbuhan" 
                      },
                      { 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <circle cx="9" cy="7" r="3" stroke="#1E3A8A" strokeWidth="1.5"/>
                            <circle cx="15" cy="10" r="2.5" stroke="#1E3A8A" strokeWidth="1.5"/>
                            <path d="M3 21v-2a4 4 0 014-4h4" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        ), 
                        title: "Portal\nOrang Tua" 
                      },
                      { 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#1E3A8A" strokeWidth="1.5"/>
                            <path d="M8 8h8M8 12h6M8 16h4" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        ), 
                        title: "Laporan\n& Ekspor" 
                      },
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        className="flex flex-col items-center text-center cursor-pointer group"
                        style={{ minWidth: '70px', maxWidth: '90px' }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: '#DBEAFE' }}
                        >
                          {feature.icon}
                        </div>
                        <p 
                          className="text-[10px] font-medium text-center leading-tight whitespace-pre-line"
                          style={{ color: '#1E3A8A', fontFamily: 'var(--font-nunito)' }}
                        >
                          {feature.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section - Light Teal */}
      <section className="relative bg-gradient-to-b from-teal-100 to-teal-50 py-12 -mt-32">
        {/* Section content */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-teal-700 uppercase tracking-wider mb-2">
            Testimonial
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Dipercaya oleh Ribuan Kader Posyandu
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto">
            Bergabung dengan komunitas kader yang telah merasakan kemudahan menggunakan platform digital Posyandu.
          </p>
        </div>
      </section>

      {/* CTA Section - Compact Pop-Out Card */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-stone-100 overflow-visible">
        <div className="max-w-6xl mx-auto px-6">
          {/* Floating Card Container */}
          <div className="relative">
            {/* The Card */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden">
              {/* Inner Glow Effects - Hidden on mobile */}
              <div className="hidden md:block absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="hidden md:block absolute bottom-0 left-1/2 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl" />

              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: Text Content */}
                <div className="p-6 md:p-10 lg:p-12">
                  {/* Headline */}
                  <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    <span className="text-white">Dari Data,</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">Jadi Generasi Sehat.</span>
                  </h2>

                  {/* Subtext */}
                  <p className="text-slate-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                    Ubah cara Posyandu bekerja. Dengan analisis AI, deteksi stunting jadi lebih cepat, intervensi lebih akurat. Bukan sekadar menimbang, tapi menyelamatkan masa depan.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/dashboard">
                      <button className="group h-12 md:h-14 px-6 md:px-8 rounded-full bg-white text-emerald-900 font-semibold text-sm md:text-base shadow-xl hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                        Lihat Aksi Nyata
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    <Link href="/kontak">
                      <button className="h-12 md:h-14 px-5 md:px-6 rounded-full border border-slate-600 text-slate-300 font-medium text-sm md:text-base hover:bg-slate-800 hover:border-slate-500 transition-all">
                        Hubungi Kami
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right: Spacer for doctor */}
                <div className="hidden lg:block" />
              </div>
            </div>

            {/* Doctor Image - Desktop Only */}
            <div className="hidden lg:flex absolute right-4 bottom-0 z-20 h-full items-end pointer-events-none">
              {/* Backlight Glow */}
              <div className="absolute bottom-0 right-20 w-80 h-[120%] bg-gradient-to-t from-cyan-500/20 via-teal-500/10 to-transparent blur-3xl -z-10" />
              
              {/* Doctor - Giant Pop Out Effect */}
              <img 
                src="/doctor.png" 
                alt="Dokter Profesional" 
                className="relative h-[125%] w-auto object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}