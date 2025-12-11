"use client";

import { useState, useEffect, useCallback } from "react";
import { FileSpreadsheet, FileText, Download, BarChart3, TrendingUp, Baby, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Spinner } from "@/components/ui";
import { childrenService, recordsService, exportService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { RecordPemeriksaan, Anak } from "@/types";

export default function LaporanPage() {
  const { tampilkanInfo, tampilkanSukses, tampilkanError } = pakeToast();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [ringkasan, setRingkasan] = useState({
    bulan: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
    total_pemeriksaan: 0,
    balita_baru: 0,
    total_anak: 0,
    status: { normal: 0, perlu_perhatian: 0, berisiko: 0 },
    pertumbuhanPersen: 0,
  });

  const muatData = useCallback(async () => {
    setLoading(true);
    try {
      const anakResult = await childrenService.ambilDaftar({ per_page: 100 });
      const anakResponse = anakResult as any;
      let totalAnak = 0;
      let balitaBaru = 0;
      
      if (anakResponse?.data?.data && Array.isArray(anakResponse.data.data)) {
        const anakList = anakResponse.data.data as Anak[];
        totalAnak = anakResponse.data.total || anakList.length;
        
        const bulanIni = new Date();
        const awalBulan = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
        
        balitaBaru = anakList.filter(anak => {
          const anakData = anak as any;
          const tglDaftar = new Date(anakData.created_at || anak.tanggal_lahir);
          return tglDaftar >= awalBulan;
        }).length;
      } else if (anakResponse?.data) {
        totalAnak = anakResponse.data.total || 0;
      }

      const recordResult = await recordsService.ambilDaftar({ per_page: 100 });
      const recordResponse = recordResult as any;
      let totalPemeriksaan = 0;
      let normal = 0, perluPerhatian = 0, berisiko = 0;
      let pemeriksaanBulanIni = 0;
      let pemeriksaanBulanLalu = 0;
      
      const bulanIni = new Date();
      const awalBulanIni = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
      const awalBulanLalu = new Date(bulanIni.getFullYear(), bulanIni.getMonth() - 1, 1);
      const akhirBulanLalu = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 0);
      
      if (recordResponse?.data?.data && Array.isArray(recordResponse.data.data)) {
        const records = recordResponse.data.data as RecordPemeriksaan[];
        totalPemeriksaan = recordResponse.data.total || records.length;

        records.forEach(r => {
          const hasil = r.ai_prediction?.hasil_prediksi?.toLowerCase();
          if (hasil?.includes("normal") || hasil?.includes("baik") || hasil?.includes("sehat")) normal++;
          else if (hasil?.includes("kurang") || hasil?.includes("lebih")) perluPerhatian++;
          else if (hasil?.includes("buruk") || hasil?.includes("stunting")) berisiko++;
          else normal++;

          const tglPeriksa = new Date(r.created_at || r.tanggal_periksa || "");
          if (tglPeriksa >= awalBulanIni) {
            pemeriksaanBulanIni++;
          } else if (tglPeriksa >= awalBulanLalu && tglPeriksa <= akhirBulanLalu) {
            pemeriksaanBulanLalu++;
          }
        });
      }

      const pertumbuhan = pemeriksaanBulanLalu > 0 
        ? Math.round(((pemeriksaanBulanIni - pemeriksaanBulanLalu) / pemeriksaanBulanLalu) * 100)
        : pemeriksaanBulanIni > 0 ? 100 : 0;

      setRingkasan({
        bulan: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
        total_pemeriksaan: totalPemeriksaan,
        balita_baru: balitaBaru,
        total_anak: totalAnak,
        status: { normal, perlu_perhatian: perluPerhatian, berisiko },
        pertumbuhanPersen: pertumbuhan,
      });
    } catch (error) {
      console.error("Gagal memuat data laporan:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    muatData();
  }, [muatData]);

  const handleDownloadCSV = async () => {
    setDownloading("csv");
    try {
      await exportService.downloadCSV();
      tampilkanSukses("File CSV berhasil diunduh!");
    } catch (error) {
      console.error("Error download CSV:", error);
      tampilkanError("Gagal mengunduh file CSV");
    } finally {
      setDownloading(null);
    }
  };

  const handleExport = (nama: string) => {
    tampilkanInfo(`Fitur ekspor ${nama} akan segera tersedia`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Laporan</h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">Ringkasan data dan ekspor laporan Posyandu</p>
        </div>
        <Button variant="outline" onClick={muatData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ringkasan {ringkasan.bulan}</CardTitle>
              <Badge variant="neutral">Periode Aktif</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-200">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{ringkasan.total_pemeriksaan}</p>
                        <p className="text-xs text-stone-500">Total Pemeriksaan</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                          {ringkasan.pertumbuhanPersen >= 0 ? "+" : ""}{ringkasan.pertumbuhanPersen}%
                        </p>
                        <p className="text-xs text-stone-500">vs Bulan Lalu</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200">
                        <Baby className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>+{ringkasan.balita_baru}</p>
                        <p className="text-xs text-stone-500">Balita Baru</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>{ringkasan.status.normal}</p>
                    <p className="text-sm text-emerald-600 mt-1">Gizi Baik</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-nunito)' }}>{ringkasan.status.perlu_perhatian}</p>
                    <p className="text-sm text-amber-600 mt-1">Perlu Perhatian</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-rose-50 border border-rose-100">
                    <p className="text-3xl font-bold text-rose-600" style={{ fontFamily: 'var(--font-nunito)' }}>{ringkasan.status.berisiko}</p>
                    <p className="text-sm text-rose-600 mt-1">Berisiko</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ekspor Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-4 p-4 h-auto"
                onClick={() => handleExport("Laporan Bulanan")}
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                  <FileSpreadsheet className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Laporan Bulanan</p>
                  <p className="text-xs text-stone-500">Excel (.xlsx)</p>
                </div>
                <Download className="w-5 h-5 text-stone-400" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start gap-4 p-4 h-auto"
                onClick={() => handleExport("Rekap Pemeriksaan")}
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center shadow-lg shadow-rose-200">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Rekap Pemeriksaan</p>
                  <p className="text-xs text-stone-500">PDF</p>
                </div>
                <Download className="w-5 h-5 text-stone-400" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start gap-4 p-4 h-auto"
                onClick={handleDownloadCSV}
                disabled={downloading === "csv"}
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-200">
                  {downloading === "csv" ? (
                    <Spinner size="sm" />
                  ) : (
                    <Download className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Data Mentah</p>
                  <p className="text-xs text-stone-500">CSV</p>
                </div>
                <Download className="w-5 h-5 text-stone-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistik Balita</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-2xl bg-stone-50 text-center">
              <p className="text-3xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{ringkasan.total_anak}</p>
              <p className="text-sm text-stone-500 mt-1">Total Balita</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 text-center">
              <p className="text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                {ringkasan.total_anak > 0 ? Math.round((ringkasan.status.normal / ringkasan.total_anak) * 100) : 0}%
              </p>
              <p className="text-sm text-emerald-600 mt-1">Gizi Baik</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 text-center">
              <p className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                {ringkasan.total_anak > 0 ? Math.round((ringkasan.status.perlu_perhatian / ringkasan.total_anak) * 100) : 0}%
              </p>
              <p className="text-sm text-amber-600 mt-1">Perlu Perhatian</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 text-center">
              <p className="text-3xl font-bold text-rose-600" style={{ fontFamily: 'var(--font-nunito)' }}>
                {ringkasan.total_anak > 0 ? Math.round((ringkasan.status.berisiko / ringkasan.total_anak) * 100) : 0}%
              </p>
              <p className="text-sm text-rose-600 mt-1">Berisiko</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
