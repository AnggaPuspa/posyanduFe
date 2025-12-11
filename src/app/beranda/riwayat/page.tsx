"use client";

import { useState, useEffect, useCallback } from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, StatusBadge, Spinner } from "@/components/ui";
import { GrafikPertumbuhan } from "@/components/charts";
import { ortuService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { Anak } from "@/types";
import type { RiwayatPemeriksaan } from "@/services/ortu.service";

function hitungUmur(tanggal: string) {
  const lahir = new Date(tanggal);
  const sekarang = new Date();
  const bulan = (sekarang.getFullYear() - lahir.getFullYear()) * 12 + (sekarang.getMonth() - lahir.getMonth());
  if (bulan < 12) return `${bulan} bulan`;
  const tahun = Math.floor(bulan / 12);
  const sisaBulan = bulan % 12;
  return `${tahun} thn ${sisaBulan} bln`;
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusFromPrediction(hasil?: string): string {
  if (!hasil) return "normal";
  const lower = hasil.toLowerCase();
  if (lower.includes("buruk") || lower.includes("kurang") || lower.includes("stunting")) return "merah";
  if (lower.includes("lebih") || lower.includes("obesitas")) return "kuning";
  if (lower.includes("normal") || lower.includes("baik") || lower.includes("sehat")) return "normal";
  return "kuning";
}

export default function RiwayatPage() {
  const { tampilkanError } = pakeToast();
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [anakSaya, setAnakSaya] = useState<Anak[]>([]);
  const [riwayat, setRiwayat] = useState<RiwayatPemeriksaan[]>([]);
  const [anakTerpilih, setAnakTerpilih] = useState<Anak | null>(null);

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
        if (anakData.length > 0) {
          setAnakTerpilih(anakData[0]);
        }
      }

      if (Array.isArray(riwayatData)) {
        setRiwayat(riwayatData);
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

  const riwayatFiltered = anakTerpilih 
    ? riwayat.filter(r => r.child?.id === anakTerpilih.id)
    : riwayat;

  if (sedangMemuat) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Riwayat Pertumbuhan</h1>
        <p className="text-stone-500 mt-1">Pantau perkembangan si kecil dari waktu ke waktu</p>
      </div>

      {anakSaya.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {anakSaya.map((anak) => (
            <button
              key={anak.id}
              onClick={() => setAnakTerpilih(anak)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                anakTerpilih?.id === anak.id
                  ? "bg-violet-500 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {anak.nama_anak}
            </button>
          ))}
        </div>
      )}

      {anakTerpilih && (
        <Card>
          <CardHeader className="pb-2 md:pb-0">
            <CardTitle className="text-base md:text-lg">Grafik Pertumbuhan - {anakTerpilih.nama_anak}</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 md:pt-6">
            <GrafikPertumbuhan anakId={anakTerpilih.id} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <CardTitle className="text-base md:text-lg">Riwayat Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          {riwayatFiltered.length === 0 ? (
            <div className="text-center py-8 text-stone-400">
              <TrendingUp className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">Belum ada riwayat pemeriksaan</p>
            </div>
          ) : (
            <>
              <div className="md:hidden space-y-2">
                {riwayatFiltered.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-sm">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                            {formatTanggal(r.created_at || r.tanggal_periksa || "")}
                          </p>
                          <p className="text-[10px] text-stone-400">{r.child?.nama_anak}</p>
                        </div>
                      </div>
                      <StatusBadge status={statusFromPrediction(r.ai_prediction?.hasil_prediksi || r.status)} />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-1.5 rounded-lg bg-white">
                        <p className="text-xs font-bold text-stone-700">{r.berat_badan}</p>
                        <p className="text-[9px] text-stone-400">BB</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white">
                        <p className="text-xs font-bold text-stone-700">{r.tinggi_badan}</p>
                        <p className="text-[9px] text-stone-400">TB</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white">
                        <p className="text-xs font-bold text-stone-700">{r.lingkar_kepala || "-"}</p>
                        <p className="text-[9px] text-stone-400">LK</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white">
                        <p className="text-xs font-bold text-stone-700">{r.lingkar_lengan || "-"}</p>
                        <p className="text-[9px] text-stone-400">LILA</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Tanggal</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Anak</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">BB (kg)</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">TB (cm)</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LK (cm)</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LILA (cm)</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatFiltered.map((r) => (
                      <tr key={r.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                              {formatTanggal(r.created_at || r.tanggal_periksa || "")}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-stone-600">{r.child?.nama_anak || "-"}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{r.berat_badan}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{r.tinggi_badan}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{r.lingkar_kepala || "-"}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{r.lingkar_lengan || "-"}</td>
                        <td className="py-4 px-4">
                          <StatusBadge status={statusFromPrediction(r.ai_prediction?.hasil_prediksi || r.status)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
