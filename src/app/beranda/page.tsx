"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, TrendingUp, AlertCircle, ChevronRight, Heart, Baby, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Avatar, StatusBadge, Button, Spinner } from "@/components/ui";
import { ortuService, growthService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import { pakeAuth } from "@/hooks/use-auth";
import type { Anak } from "@/types";
import type { RiwayatPemeriksaan } from "@/services/ortu.service";
import Link from "next/link";

function hitungUmur(tanggal: string) {
  const lahir = new Date(tanggal);
  const sekarang = new Date();
  const bulan = (sekarang.getFullYear() - lahir.getFullYear()) * 12 + (sekarang.getMonth() - lahir.getMonth());
  if (bulan < 12) return `${bulan} bulan`;
  const tahun = Math.floor(bulan / 12);
  const sisaBulan = bulan % 12;
  return `${tahun} tahun ${sisaBulan} bulan`;
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

export default function BerandaPage() {
  const { user } = pakeAuth();
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

  const riwayatTerbaru = riwayat.slice(0, 3);
  const rekomendasiAI = riwayat[0]?.ai_prediction?.saran || null;

  if (sedangMemuat) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-stone-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="hidden md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
            Halo, {user?.nama || "Ibu/Bapak"}! 👋
          </h1>
          <p className="text-stone-500 mt-1">Pantau tumbuh kembang si kecil dengan mudah</p>
        </div>
        <Button variant="ghost" size="sm" onClick={muatData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {anakSaya.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Baby className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-semibold text-stone-700 mb-2">Belum Ada Data Anak</h3>
            <p className="text-stone-500 text-sm">Data anak Anda belum terdaftar di Posyandu</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-3 md:gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="p-4 md:p-6">
                {anakSaya.length > 1 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {anakSaya.map((anak) => (
                      <button
                        key={anak.id}
                        onClick={() => setAnakTerpilih(anak)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                          anakTerpilih?.id === anak.id
                            ? "bg-violet-500 text-white"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {anak.nama_anak}
                      </button>
                    ))}
                  </div>
                )}
                
                {anakTerpilih && (
                  <div className="flex items-center gap-3 md:gap-6">
                    <Avatar name={anakTerpilih.nama_anak} size="lg" jenisKelamin={anakTerpilih.jenis_kelamin as "L" | "P"} className="w-14 h-14 md:w-16 md:h-16 text-lg md:text-xl" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-bold text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                        {anakTerpilih.nama_anak}
                      </h3>
                      <p className="text-sm md:text-base text-stone-500">
                        {hitungUmur(anakTerpilih.tanggal_lahir)} • {anakTerpilih.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 md:mt-3">
                        <StatusBadge status={anakTerpilih.status_gizi || "normal"} />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 border-0" hover={false}>
              <CardContent className="p-4 md:p-6 text-white">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs md:text-sm">Jadwal Berikutnya</p>
                    <p className="font-bold text-base md:text-lg" style={{ fontFamily: 'var(--font-nunito)' }}>
                      Hubungi Posyandu
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-white/80">Konfirmasi jadwal penimbangan berikutnya</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2 md:pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg">Riwayat Terakhir</CardTitle>
                  <Link href="/beranda/riwayat">
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs md:text-sm px-2">
                      Semua
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-3 md:pt-6">
                {riwayatTerbaru.length === 0 ? (
                  <div className="text-center py-8 text-stone-400">
                    <TrendingUp className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm">Belum ada riwayat pemeriksaan</p>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    {riwayatTerbaru.map((r) => (
                      <div key={r.id} className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-stone-50/80">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md shrink-0">
                            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                              {formatTanggal(r.created_at || r.tanggal_periksa || "")}
                            </p>
                            <p className="text-[11px] md:text-sm text-stone-500">
                              {r.berat_badan} kg • {r.tinggi_badan} cm
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={statusFromPrediction(r.ai_prediction?.hasil_prediksi || r.status)} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3 md:mb-5">
                  <div className="h-10 w-10 md:h-11 md:w-11 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200 shrink-0">
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base md:text-lg">Saran Kesehatan</CardTitle>
                    <p className="text-[10px] md:text-xs text-amber-600">Berdasarkan data terbaru</p>
                  </div>
                </div>
                
                {rekomendasiAI ? (
                  <div className="p-3 bg-white rounded-xl">
                    <p className="text-sm text-stone-700">{rekomendasiAI}</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 md:space-y-2">
                    {[
                      "Pastikan asupan gizi seimbang setiap hari",
                      "Berikan ASI eksklusif hingga 6 bulan",
                      "Lakukan penimbangan rutin setiap bulan",
                    ].map((r, i) => (
                      <div key={i} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg md:rounded-xl">
                        <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600" />
                        </div>
                        <p className="text-xs md:text-sm text-stone-700">{r}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
