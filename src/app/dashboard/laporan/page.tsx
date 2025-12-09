"use client";

import { FileSpreadsheet, FileText, Download, BarChart3, TrendingUp, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";

const ringkasan = {
  bulan: "Desember 2024",
  total_pemeriksaan: 89,
  balita_baru: 5,
  kunjungan: { sekarang: 89, sebelumnya: 77 },
  status: { normal: 142, perlu_perhatian: 18, berisiko: 8 },
};

const eksporList = [
  { nama: "Laporan Bulanan", format: "Excel (.xlsx)", icon: FileSpreadsheet, warna: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-200" },
  { nama: "Rekap Pemeriksaan", format: "PDF", icon: FileText, warna: "from-rose-400 to-red-500", shadow: "shadow-rose-200" },
  { nama: "Data Mentah", format: "CSV", icon: Download, warna: "from-sky-400 to-blue-500", shadow: "shadow-sky-200" },
];

export default function LaporanPage() {
  const pertumbuhanPersen = Math.round(((ringkasan.kunjungan.sekarang - ringkasan.kunjungan.sebelumnya) / ringkasan.kunjungan.sebelumnya) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Laporan</h1>
        <p className="text-stone-500 mt-1">Ringkasan data dan ekspor laporan Posyandu</p>
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
                    <p className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>+{pertumbuhanPersen}%</p>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ekspor Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eksporList.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Button key={i} variant="outline" className="w-full justify-start gap-4 p-4 h-auto">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${item.warna} flex items-center justify-center shadow-lg ${item.shadow}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{item.nama}</p>
                      <p className="text-xs text-stone-500">{item.format}</p>
                    </div>
                    <Download className="w-5 h-5 text-stone-400" />
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafik Tren Pertumbuhan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl border-2 border-dashed border-stone-200">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-400 font-medium">Grafik akan ditampilkan setelah integrasi API</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
