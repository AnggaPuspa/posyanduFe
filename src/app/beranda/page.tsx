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
  "Tingkatkan asupan protein (telur, ikan, daging)",
  "Berikan susu pertumbuhan 2-3 kali sehari",
  "Konsultasi dengan bidan atau dokter anak",
];

export default function BerandaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
          Halo, Ibu Siti! 👋
        </h1>
        <p className="text-stone-500 mt-1">Pantau tumbuh kembang si kecil dengan mudah</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil Anak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar name={anakSaya.nama} size="xl" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.nama}</h3>
                <p className="text-stone-500 mt-1">{anakSaya.umur}</p>
                <div className="flex items-center gap-4 mt-3">
                  <StatusBadge status={anakSaya.status} />
                  <span className="text-sm text-stone-400">Terakhir periksa: {anakSaya.terakhir_periksa}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 border-0" hover={false}>
          <CardContent className="p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Jadwal Berikutnya</p>
                <p className="font-bold text-lg" style={{ fontFamily: 'var(--font-nunito)' }}>9 Januari 2025</p>
              </div>
            </div>
            <p className="text-sm text-white/80">Posyandu Melati • 08:00 WIB</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Riwayat Terakhir</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                Lihat semua
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riwayatTerbaru.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-stone-50/80 hover:bg-stone-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{r.tanggal}</p>
                      <p className="text-sm text-stone-500">BB: {r.bb} • TB: {r.tb}</p>
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Rekomendasi AI</CardTitle>
                <p className="text-xs text-amber-600">Berdasarkan data terbaru</p>
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-4">
              Pertumbuhan Andi perlu perhatian. Tinggi badan sedikit di bawah standar usianya.
            </p>
            <div className="space-y-2">
              {rekomendasi.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Heart className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="text-sm text-stone-700">{r}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
