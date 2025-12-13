"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { FloatingNav, Footer } from "@/components/layout";
import { FloatingLoginButton } from "@/components/layout/floating-login";

const allAchievements = [
  { year: "2020", title: "Founding Year", capaian: "Platform Posyandu+ resmi diluncurkan", tingkat: "Nasional" },
  { year: "2021", title: "Startup Incubation", capaian: "Selected for National Health Tech Incubator", tingkat: "Nasional" },
  { year: "2022", title: "Kemkes Innovation", capaian: "Inovasi Terbaik Bidang Kesehatan Ibu dan Anak", tingkat: "Nasional" },
  { year: "2022", title: "Tech for Good", capaian: "Best Social Impact Technology", tingkat: "Nasional" },
  { year: "2023", title: "Digital Innovation Awards", capaian: "Digital Innovation for Public Health", tingkat: "Nasional" },
  { year: "2023", title: "Startup Health Award", capaian: "Top 10 Health Startup Indonesia", tingkat: "Nasional" },
  { year: "2023", title: "APICTA Awards", capaian: "Merit Award for e-Health Category", tingkat: "Internasional" },
  { year: "2024", title: "Indonesia Health Tech Award", capaian: "Gold Medal Kategori Inovasi Kesehatan Digital Nasional 2024", tingkat: "Nasional" },
  { year: "2024", title: "ASEAN Digital Health Awards", capaian: "Best Public Health Innovation 2024", tingkat: "Internasional" },
  { year: "2024", title: "Stunting Prevention Award", capaian: "Penghargaan dari Kemenkes RI untuk kontribusi pencegahan stunting", tingkat: "Nasional" },
  { year: "2024", title: "IDC Future Enterprise", capaian: "Best Future of Digital Health Indonesia", tingkat: "Internasional" },
];

const initialSlideIndex = 0;

export default function TentangKami() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeYear, setActiveYear] = useState("2020");
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const years = ["2020", "2021", "2022", "2023", "2024"];

  const scrollToYear = (year: string) => {
    setActiveYear(year);
    const index = allAchievements.findIndex((a) => a.year === year);
    if (index !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <FloatingNav />
      <FloatingLoginButton />

      <section className="relative h-[400px] overflow-hidden">
        <div className="flex h-full">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600"
            alt="Healthcare checkup"
            className="h-full w-1/4 object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600"
            alt="Mother and baby"
            className="h-full w-1/4 object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600"
            alt="Healthcare worker"
            className="h-full w-1/4 object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600"
            alt="Baby health"
            className="h-full w-1/4 object-cover"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="w-[90%] max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <h1 
              className="text-3xl md:text-4xl font-bold text-slate-800 md:w-[45%]"
              style={{ fontFamily: 'var(--font-nunito)', lineHeight: 1.3 }}
            >
              Hi, Kami Posyandu+
            </h1>

            <div className="md:w-[50%]">
              <p 
                className="text-base md:text-lg leading-relaxed text-slate-600 mb-6"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Hadir sejak 2020, kami berkomitmen menciptakan sistem pemantauan kesehatan balita yang berkelanjutan melalui ekosistem digital. Sebagai platform independen, Posyandu+ mempunyai tujuan #CegahStunting dengan membuat pencatatan dan analisis data balita jadi lebih efisien dan akurat.
              </p>
              <a 
                href="/mitra-kerjasama" 
                className="inline-flex items-center gap-2 text-base font-medium text-emerald-600 hover:text-emerald-700"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Bantu Kami
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle transition gradient */}
      <div className="h-16 bg-gradient-to-b from-white via-white to-slate-50/50" />

      {/* Visi Misi Section - Asymmetric Bold Design */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50/30 via-white to-white overflow-hidden">
        {/* Background decorative elements - more subtle */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-emerald-50/60 to-teal-50/40 rounded-full -translate-y-1/2 translate-x-1/3" />
        {/* Bottom blob removed for cleaner transition to timeline */}
        
        {/* Diagonal accent line - more subtle */}
        <div 
          className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-30"
          style={{ transform: 'rotate(-2deg)' }}
        />

        {/* Center decorative SVG */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1100px] h-auto pointer-events-none opacity-50"
          style={{ zIndex: 0 }}
        >
          <img 
            src="/bg3.svg" 
            alt="" 
            className="w-full h-auto"
          />
        </div>

        <div className="relative w-[90%] max-w-7xl mx-auto">
          {/* VISI - Typography with offset layout */}
          <div className="relative mb-20 md:mb-28">
            {/* Large background text - more subtle */}
            <span 
              className="absolute -top-6 md:-top-10 left-0 text-[100px] md:text-[160px] font-bold text-slate-100/70 leading-none select-none pointer-events-none"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              01
            </span>
            
            <div className="relative grid md:grid-cols-12 gap-8 items-start">
              {/* Label - rotated */}
              <div className="md:col-span-2 md:pt-4">
                <span 
                  className="inline-block text-xs font-bold uppercase tracking-[4px] text-emerald-600 md:-rotate-90 md:origin-left md:translate-y-8"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Visi Kami
                </span>
              </div>
              
              {/* Main content - asymmetric */}
              <div className="md:col-span-10 md:col-start-3">
                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-[1.15] mb-6 max-w-3xl"
                  style={{ fontFamily: 'var(--font-nunito)' }}
                >
                  Indonesia <span className="text-emerald-600">bebas stunting</span>,{' '}
                  <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl text-slate-500 font-medium">
                    dimulai dari data yang akurat.
                  </span>
                </h2>
                
                {/* Floating accent card */}
                <div 
                  className="relative inline-block mt-4 md:mt-0 md:absolute md:-right-8 md:top-1/2 md:-translate-y-1/2 px-6 py-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-200/50 transform hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-nunito)' }}>
                    #CegahStunting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MISI - Dynamic cards with broken layout */}
          <div className="relative">
            {/* Large background text - more subtle */}
            <span 
              className="absolute -top-6 md:-top-10 right-0 text-[100px] md:text-[160px] font-bold text-slate-100/70 leading-none select-none pointer-events-none"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              02
            </span>

            <div className="relative">
              {/* Header - offset */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                <div>
                  <span 
                    className="inline-block text-xs font-bold uppercase tracking-[4px] text-emerald-600 mb-4"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    Misi Kami
                  </span>
                  <h3 
                    className="text-3xl md:text-4xl font-bold text-slate-800"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    Bagaimana kami mewujudkannya
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mt-4 md:mt-0 max-w-xs text-right hidden md:block">
                  Langkah nyata, bukan janji kosong.
                </p>
              </div>

              {/* Misi items - Flowing Zigzag without containers */}
              <div className="relative space-y-16 md:space-y-0">
                
                {/* Misi 1 - Left aligned with giant number */}
                <div className="relative md:flex md:items-start md:gap-8 group">
                  {/* Giant number - overlapping */}
                  <span 
                    className="absolute -left-4 md:relative md:left-0 text-[80px] md:text-[120px] font-bold text-emerald-100 leading-none select-none md:flex-shrink-0 md:-mr-8 z-0 group-hover:text-emerald-200 transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    01
                  </span>
                  <div className="relative z-10 pt-8 md:pt-6 md:max-w-sm">
                    <h4 
                      className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      Digitalisasi Posyandu
                    </h4>
                    <p className="text-slate-500 text-base leading-relaxed">
                      Ubah pencatatan manual jadi digital.<br className="hidden md:block" />
                      <span className="text-slate-400">Cepat. Akurat. Minim kesalahan.</span>
                    </p>
                  </div>
                </div>

                {/* Misi 2 - Right aligned */}
                <div className="relative md:flex md:items-start md:justify-end md:gap-8 md:-mt-8 group">
                  <div className="relative z-10 pt-8 md:pt-6 md:max-w-sm md:text-right md:order-1">
                    <h4 
                      className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      Deteksi Dini via AI
                    </h4>
                    <p className="text-slate-500 text-base leading-relaxed">
                      Analisis otomatis risiko stunting.<br className="hidden md:block" />
                      <span className="text-slate-400">Intervensi sebelum terlambat.</span>
                    </p>
                  </div>
                  {/* Giant number - overlapping */}
                  <span 
                    className="absolute -left-4 md:relative md:left-0 text-[80px] md:text-[120px] font-bold text-teal-100 leading-none select-none md:flex-shrink-0 md:-ml-8 z-0 md:order-2 group-hover:text-teal-200 transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    02
                  </span>
                </div>

                {/* Misi 3 - Left aligned, offset more */}
                <div className="relative md:flex md:items-start md:gap-8 md:ml-16 md:-mt-4 group">
                  {/* Giant number - overlapping */}
                  <span 
                    className="absolute -left-4 md:relative md:left-0 text-[80px] md:text-[120px] font-bold text-amber-100 leading-none select-none md:flex-shrink-0 md:-mr-8 z-0 group-hover:text-amber-200 transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    03
                  </span>
                  <div className="relative z-10 pt-8 md:pt-6 md:max-w-sm">
                    <h4 
                      className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 group-hover:text-amber-700 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      Koneksi Tanpa Batas
                    </h4>
                    <p className="text-slate-500 text-base leading-relaxed">
                      Orang tua & kader, satu ekosistem.<br className="hidden md:block" />
                      <span className="text-slate-400">Pantau tumbuh kembang dari HP.</span>
                    </p>
                  </div>
                </div>

                {/* Misi 4 - Full width statement, dark accent */}
                <div className="relative md:mt-16 group">
                  <div className="relative md:flex md:items-center md:justify-between md:gap-12">
                    {/* Giant number */}
                    <span 
                      className="absolute -left-4 md:relative text-[80px] md:text-[140px] font-bold text-slate-800 leading-none select-none z-0 group-hover:text-emerald-600 transition-colors duration-500"
                      style={{ fontFamily: 'var(--font-nunito)' }}
                    >
                      04
                    </span>
                    <div className="relative z-10 pt-8 md:pt-0 flex-1 md:max-w-md">
                      <h4 
                        className="text-2xl md:text-4xl font-bold text-slate-800 mb-3"
                        style={{ fontFamily: 'var(--font-nunito)' }}
                      >
                        Data-Driven<br />Decision
                      </h4>
                      <p className="text-slate-500 text-base leading-relaxed mb-4">
                        Dashboard realtime untuk pemerintah.<br className="hidden md:block" />
                        <span className="text-slate-400">Kebijakan berdasarkan fakta, bukan asumsi.</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-sky-50/80 pointer-events-none" />
      </section>

      <section className="relative py-20 bg-gradient-to-b from-sky-50 to-blue-100 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/bg2-right.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'calc(100% - 650px) top 80px',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        <div className="relative w-[90%] max-w-7xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-12"
            style={{ fontFamily: 'var(--font-nunito)', lineHeight: 1.3 }}
          >
            Keberhasilan ini adalah<br />hasil sinergi kita bersama
          </h2>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1">
              {years.map((year) => (
                <button 
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeYear === year 
                      ? "bg-emerald-600 text-white" 
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {activeYear === year ? `Tahun ${year}` : year.slice(-2)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!isBeginning && (
                <button 
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {!isEnd && (
                <button 
                  onClick={() => swiperRef.current?.slideNext()}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-[7px] left-0 right-0 h-[2px] bg-slate-300" />
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => { 
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                const currentItem = allAchievements[swiper.activeIndex];
                if (currentItem) setActiveYear(currentItem.year);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              initialSlide={initialSlideIndex}
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                768: { slidesPerView: 3.2, spaceBetween: 24 },
                1024: { slidesPerView: 3.4, spaceBetween: 24 },
              }}
            >
              {allAchievements.map((item, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <div className="w-4 h-4 rounded-full bg-white border-[3px] border-emerald-500 mb-8" />
                    <p className="text-slate-500 text-xs mb-1">POSYANDU+</p>
                    <h3 className="text-slate-800 font-bold text-xl mb-4">{item.title}</h3>
                    <p className="text-slate-400 text-xs mb-1">Capaian:</p>
                    <p className="text-slate-600 text-sm mb-4">{item.capaian}</p>
                    <p className="text-slate-400 text-xs mb-1">Tingkat:</p>
                    <p className="text-slate-700 text-sm font-medium">{item.tingkat}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
