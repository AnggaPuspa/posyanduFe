"use client";

import { Calendar, TrendingUp, AlertCircle, ChevronRight, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Avatar, StatusBadge, Button } from "@/components/ui";

const anakSaya = { nama: "Andi Pratama", umur: "18 bulan", status: "kuning", terakhir_periksa: "9 Des 2024" };

const riwayatTerbaru = [
  { tanggal: "9 Des 2024", bb: "10.2 kg", tb: "78 cm", status: "kuning" },
  { tanggal: "9 Nov 2024", bb: "9.8 kg", tb: "76 cm", status: "normal" },
  { tanggal: "9 Okt 2024", bb: "9.5 kg", tb: "74 cm", status: "normal" },
];

const rekomendasi = [
  "Tingkatkan asupan protein hewani",
  "Berikan susu 2-3x sehari",
  "Konsultasi dengan dokter anak",
];

export default function BerandaPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Greeting - Hidden on mobile (shown in header) */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
          Halo, Ibu Siti! 👋
        </h1>
        <p className="text-stone-500 mt-1">Pantau tumbuh kembang si kecil dengan mudah</p>
      </div>

      {/* Profile Card + Schedule */}
      <div className="grid gap-3 md:gap-5 lg:grid-cols-3">
        {/* Child Profile Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-6">
              <Avatar name={anakSaya.nama} size="lg" className="w-14 h-14 md:w-16 md:h-16 text-lg md:text-xl" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-2xl font-bold text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.nama}</h3>
                <p className="text-sm md:text-base text-stone-500">{anakSaya.umur}</p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 md:mt-3">
                  <StatusBadge status={anakSaya.status} />
                  <span className="text-xs md:text-sm text-stone-400">Periksa: {anakSaya.terakhir_periksa}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Schedule Card */}
        <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 border-0" hover={false}>
          <CardContent className="p-4 md:p-6 text-white">
            <div className="flex items-center gap-3 mb-2 md:mb-4">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-white/80 text-xs md:text-sm">Jadwal Berikutnya</p>
                <p className="font-bold text-base md:text-lg" style={{ fontFamily: 'var(--font-nunito)' }}>9 Januari 2025</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-white/80">Posyandu Melati • 08:00 WIB</p>
          </CardContent>
        </Card>
      </div>

      {/* History + Recommendations */}
      <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
        {/* Recent History */}
        <Card>
          <CardHeader className="pb-2 md:pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg">Riwayat Terakhir</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs md:text-sm px-2">
                Semua
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3 md:pt-6">
            <div className="space-y-2 md:space-y-3">
              {riwayatTerbaru.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-stone-50/80">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md shrink-0">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{r.tanggal}</p>
                      <p className="text-[11px] md:text-sm text-stone-500">{r.bb} • {r.tb}</p>
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-3 md:mb-5">
              <div className="h-10 w-10 md:h-11 md:w-11 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200 shrink-0">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg">Rekomendasi AI</CardTitle>
                <p className="text-[10px] md:text-xs text-amber-600">Berdasarkan data terbaru</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-stone-600 mb-3 md:mb-4">
              Pertumbuhan Andi perlu perhatian. Tinggi badan sedikit di bawah standar.
            </p>
            <div className="space-y-1.5 md:space-y-2">
              {rekomendasi.map((r, i) => (
                <div key={i} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl">
                  <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600" />
                  </div>
                  <p className="text-xs md:text-sm text-stone-700">{r}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
