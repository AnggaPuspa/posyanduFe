"use client";

import { useState, useEffect, useCallback } from "react";
import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Avatar, Badge, Spinner } from "@/components/ui";
import { recordsService } from "@/services";
import type { RecordPemeriksaan } from "@/types";

function RisikoBadge({ level }: { level: string }) {
  const config: Record<string, { variant: "success" | "warning" | "danger"; icon: React.ElementType; label: string }> = {
    hijau: { variant: "success", icon: CheckCircle2, label: "Risiko Rendah" },
    normal: { variant: "success", icon: CheckCircle2, label: "Risiko Rendah" },
    kuning: { variant: "warning", icon: AlertTriangle, label: "Risiko Sedang" },
    kurang: { variant: "warning", icon: AlertTriangle, label: "Risiko Sedang" },
    merah: { variant: "danger", icon: AlertTriangle, label: "Risiko Tinggi" },
    buruk: { variant: "danger", icon: AlertTriangle, label: "Risiko Tinggi" },
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

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AnalisisPage() {
  const [data, setData] = useState<RecordPemeriksaan[]>([]);
  const [loading, setLoading] = useState(true);

  const muatData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await recordsService.ambilDaftar({ per_page: 50 });
      const response = result as any;
      
      if (response?.data?.data && Array.isArray(response.data.data)) {
        // Filter hanya yang punya AI prediction
        const records = (response.data.data as RecordPemeriksaan[]).filter(r => r.ai_prediction);
        setData(records);
      }
    } catch (error) {
      console.error("Gagal memuat data analisis:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    muatData();
  }, [muatData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Analisis AI</h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">Hasil analisis pertumbuhan menggunakan AI (Google Gemini)</p>
        </div>
        <Badge variant="info" className="flex items-center gap-2 px-4 py-2 w-fit">
          <Brain className="w-5 h-5" />
          Powered by Gemini AI
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : data.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Brain className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500 text-lg">Belum ada data analisis AI</p>
            <p className="text-stone-400 text-sm mt-1">Data analisis akan muncul setelah input pemeriksaan</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {data.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <Avatar name={record.child?.nama_anak || "?"} size="lg" jenisKelamin={record.child?.jenis_kelamin as "L" | "P"} />
                    <div>
                      <CardTitle>{record.child?.nama_anak || "Anak"}</CardTitle>
                      <p className="text-sm text-stone-500">Pemeriksaan: {formatTanggal(record.created_at || record.tanggal_periksa || "")}</p>
                    </div>
                  </div>
                  <RisikoBadge level={record.ai_prediction?.hasil_prediksi || "normal"} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-5">
                    <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Z-Score (Standar WHO)</h4>
                    <ZScoreBar value={record.ai_prediction?.z_score_bb_u || 0} label="BB/U (Berat per Umur)" />
                    <ZScoreBar value={record.ai_prediction?.z_score_tb_u || 0} label="TB/U (Tinggi per Umur)" />
                    {record.ai_prediction?.z_score_bb_tb && (
                      <ZScoreBar value={record.ai_prediction.z_score_bb_tb} label="BB/TB (Berat per Tinggi)" />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className={`p-4 rounded-2xl ${
                      record.ai_prediction?.hasil_prediksi === 'buruk' ? 'bg-rose-50' : 
                      record.ai_prediction?.hasil_prediksi === 'kurang' ? 'bg-amber-50' : 'bg-emerald-50'
                    }`}>
                      <p className="font-bold text-stone-800 mb-1 capitalize" style={{ fontFamily: 'var(--font-nunito)' }}>
                        {record.ai_prediction?.hasil_prediksi || "Normal"}
                      </p>
                      <p className="text-sm text-stone-600">
                        Berat: {record.berat_badan} kg • Tinggi: {record.tinggi_badan} cm
                      </p>
                    </div>
                    
                    {record.ai_prediction?.saran && (
                      <div className="p-4 rounded-2xl bg-violet-50">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-violet-500" />
                          <span className="text-sm font-semibold text-violet-700">Saran AI</span>
                        </div>
                        <p className="text-sm text-violet-600">{record.ai_prediction.saran}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-100">
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Rekomendasi</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.ai_prediction?.hasil_prediksi === "normal" ? (
                      <>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Pertahankan pola makan seimbang
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Lanjutkan pemeriksaan rutin
                        </span>
                      </>
                    ) : record.ai_prediction?.hasil_prediksi === "kurang" ? (
                      <>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-amber-500" />
                          Tingkatkan asupan protein
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-amber-500" />
                          Pemeriksaan lebih sering
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-rose-500" />
                          Konsultasi ke Puskesmas
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-rose-500" />
                          Pantau setiap 2 minggu
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
