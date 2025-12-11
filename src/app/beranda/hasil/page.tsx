"use client";

import { useState, useEffect, useCallback } from "react";
import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner } from "@/components/ui";
import { ortuService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { Anak } from "@/types";
import type { RiwayatPemeriksaan } from "@/services/ortu.service";

function RisikoBadge({ level }: { level: string }) {
  const config: Record<string, { variant: "success" | "warning" | "danger"; icon: React.ElementType; label: string }> = {
    hijau: { variant: "success", icon: CheckCircle2, label: "Rendah" },
    normal: { variant: "success", icon: CheckCircle2, label: "Normal" },
    kuning: { variant: "warning", icon: AlertTriangle, label: "Sedang" },
    merah: { variant: "danger", icon: AlertTriangle, label: "Tinggi" },
  };
  const c = config[level] || config.normal;
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

function statusFromPrediction(hasil?: string): string {
  if (!hasil) return "normal";
  const lower = hasil.toLowerCase();
  if (lower.includes("buruk") || lower.includes("kurang") || lower.includes("stunting")) return "merah";
  if (lower.includes("lebih") || lower.includes("obesitas")) return "kuning";
  if (lower.includes("normal") || lower.includes("baik") || lower.includes("sehat")) return "normal";
  return "kuning";
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HasilPage() {
  const { tampilkanError } = pakeToast();
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [anakSaya, setAnakSaya] = useState<Anak[]>([]);
  const [riwayat, setRiwayat] = useState<RiwayatPemeriksaan[]>([]);
  const [hasilTerpilih, setHasilTerpilih] = useState<RiwayatPemeriksaan | null>(null);

  const muatData = useCallback(async () => {
    setSedangMemuat(true);
    try {
      const [anakResult, riwayatResult] = await Promise.all([
        ortuService.ambilAnakSaya(),
        ortuService.ambilRiwayat(),
      ]);

      const anakData = (anakResult as any)?.data || anakResult;
      const riwayatData = (riwayatResult as any)?.data || riwayatResult;

      if (Array.isArray(anakData)) {
        setAnakSaya(anakData);
      }

      if (Array.isArray(riwayatData)) {
        setRiwayat(riwayatData);
        if (riwayatData.length > 0) {
          setHasilTerpilih(riwayatData[0]);
        }
      }
    } catch (error) {
      console.error("Error memuat data:", error);
      tampilkanError("Gagal memuat data");
    } finally {
      setSedangMemuat(false);
    }
  }, [tampilkanError]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  if (sedangMemuat) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!hasilTerpilih) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-semibold text-stone-700 mb-2">Belum Ada Hasil AI</h3>
            <p className="text-stone-500 text-sm">Lakukan pemeriksaan di Posyandu untuk mendapatkan hasil analisis AI</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const aiPrediction = hasilTerpilih.ai_prediction;
  const namaAnak = hasilTerpilih.child?.nama_anak || anakSaya[0]?.nama_anak || "Anak";
  const levelRisiko = statusFromPrediction(aiPrediction?.hasil_prediksi || hasilTerpilih.status);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Hasil Analisis AI</h1>
          <p className="text-xs md:text-base text-stone-500 mt-0.5 md:mt-1">Analisis pertumbuhan {namaAnak}</p>
        </div>
        <Badge variant="info" className="self-start flex items-center gap-1.5 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm">
          <Brain className="w-3.5 h-3.5 md:w-5 md:h-5" />
          Gemini AI
        </Badge>
      </div>

      {riwayat.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {riwayat.slice(0, 5).map((r) => (
            <button
              key={r.id}
              onClick={() => setHasilTerpilih(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                hasilTerpilih?.id === r.id
                  ? "bg-violet-500 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {formatTanggal(r.created_at || r.tanggal_periksa || "")}
            </button>
          ))}
        </div>
      )}

      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-base md:text-lg">
              {formatTanggal(hasilTerpilih.created_at || hasilTerpilih.tanggal_periksa || "")}
            </CardTitle>
            <RisikoBadge level={levelRisiko} />
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-wide">Data Pengukuran</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-sky-50 text-center">
                  <p className="text-2xl font-bold text-sky-600">{hasilTerpilih.berat_badan}</p>
                  <p className="text-xs text-sky-500">kg</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{hasilTerpilih.tinggi_badan}</p>
                  <p className="text-xs text-emerald-500">cm</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className={`p-3 md:p-5 rounded-xl md:rounded-2xl ${
                levelRisiko === "merah" ? "bg-rose-50 border border-rose-100" :
                levelRisiko === "kuning" ? "bg-amber-50 border border-amber-100" :
                "bg-emerald-50 border border-emerald-100"
              }`}>
                <p className={`text-sm md:text-lg font-bold mb-1 md:mb-2 ${
                  levelRisiko === "merah" ? "text-rose-800" :
                  levelRisiko === "kuning" ? "text-amber-800" :
                  "text-emerald-800"
                }`} style={{ fontFamily: 'var(--font-nunito)' }}>
                  {aiPrediction?.hasil_prediksi || hasilTerpilih.status || "Normal"}
                </p>
                <p className={`text-xs md:text-sm ${
                  levelRisiko === "merah" ? "text-rose-700" :
                  levelRisiko === "kuning" ? "text-amber-700" :
                  "text-emerald-700"
                }`}>
                  Hasil analisis dari Gemini AI berdasarkan data pengukuran
                </p>
              </div>
              
              {aiPrediction?.saran && (
                <div className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-violet-50 border border-violet-100">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-violet-500" />
                    <span className="font-semibold text-sm md:text-base text-violet-800" style={{ fontFamily: 'var(--font-nunito)' }}>Saran</span>
                  </div>
                  <p className="text-xs md:text-sm text-violet-700">{aiPrediction.saran}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-stone-800 mb-3 md:mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
            Tips Kesehatan
          </h2>
          <div className="grid gap-2 md:gap-3">
            {[
              "Pastikan asupan gizi seimbang setiap hari",
              "Berikan ASI eksklusif hingga 6 bulan",
              "Lakukan penimbangan rutin setiap bulan",
              "Tidur cukup sesuai usia anak",
              "Periksa rutin ke Posyandu",
            ].map((r, i) => (
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
