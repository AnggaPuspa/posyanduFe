"use client";

import { TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, StatusBadge } from "@/components/ui";

const riwayat = [
  { tanggal: "9 Des 2024", umur: "18 bln", bb: 10.2, tb: 78, lk: 44, lila: 13, status: "kuning" },
  { tanggal: "9 Nov 2024", umur: "17 bln", bb: 9.8, tb: 76, lk: 43.5, lila: 12.8, status: "normal" },
  { tanggal: "9 Okt 2024", umur: "16 bln", bb: 9.5, tb: 74, lk: 43, lila: 12.5, status: "normal" },
  { tanggal: "9 Sep 2024", umur: "15 bln", bb: 9.2, tb: 72, lk: 42.5, lila: 12.2, status: "normal" },
  { tanggal: "9 Agt 2024", umur: "14 bln", bb: 8.9, tb: 70, lk: 42, lila: 12, status: "normal" },
];

export default function RiwayatPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Hidden on mobile */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Riwayat Pertumbuhan</h1>
        <p className="text-stone-500 mt-1">Pantau perkembangan si kecil dari waktu ke waktu</p>
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-base md:text-lg">Grafik Pertumbuhan</CardTitle>
            <div className="flex gap-1.5 md:gap-2">
              <Button variant="success" size="sm" className="text-xs md:text-sm px-2 md:px-3">BB</Button>
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-3">TB</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          <div className="h-40 md:h-64 flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl md:rounded-2xl border-2 border-dashed border-stone-200">
            <div className="text-center px-4">
              <BarChart3 className="w-8 h-8 md:w-12 md:h-12 text-stone-300 mx-auto mb-2 md:mb-3" />
              <p className="text-xs md:text-sm text-stone-400 font-medium">Grafik akan tampil setelah integrasi API</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Card - Mobile optimized */}
      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <CardTitle className="text-base md:text-lg">Riwayat Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          {/* Mobile Card View */}
          <div className="md:hidden space-y-2">
            {riwayat.map((r, i) => (
              <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{r.tanggal}</p>
                      <p className="text-[10px] text-stone-400">{r.umur}</p>
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-1.5 rounded-lg bg-white">
                    <p className="text-xs font-bold text-stone-700">{r.bb}</p>
                    <p className="text-[9px] text-stone-400">BB</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white">
                    <p className="text-xs font-bold text-stone-700">{r.tb}</p>
                    <p className="text-[9px] text-stone-400">TB</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white">
                    <p className="text-xs font-bold text-stone-700">{r.lk}</p>
                    <p className="text-[9px] text-stone-400">LK</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white">
                    <p className="text-xs font-bold text-stone-700">{r.lila}</p>
                    <p className="text-[9px] text-stone-400">LILA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Tanggal</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Umur</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">BB (kg)</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">TB (cm)</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LK (cm)</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LILA (cm)</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((r, i) => (
                  <tr key={i} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{r.tanggal}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-600">{r.umur}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{r.bb}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{r.tb}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{r.lk}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{r.lila}</td>
                    <td className="py-4 px-4"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
