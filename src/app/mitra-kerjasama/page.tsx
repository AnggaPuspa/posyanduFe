"use client";

import { useState } from "react";
import Link from "next/link";
// lucide-react icons removed - not used
import { FloatingNav, Footer } from "@/components/layout";

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

  return (
    <main className="min-h-screen bg-white">
      <FloatingNav />
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "contrast(1.1) saturate(1.3) brightness(0.7) sepia(0.3)",
          }}
        >
          <source src="/Posyandu_Hero_Background_Video_Creation.mp4" type="video/mp4" />
        </video>

        {/* Sunset/Senja Overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(180deg, rgba(30,20,50,0.4) 0%, rgba(180,80,40,0.35) 50%, rgba(255,140,50,0.25) 100%)",
            mixBlendMode: "multiply"
          }}
        />
        
        {/* Orange/Warm Glow */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(to top, rgba(255,100,50,0.4) 0%, rgba(255,150,80,0.2) 40%, transparent 70%)",
            mixBlendMode: "soft-light"
          }}
        />

        {/* Vignette Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" 
          }}
        />

        {/* Film Grain */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Text Content */}
        <div className="absolute inset-0 flex items-end justify-start px-8 md:px-16 lg:px-24 pb-20 md:pb-28">
          <div className="max-w-4xl">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
              style={{ 
                fontFamily: "var(--font-inter)",
                textShadow: "0 2px 40px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)"
              }}
            >
              Ayo Bantu Kami<br />
              Wujudkan<br />
              Indonesia Sehat
            </h1>
          </div>
        </div>

      </section>


      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-[3px] mb-4 text-emerald-600">
              Dipercaya Oleh
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-800"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Mitra & Partner Kami
            </h2>
          </div>

          <div className="flex justify-center gap-2 mb-12">
            {partnerCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 md:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners[activeCategory as keyof typeof partners].map((partner, index) => (
              <div
                key={index}
                className="group bg-white border border-stone-200 rounded-2xl p-6 flex items-center justify-center aspect-[3/2] hover:border-emerald-300 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 md:max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Mari Berkolaborasi
              </h2>
              <p className="text-slate-400 max-w-md">
                Bergabung bersama kami membangun ekosistem kesehatan digital Indonesia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/kontak">
                <button className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                  Hubungi Kami
                </button>
              </Link>
              <a href="mailto:partnership@posyanduplus.id">
                <button className="px-6 py-3 border border-stone-700 text-stone-300 font-medium rounded-lg hover:bg-stone-800 transition-colors">
                  partnership@posyanduplus.id
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
