"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Baby, Users, MapPin, BarChart3, Bell, TrendingUp } from "lucide-react";
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
  // Hanya 6 kota besar strategis untuk tampilan clean
  const beacons = [
    { x: 9, y: 16, label: "Medan", count: "2,340" },
    { x: 21, y: 78, label: "Jakarta", count: "4,560" },
    { x: 39, y: 78, label: "Surabaya", count: "3,120" },
    { x: 60, y: 35, label: "Balikpapan", count: "1,890" },
    { x: 67, y: 58, label: "Makassar", count: "1,450" },
    { x: 93, y: 42, label: "Jayapura", count: "980" },
  ];

  return (
    <div className="relative">
      <div className="relative w-full">
        <img 
          src="/map.svg" 
          alt="Peta Indonesia" 
          className="w-full h-auto"
          style={{ filter: 'hue-rotate(120deg) saturate(0.35) brightness(1.05)' }}
        />
        
        {/* Clean Beacons */}
        <div className="absolute inset-0">
          {beacons.map((beacon, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${beacon.x}%`, top: `${beacon.y}%` }}
            >
              {/* Subtle pulse ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-400/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              </div>
              
              {/* Beacon dot */}
              <div className="relative w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg shadow-emerald-400/50 ring-2 ring-white" />
              
              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-stone-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                  <span className="font-semibold">{beacon.label}</span>
                  <span className="text-emerald-400 ml-1">{beacon.count}</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
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

          {/* Map - Command Center Style */}
          <div className="relative max-w-5xl mx-auto mb-16">
            <IndonesiaMap />
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl border border-sky-100">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200">
                <Baby className="w-7 h-7 text-white" />
              </div>
              <p className="text-4xl font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                <AnimatedCounter target={45280} />
              </p>
              <p className="text-stone-600">Balita Terpantau</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <p className="text-4xl font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                <AnimatedCounter target={11220} />
              </p>
              <p className="text-stone-600">Posyandu Terdaftar</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                <Users className="w-7 h-7 text-white" />
              </div>
              <p className="text-4xl font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                <AnimatedCounter target={28450} />
              </p>
              <p className="text-stone-600">Kader Aktif</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Bergabung Bersama Kami
          </h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
            Jadilah bagian dari gerakan Indonesia Bebas Stunting 2045. Daftarkan Posyandu Anda dan mulai pantau tumbuh kembang anak dengan teknologi terkini.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl">
                Daftar Posyandu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/beranda">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
