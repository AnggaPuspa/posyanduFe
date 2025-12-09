import Link from "next/link";
import { Baby, ClipboardList, Heart, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-stone-600">Powered by AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
              Posyandu <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Pintar</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Sistem pemantauan tumbuh kembang anak berbasis AI untuk mencegah stunting dan memastikan generasi Indonesia tumbuh sehat
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Link href="/dashboard" className="group">
              <div className="h-full p-8 rounded-3xl bg-white border border-stone-200/60 hover:shadow-xl hover:shadow-amber-100 transition-all duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-orange-200 mb-6">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Kader Posyandu
                </h2>
                <p className="text-stone-500 mb-6">
                  Kelola data balita, input pemeriksaan, dan dapatkan analisis AI untuk deteksi dini stunting
                </p>
                <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-4 transition-all">
                  <span>Masuk sebagai Kader</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            <Link href="/beranda" className="group">
              <div className="h-full p-8 rounded-3xl bg-white border border-stone-200/60 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-200 mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Orang Tua
                </h2>
                <p className="text-stone-500 mb-6">
                  Pantau perkembangan si kecil, lihat hasil analisis, dan dapatkan rekomendasi kesehatan
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all">
                  <span>Masuk sebagai Orang Tua</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-5 bg-white/80 backdrop-blur rounded-3xl shadow-sm">
              <div className="text-center">
                <p className="text-3xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>168</p>
                <p className="text-sm text-stone-500">Balita Terpantau</p>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>5</p>
                <p className="text-sm text-stone-500">Posyandu Aktif</p>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>85%</p>
                <p className="text-sm text-stone-500">Gizi Baik</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-stone-400 mt-12">
            Dikembangkan untuk mendukung program Indonesia Bebas Stunting 2045
          </p>
        </div>
      </div>
    </main>
  );
}
