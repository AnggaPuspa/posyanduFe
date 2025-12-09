"use client";

import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";

const hasilAnalisis = {
  tanggal: "9 Des 2024",
  z_score_bb_u: -1.5,
  z_score_tb_u: -1.8,
  status_gizi: "Gizi Cukup",
  level_risiko: "kuning",
  interpretasi: "Andi berada di zona waspada. Tinggi badan sedikit di bawah standar usianya.",
  prediksi: "Dengan intervensi nutrisi yang tepat, Andi diprediksi dapat kembali normal dalam 2-3 bulan.",
  rekomendasi: [
    "Tingkatkan asupan protein hewani",
    "Berikan susu 2-3x sehari",
    "Tambahkan sayur dan buah",
    "Tidur cukup (11-14 jam/hari)",
    "Periksa rutin ke Posyandu",
  ],
};

function RisikoBadge({ level }: { level: string }) {
  const config: Record<string, { variant: "success" | "warning" | "danger"; icon: React.ElementType; label: string }> = {
    hijau: { variant: "success", icon: CheckCircle2, label: "Rendah" },
    kuning: { variant: "warning", icon: AlertTriangle, label: "Sedang" },
    merah: { variant: "danger", icon: AlertTriangle, label: "Tinggi" },
  };
  const c = config[level] || config.hijau;
  const Icon = c.icon;
  return (
    <Badge variant={c.variant} className="inline-flex items-center gap-1 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm">
      <Icon className="w-3 h-3 md:w-4 md:h-4" />
      {c.label}
    </Badge>
  );
}

function ZScoreBar({ value, label }: { value: number; label: string }) {
  const position = Math.max(0, Math.min(100, ((value + 3) / 6) * 100));
  const color = value < -2 ? "from-rose-400 to-red-500" : value < -1 ? "from-amber-400 to-orange-500" : "from-emerald-400 to-teal-500";

  return (
    <div className="space-y-1.5 md:space-y-2">
      <div className="flex justify-between text-xs md:text-sm">
        <span className="text-stone-600">{label}</span>
        <span className="font-bold text-stone-800">{value.toFixed(1)} SD</span>
      </div>
      <div className="relative h-3 md:h-4 bg-stone-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/6 bg-rose-200/60" />
          <div className="w-1/6 bg-amber-200/60" />
          <div className="w-2/6 bg-emerald-200/60" />
          <div className="w-1/6 bg-amber-200/60" />
          <div className="w-1/6 bg-rose-200/60" />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br ${color} border-2 border-white shadow-lg`}
          style={{ left: `calc(${position}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[9px] md:text-xs text-stone-400">
        <span>-3</span>
        <span>0</span>
        <span>+3</span>
      </div>
    </div>
  );
}

export default function HasilPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Hasil Analisis AI</h1>
          <p className="text-xs md:text-base text-stone-500 mt-0.5 md:mt-1">Analisis pertumbuhan Andi</p>
        </div>
        <Badge variant="info" className="self-start flex items-center gap-1.5 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm">
          <Brain className="w-3.5 h-3.5 md:w-5 md:h-5" />
          Gemini AI
        </Badge>
      </div>

      {/* Analysis Card */}
      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-base md:text-lg">{hasilAnalisis.tanggal}</CardTitle>
            <RisikoBadge level={hasilAnalisis.level_risiko} />
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            {/* Z-Score */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-wide">Z-Score WHO</h3>
              <ZScoreBar value={hasilAnalisis.z_score_bb_u} label="BB/U" />
              <ZScoreBar value={hasilAnalisis.z_score_tb_u} label="TB/U" />
            </div>
            
            {/* Status & Prediction */}
            <div className="space-y-3 md:space-y-4">
              <div className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-sm md:text-lg font-bold text-amber-800 mb-1 md:mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>{hasilAnalisis.status_gizi}</p>
                <p className="text-xs md:text-sm text-amber-700">{hasilAnalisis.interpretasi}</p>
              </div>
              <div className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-violet-50 border border-violet-100">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-violet-500" />
                  <span className="font-semibold text-sm md:text-base text-violet-800" style={{ fontFamily: 'var(--font-nunito)' }}>Prediksi</span>
                </div>
                <p className="text-xs md:text-sm text-violet-700">{hasilAnalisis.prediksi}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-stone-800 mb-3 md:mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
            Rekomendasi
          </h2>
          <div className="grid gap-2 md:gap-3">
            {hasilAnalisis.rekomendasi.map((r, i) => (
              <div key={i} className="flex items-start gap-2 md:gap-4 p-2.5 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm">
                <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-lg shadow-emerald-200">
                  {i + 1}
                </span>
                <p className="text-xs md:text-base text-stone-700 pt-0.5 md:pt-1">{r}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
