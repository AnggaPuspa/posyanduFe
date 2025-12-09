"use client";

import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Avatar, Badge } from "@/components/ui";

const dummyAnalisis = [
  {
    id: 1,
    nama_anak: "Rizki Ramadhan",
    tanggal: "7 Des 2024",
    z_score_bb_u: -2.8,
    z_score_tb_u: -2.5,
    status_gizi: "Gizi Kurang",
    level_risiko: "merah",
    interpretasi: "Anak mengalami underweight dan stunting berdasarkan standar WHO. Berat badan dan tinggi badan berada di bawah -2 SD.",
    prediksi: "Jika tidak ada intervensi, risiko stunting permanen dalam 3 bulan ke depan sangat tinggi.",
    rekomendasi: ["Konsultasi segera ke Puskesmas", "Berikan makanan tinggi protein", "Pantau pertumbuhan setiap 2 minggu"],
  },
  {
    id: 2,
    nama_anak: "Andi Pratama",
    tanggal: "9 Des 2024",
    z_score_bb_u: -1.5,
    z_score_tb_u: -1.8,
    status_gizi: "Gizi Cukup",
    level_risiko: "kuning",
    interpretasi: "Anak berada di zona waspada. Tinggi badan sedikit di bawah rata-rata untuk usianya.",
    prediksi: "Dengan penanganan tepat, anak dapat kembali ke jalur pertumbuhan normal dalam 2-3 bulan.",
    rekomendasi: ["Tingkatkan asupan protein hewani", "Berikan suplemen vitamin", "Pemeriksaan rutin setiap bulan"],
  },
  {
    id: 3,
    nama_anak: "Siti Nurhaliza",
    tanggal: "9 Des 2024",
    z_score_bb_u: 0.5,
    z_score_tb_u: 0.3,
    status_gizi: "Gizi Baik",
    level_risiko: "hijau",
    interpretasi: "Pertumbuhan anak sesuai dengan standar WHO. Berat badan dan tinggi badan dalam rentang normal.",
    prediksi: "Pertumbuhan diprediksi akan tetap optimal jika pola makan dan kesehatan dijaga.",
    rekomendasi: ["Pertahankan pola makan seimbang", "Lanjutkan pemeriksaan rutin", "Pastikan imunisasi lengkap"],
  },
];

function RisikoBadge({ level }: { level: string }) {
  const config: Record<string, { variant: "success" | "warning" | "danger"; icon: React.ElementType; label: string }> = {
    hijau: { variant: "success", icon: CheckCircle2, label: "Risiko Rendah" },
    kuning: { variant: "warning", icon: AlertTriangle, label: "Risiko Sedang" },
    merah: { variant: "danger", icon: AlertTriangle, label: "Risiko Tinggi" },
  };
  const c = config[level] || config.hijau;
  const Icon = c.icon;
  return (
    <Badge variant={c.variant} className="inline-flex items-center gap-1.5 px-3 py-1.5">
      <Icon className="w-4 h-4" />
      {c.label}
    </Badge>
  );
}

function ZScoreBar({ value, label }: { value: number; label: string }) {
  const position = Math.max(0, Math.min(100, ((value + 3) / 6) * 100));
  const color = value < -2 ? "from-rose-400 to-red-500" : value < -1 ? "from-amber-400 to-orange-500" : "from-emerald-400 to-teal-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-stone-600">{label}</span>
        <span className="font-bold text-stone-800">{value.toFixed(1)} SD</span>
      </div>
      <div className="relative h-3 bg-stone-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/6 bg-rose-200/60" />
          <div className="w-1/6 bg-amber-200/60" />
          <div className="w-2/6 bg-emerald-200/60" />
          <div className="w-1/6 bg-amber-200/60" />
          <div className="w-1/6 bg-rose-200/60" />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br ${color} border-2 border-white shadow-lg`}
          style={{ left: `calc(${position}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-stone-400">
        <span>-3</span>
        <span>-2</span>
        <span>0</span>
        <span>+2</span>
        <span>+3</span>
      </div>
    </div>
  );
}

export default function AnalisisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Analisis AI</h1>
          <p className="text-stone-500 mt-1">Hasil analisis pertumbuhan menggunakan AI (Google Gemini)</p>
        </div>
        <Badge variant="info" className="flex items-center gap-2 px-4 py-2">
          <Brain className="w-5 h-5" />
          Powered by Gemini AI
        </Badge>
      </div>

      <div className="space-y-5">
        {dummyAnalisis.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar name={a.nama_anak} size="lg" />
                  <div>
                    <CardTitle>{a.nama_anak}</CardTitle>
                    <p className="text-sm text-stone-500">Pemeriksaan: {a.tanggal}</p>
                  </div>
                </div>
                <RisikoBadge level={a.level_risiko} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-5">
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Z-Score (Standar WHO)</h4>
                  <ZScoreBar value={a.z_score_bb_u} label="BB/U (Berat per Umur)" />
                  <ZScoreBar value={a.z_score_tb_u} label="TB/U (Tinggi per Umur)" />
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl ${a.level_risiko === 'merah' ? 'bg-rose-50' : a.level_risiko === 'kuning' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                    <p className="font-bold text-stone-800 mb-1" style={{ fontFamily: 'var(--font-nunito)' }}>{a.status_gizi}</p>
                    <p className="text-sm text-stone-600">{a.interpretasi}</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-violet-50">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-semibold text-violet-700">Prediksi 3 Bulan</span>
                    </div>
                    <p className="text-sm text-violet-600">{a.prediksi}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-100">
                <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Rekomendasi</h4>
                <div className="flex flex-wrap gap-2">
                  {a.rekomendasi.map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
