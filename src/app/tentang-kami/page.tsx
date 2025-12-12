"use client";

import { Users, Target, Heart, Sparkles } from "lucide-react";
import { FloatingNav, Footer } from "@/components/layout";

export default function TentangKami() {
  return (
    <main className="min-h-screen bg-stone-50">
      <FloatingNav />

      {/* Hero Section with Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600)',
          }}
        />
        {/* Teal Overlay - matching landing page */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-slate-900/80" />
        
        {/* Navigation Overlay Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900/50 to-transparent" />
      </section>

      {/* Content Card - Overlapping Hero */}
      <section className="relative -mt-32 z-10 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 
              className="text-3xl md:text-4xl font-bold text-stone-800 mb-6"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Hi, Kami <span className="text-emerald-600">Posyandu+</span>
            </h1>
            
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Hadir sejak 2024, kami berkomitmen menciptakan sistem pemantauan kesehatan balita yang berkelanjutan melalui 
              ekosistem digital. Sebagai platform independen, Posyandu+ mempunyai tujuan <span className="text-emerald-600 font-semibold">#CegahStunting</span> dengan membuat 
              pencatatan dan analisis data balita jadi lebih efisien dan akurat. Mulai dari pemeriksaan rutin sampai 
              deteksi dini stunting dengan AI. Kami percaya Indonesia dapat memiliki generasi yang tidak hanya sehat 
              tetapi juga berkualitas.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-stone-100">
              {[
                { value: "12,500+", label: "Balita Terpantau", color: "text-emerald-600" },
                { value: "340+", label: "Posyandu Aktif", color: "text-teal-600" },
                { value: "28,000+", label: "Kader Terlatih", color: "text-amber-600" },
                { value: "34", label: "Provinsi", color: "text-sky-600" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className={`text-2xl md:text-3xl font-bold ${stat.color}`} style={{ fontFamily: 'var(--font-nunito)' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-stone-800 mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
                Visi Kami
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Menjadi platform digital terdepan dalam pemantauan tumbuh kembang anak Indonesia, 
                mendukung terciptanya generasi bebas stunting dan berkualitas.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-amber-200">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-stone-800 mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
                Misi Kami
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Menyediakan teknologi yang mudah diakses untuk kader Posyandu dan orang tua dalam 
                memantau kesehatan anak, dengan dukungan analisis AI untuk deteksi dini masalah gizi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-12" style={{ fontFamily: 'var(--font-nunito)' }}>
            Nilai-Nilai Kami
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6 text-white" />,
                title: "Kolaboratif",
                desc: "Bekerja sama dengan kader, tenaga kesehatan, dan orang tua untuk hasil terbaik.",
                gradient: "from-sky-400 to-blue-500",
                shadow: "shadow-sky-200",
              },
              {
                icon: <Sparkles className="w-6 h-6 text-white" />,
                title: "Inovatif",
                desc: "Menggunakan teknologi AI terkini untuk analisis dan deteksi dini yang akurat.",
                gradient: "from-violet-400 to-purple-500",
                shadow: "shadow-violet-200",
              },
              {
                icon: <Heart className="w-6 h-6 text-white" />,
                title: "Peduli",
                desc: "Mengutamakan kesehatan dan masa depan anak-anak Indonesia.",
                gradient: "from-rose-400 to-pink-500",
                shadow: "shadow-rose-200",
              },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg ${value.shadow}`}>
                  {value.icon}
                </div>
                <h3 className="font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {value.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Mitra Kerjasama
          </h2>
          <p className="text-stone-600 text-center mb-12 max-w-2xl mx-auto">
            Kami bekerja sama dengan berbagai pihak untuk mewujudkan Indonesia bebas stunting
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src="/logo_kemkes.png" alt="Kementerian Kesehatan" className="h-16 object-contain grayscale hover:grayscale-0 transition-all" />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_Bangga_Buatan_Indonesia.svg/2048px-Logo_Bangga_Buatan_Indonesia.svg.png" 
              alt="Bangga Buatan Indonesia" 
              className="h-12 object-contain grayscale hover:grayscale-0 transition-all" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
