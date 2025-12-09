"use client";

import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";

const hasilAnalisis = {
  tanggal: "9 Desember 2024",
  z_score_bb_u: -1.5,
  z_score_tb_u: -1.8,
  status_gizi: "Gizi Cukup",
  level_risiko: "kuning",
  interpretasi: "Andi berada di zona waspada. Tinggi badan sedikit di bawah rata-rata untuk usianya (18 bulan). Berat badan masih dalam batas normal bawah.",
  prediksi: "Dengan intervensi nutrisi yang tepat, Andi diprediksi dapat kembali ke jalur pertumbuhan normal dalam 2-3 bulan ke depan.",
  rekomendasi: [
    "Tingkatkan asupan protein hewani seperti telur, ikan, atau daging",
    "Berikan susu pertumbuhan 2-3 kali sehari",
    "Tambahkan sayur dan buah dalam menu harian",
    "Pastikan anak cukup tidur (11-14 jam per hari)",
    "Lakukan pemeriksaan rutin setiap bulan ke Posyandu",
  ],
};

function RisikoBadge({ level }: { level: string }) {
  const config: Record<string, { variant: "success" | "warning" | "danger"; icon: React.ElementType; label: string }> = {
    hijau: { variant: "success", icon: CheckCircle2, label: "Risiko Rendah" },
    kuning: { variant: "warning", icon: AlertTriangle, label: "Risiko Sedang" },
    merah: { variant: "danger", icon: AlertTriangle, label: "Risiko Tinggi" },
  };
  const c = config[level] || config.hijau;
  const Icon = c.icon;
  return (
    <Badge variant={c.variant} className="inline-flex items-center gap-2 px-4 py-2">
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
      <div className="relative h-4 bg-stone-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/6 bg-rose-200/60" />
          <div className="w-1/6 bg-amber-200/60" />
          <div className="w-2/6 bg-emerald-200/60" />
          <div className="w-1/6 bg-amber-200/60" />
          <div className="w-1/6 bg-rose-200/60" />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br ${color} border-2 border-white shadow-lg`}
          style={{ left: `calc(${position}% - 12px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-stone-400">
        <span>-3 (Buruk)</span>
        <span>0 (Normal)</span>
        <span>+3 (Lebih)</span>
      </div>
    </div>
  );
}

export default function HasilPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Hasil Analisis AI</h1>
          <p className="text-stone-500 mt-1">Analisis pertumbuhan Andi berdasarkan data terakhir</p>
        </div>
        <Badge variant="info" className="flex items-center gap-2 px-4 py-2">
          <Brain className="w-5 h-5" />
          Powered by Gemini AI
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analisis Pemeriksaan {hasilAnalisis.tanggal}</CardTitle>
            <RisikoBadge level={hasilAnalisis.level_risiko} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Z-Score (Standar WHO)</h3>
              <ZScoreBar value={hasilAnalisis.z_score_bb_u} label="BB/U (Berat per Umur)" />
              <ZScoreBar value={hasilAnalisis.z_score_tb_u} label="TB/U (Tinggi per Umur)" />
            </div>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-lg font-bold text-amber-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>{hasilAnalisis.status_gizi}</p>
                <p className="text-sm text-amber-700">{hasilAnalisis.interpretasi}</p>
              </div>
              <div className="p-5 rounded-2xl bg-violet-50 border border-violet-100">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-violet-500" />
                  <span className="font-semibold text-violet-800" style={{ fontFamily: 'var(--font-nunito)' }}>Prediksi 3 Bulan</span>
                </div>
                <p className="text-sm text-violet-700">{hasilAnalisis.prediksi}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Rekomendasi untuk Orang Tua
          </h2>
          <div className="grid gap-3">
            {hasilAnalisis.rekomendasi.map((r, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-200">
                  {i + 1}
                </span>
                <p className="text-stone-700 pt-1">{r}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
