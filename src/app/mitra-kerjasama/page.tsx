"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingNav, Footer } from "@/components/layout";
import { FloatingLoginButton } from "@/components/layout/floating-login";
import { TransitionLink } from "@/components/ui";

const partnerCategories = [
  { id: "pemerintah", label: "Pemerintah" },
  { id: "kesehatan", label: "Institusi Kesehatan" },
  { id: "teknologi", label: "Mitra Teknologi" },
];

const partners = {
  pemerintah: [
    { name: "Kementerian Kesehatan RI", logo: "/logo_kemkes.png" },
    { name: "Kementerian Dalam Negeri", logo: "https://kompaspedia.kompas.id/wp-content/uploads/2020/06/logo_kemendagri.png" },
    { name: "Bappenas", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Logo_Bappenas_Indonesia_%28National_Development_Planning_Agency%29.png" },
    
    { name: "Dinas Kesehatan Jawa Barat", logo: "https://dinkesbali.com/storage/dinkesku.png" },
    
  ],
  kesehatan: [
    { name: "WHO Indonesia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/200px-WHO_logo.svg.png" },
    { name: "IDAI", logo: "https://direktoriorganisasiprofesi.wordpress.com/wp-content/uploads/2016/01/logoidai.gif" },
    { name: "UNICEF Indonesia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_UNICEF.svg/200px-Logo_of_UNICEF.svg.png" },
    { name: "Ikatan Bidan Indonesia", logo: "https://ikatanbidanindonesia.org/wp-content/uploads/2024/08/cropped-Site-logo-1.png" },
  ],
  teknologi: [
    { name: "Halodoc", logo: "https://www.halodoc.com/assets/img/meta-tags.jpg" },
    { name: "Alodokter", logo: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1532655371/3669156ccbf6b6fa159776f00e2dca9432c0f183_kdsyjs.png" },
    { name: "Good Doctor", logo: "https://cdn.antaranews.com/cache/1200x800/2022/01/21/Picsart_22-01-21_10-59-48-628_copy_1024x683.jpg" },
    { name: "Prixa", logo: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_535/https://insurtechindonesia.com/wp-content/uploads/2022/09/prixa.png.webp" },
  ],
};

export default function MitraKerjasama() {
  const [activeCategory, setActiveCategory] = useState("pemerintah");
  const [activeStep, setActiveStep] = useState("daftar");

  return (
    <main className="min-h-screen bg-white">
      <FloatingNav />
      <FloatingLoginButton />
      <section className="relative h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "contrast(1.05) saturate(1.2) brightness(0.5)",
          }}
        >
          <source src="/Posyandu_Hero_Background_Video_Creation.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay - stronger for text contrast */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)"
          }}
        />
        
        {/* Subtle warm tint */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(to top, rgba(20,15,10,0.4) 0%, transparent 50%)"
          }}
        />

        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at 30% 70%, transparent 20%, rgba(0,0,0,0.4) 100%)" 
          }}
        />

        {/* MAIN CONTENT - Bottom anchored, grounded */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-28 lg:pb-32">
          <div className="max-w-xl">
            
            {/* Main headline */}
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5 md:mb-6"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Wujudkan <span className="text-emerald-400">Indonesia Sehat</span><br />
              Bersama Kami
            </h1>

            {/* Supporting text */}
            <p 
              className="text-sm md:text-base text-white/70 mb-8 md:mb-10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bergabung sebagai mitra kesehatan digital terpercaya.
            </p>

            {/* CTA */}
            <Link href="/kontak">
              <button 
                className="group px-6 py-3 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-400 transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Jadi Mitra
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>

            {/* Stats - Clean, no bullshit */}
            <div className="flex items-center gap-8 mt-12 md:mt-14 text-sm text-white/60">
              <span><strong className="text-white font-semibold">500+</strong> Mitra Aktif</span>
              <span><strong className="text-white font-semibold">34</strong> Provinsi</span>
              <span className="text-white/40">Sejak 2023</span>
            </div>

          </div>
        </div>

      </section>

      <section className="py-16 md:py-20 bg-stone-100">
        <div className="w-[90%] max-w-7xl mx-auto">
          {/* Header - Left aligned, not centered */}
          <div className="mb-12 md:mb-16">
            <span className="text-xs font-medium uppercase tracking-[3px] text-emerald-600/80">
              Dipercaya Oleh
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-stone-800 mt-2"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Mitra & Partner
            </h2>
          </div>

          {/* Tabs - Underline style, not pill */}
          <div className="flex gap-8 mb-10 border-b border-stone-200">
            {partnerCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`pb-3 text-sm font-medium transition-all relative ${
                  activeCategory === cat.id
                    ? "text-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          {/* Logos - Asymmetric, varied layout */}
          <div className="flex flex-wrap items-center gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-8">
            {partners[activeCategory as keyof typeof partners].map((partner, index) => (
              <div
                key={index}
                className={`
                  group relative transition-all duration-300 hover:opacity-100
                  ${index === 0 ? 'opacity-90' : 'opacity-60 hover:opacity-90'}
                `}
                style={{
                  // Vary sizes based on index for asymmetric feel
                  transform: index % 3 === 1 ? 'translateY(-4px)' : index % 3 === 2 ? 'translateY(4px)' : 'none',
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`
                    w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300
                    ${index === 0 ? 'h-12 md:h-16' : index % 2 === 0 ? 'h-10 md:h-14' : 'h-8 md:h-12'}
                  `}
                />
              </div>
            ))}
          </div>

          {/* Subtle call to action */}
          <p className="mt-12 text-sm text-stone-400">
            Tertarik menjadi mitra? <a href="/kontak" className="text-emerald-600 hover:underline">Hubungi kami</a>
          </p>
        </div>
      </section>

      {/* How It Works - Split Layout */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="w-[90%] max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-medium uppercase tracking-[3px] text-emerald-400/80">
              Proses Kemitraan
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Cara Bergabung Sebagai Mitra
            </h2>
          </div>

          {/* Split Layout */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
            
            {/* Sidebar - Tabs */}
            <div className="md:w-[35%] lg:w-[30%]">
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                <button
                  onClick={() => setActiveStep("daftar")}
                  className={`flex-shrink-0 px-5 py-4 rounded-xl text-left font-medium transition-all ${
                    activeStep === "daftar"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  <span className="block text-sm md:text-base">01</span>
                  <span className="block text-base md:text-lg mt-1">Daftar & Verifikasi</span>
                </button>
                
                <button
                  onClick={() => setActiveStep("training")}
                  className={`flex-shrink-0 px-5 py-4 rounded-xl text-left font-medium transition-all ${
                    activeStep === "training"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  <span className="block text-sm md:text-base">02</span>
                  <span className="block text-base md:text-lg mt-1">Training & Setup</span>
                </button>
                
                <button
                  onClick={() => setActiveStep("kolaborasi")}
                  className={`flex-shrink-0 px-5 py-4 rounded-xl text-left font-medium transition-all ${
                    activeStep === "kolaborasi"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  <span className="block text-sm md:text-base">03</span>
                  <span className="block text-base md:text-lg mt-1">Mulai Kolaborasi</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="md:w-[65%] lg:w-[70%]">
              
              {/* Daftar & Verifikasi */}
              {activeStep === "daftar" && (
                <div>
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    Daftar & Verifikasi Akun
                  </h3>
                  
                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column - Persyaratan */}
                    <div>
                      <p className="text-white font-semibold mb-4">Persyaratan dan dokumen:</p>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">1.</span>
                          <span className="text-slate-300">Surat Keterangan RT/RW</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">2.</span>
                          <span className="text-slate-300">Data posyandu (nama, alamat, jumlah kader)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">3.</span>
                          <span className="text-slate-300">Kontak person yang dapat dihubungi</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">4.</span>
                          <span className="text-slate-400">Foto/dokumen pendukung (optional)</span>
                        </li>
                      </ol>
                    </div>
                    
                    {/* Right Column - Proses */}
                    <div>
                      <p className="text-white font-semibold mb-4">Proses:</p>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">1.</span>
                          <span className="text-slate-300">Isi formulir di <span className="text-emerald-400">posyandu.app/register</span></span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">2.</span>
                          <span className="text-slate-300">Upload dokumen persyaratan</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">3.</span>
                          <span className="text-slate-300">Tunggu verifikasi tim (1-2 hari kerja)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">4.</span>
                          <span className="text-slate-300">Terima konfirmasi dan login via email</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Training & Setup */}
              {activeStep === "training" && (
                <div>
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    Pelatihan Platform & Setup Awal
                  </h3>
                  
                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column - Yang Didapat */}
                    <div>
                      <p className="text-white font-semibold mb-4">Yang Anda dapatkan:</p>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">1.</span>
                          <span className="text-slate-300">Video training lengkap (30-45 menit)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">2.</span>
                          <span className="text-slate-300">User manual dan panduan teknis</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">3.</span>
                          <span className="text-slate-300">Sesi onboarding call dengan support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">4.</span>
                          <span className="text-slate-300">Testing environment dengan data dummy</span>
                        </li>
                      </ol>
                    </div>
                    
                    {/* Right Column - Proses Setup */}
                    <div>
                      <p className="text-white font-semibold mb-4">Proses setup:</p>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">1.</span>
                          <span className="text-slate-300">Tonton video training</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">2.</span>
                          <span className="text-slate-300">Setup data posyandu existing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">3.</span>
                          <span className="text-slate-300">Testing fitur dengan data dummy</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">4.</span>
                          <span className="text-slate-300">Clarification dengan tim support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-teal-400 font-bold">5.</span>
                          <span className="text-slate-300">Approval untuk go live</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Kolaborasi */}
              {activeStep === "kolaborasi" && (
                <div>
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    Aktivasi Layanan & Kolaborasi Aktif
                  </h3>
                  
                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column - Setelah Approved */}
                    <div>
                      <p className="text-white font-semibold mb-4">Setelah approved:</p>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">1.</span>
                          <span className="text-slate-300">Aktivasi akun untuk data production</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">2.</span>
                          <span className="text-slate-300">Akses penuh ke semua fitur platform</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">3.</span>
                          <span className="text-slate-300">Mulai pencatatan digital posyandu</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">4.</span>
                          <span className="text-slate-300">Monitoring dan laporan real-time</span>
                        </li>
                      </ol>
                    </div>
                    
                    {/* Right Column - Dukungan */}
                    <div>
                      <p className="text-white font-semibold mb-4">Dukungan berkelanjutan:</p>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span className="text-slate-300">Support team via chat/email</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span className="text-slate-300">Training resources dan FAQ</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span className="text-slate-300">Monthly updates fitur baru</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span className="text-slate-300">Community forum berbagi best practices</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10">
                <TransitionLink href="/daftar-mitra">
                  <button 
                    className="px-6 py-3 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-400 transition-all duration-300"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    Mulai Pendaftaran
                  </button>
                </TransitionLink>
              </div>

            </div>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
