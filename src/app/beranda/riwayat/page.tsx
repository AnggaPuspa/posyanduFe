"use client";

import { TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, StatusBadge } from "@/components/ui";

const riwayat = [
  { tanggal: "9 Des 2024", umur: "18 bulan", bb: 10.2, tb: 78, lk: 44, lila: 13, status: "kuning" },
  { tanggal: "9 Nov 2024", umur: "17 bulan", bb: 9.8, tb: 76, lk: 43.5, lila: 12.8, status: "normal" },
  { tanggal: "9 Okt 2024", umur: "16 bulan", bb: 9.5, tb: 74, lk: 43, lila: 12.5, status: "normal" },
  { tanggal: "9 Sep 2024", umur: "15 bulan", bb: 9.2, tb: 72, lk: 42.5, lila: 12.2, status: "normal" },
  { tanggal: "9 Agt 2024", umur: "14 bulan", bb: 8.9, tb: 70, lk: 42, lila: 12, status: "normal" },
  { tanggal: "9 Jul 2024", umur: "13 bulan", bb: 8.5, tb: 68, lk: 41.5, lila: 11.8, status: "normal" },
];

export default function RiwayatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Riwayat Pertumbuhan</h1>
        <p className="text-stone-500 mt-1">Pantau perkembangan si kecil dari waktu ke waktu</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Grafik Pertumbuhan</CardTitle>
            <div className="flex gap-2">
              <Button variant="success" size="sm">Berat Badan</Button>
              <Button variant="outline" size="sm">Tinggi Badan</Button>
            </div>
          </div>
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

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
