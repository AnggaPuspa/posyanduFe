"use client";

import { useState, useEffect, useCallback } from "react";
import { Baby, Scale, Ruler, CircleDot, Heart, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Avatar, StatusBadge, Spinner } from "@/components/ui";
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
  return `${tahun} tahun ${sisaBulan} bulan`;
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AnakSayaPage() {
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

  const dataTerakhir = riwayat.find(r => r.child?.id === anakTerpilih?.id) || riwayat[0];

  if (sedangMemuat) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (anakSaya.length === 0 || !anakTerpilih) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <CardContent className="p-8 text-center">
            <Baby className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-semibold text-stone-700 mb-2">Belum Ada Data Anak</h3>
            <p className="text-stone-500 text-sm">Data anak Anda belum terdaftar di Posyandu</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Anak Saya</h1>
        <p className="text-stone-500 mt-1">Profil lengkap dan data perkembangan anak</p>
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

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 md:gap-8">
            <div className="flex flex-col items-center shrink-0">
              <Avatar name={anakTerpilih.nama_anak} size="xl" jenisKelamin={anakTerpilih.jenis_kelamin as "L" | "P"} className="h-20 w-20 md:h-32 md:w-32 text-2xl md:text-4xl rounded-2xl md:rounded-3xl" />
              <div className="mt-3 md:mt-4">
                <StatusBadge status={anakTerpilih.status_gizi || "normal"} />
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-3 md:mb-5" style={{ fontFamily: 'var(--font-nunito)' }}>
                {anakTerpilih.nama_anak}
              </h2>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Tanggal Lahir</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                      {formatTanggal(anakTerpilih.tanggal_lahir)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Baby className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Jenis Kelamin</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                      {anakTerpilih.jenis_kelamin === "L" ? "👦 Laki-laki" : "👧 Perempuan"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Scale className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Berat Lahir</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                      {anakTerpilih.berat_lahir || "-"} kg
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Ruler className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Umur</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                      {hitungUmur(anakTerpilih.tanggal_lahir)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {dataTerakhir && (
        <Card>
          <CardHeader className="pb-2 md:pb-0">
            <CardTitle className="text-base md:text-lg">Data Pengukuran Terakhir</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 md:pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
                <Scale className="w-5 h-5 md:w-6 md:h-6 text-sky-500 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold text-sky-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {dataTerakhir.berat_badan}
                </p>
                <p className="text-xs md:text-sm text-sky-500">kg</p>
                <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Berat Badan</p>
              </div>
              <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <Ruler className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {dataTerakhir.tinggi_badan}
                </p>
                <p className="text-xs md:text-sm text-emerald-500">cm</p>
                <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Tinggi Badan</p>
              </div>
              <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <CircleDot className="w-5 h-5 md:w-6 md:h-6 text-violet-500 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold text-violet-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {dataTerakhir.lingkar_kepala || "-"}
                </p>
                <p className="text-xs md:text-sm text-violet-500">cm</p>
                <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Lingkar Kepala</p>
              </div>
              <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-amber-500 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {dataTerakhir.lingkar_lengan || "-"}
                </p>
                <p className="text-xs md:text-sm text-amber-500">cm</p>
                <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Lingkar Lengan</p>
              </div>
            </div>
            <p className="text-center text-[11px] md:text-sm text-stone-400 mt-3 md:mt-5">
              Terakhir diukur: {formatTanggal(dataTerakhir.created_at || dataTerakhir.tanggal_periksa || "")}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-500" />
            <CardTitle className="text-base md:text-lg">Grafik Pertumbuhan</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          <GrafikPertumbuhan anakId={anakTerpilih.id} />
        </CardContent>
      </Card>
    </div>
  );
}
