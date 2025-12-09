"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui";

const dummyPemeriksaan = [
  { id: 1, nama_anak: "Andi Pratama", tanggal: "2024-12-09", bb: 7.1, tb: 68, lk: 42, lila: 11, status: "merah" },
  { id: 2, nama_anak: "Siti Aminah", tanggal: "2024-12-09", bb: 10.5, tb: 80, lk: 45, lila: 13, status: "kuning" },
  { id: 3, nama_anak: "Budi Santoso", tanggal: "2024-12-08", bb: 8.2, tb: 70, lk: 43, lila: 12, status: "normal" },
  { id: 4, nama_anak: "Dina Putri", tanggal: "2024-12-08", bb: 10.2, tb: 78, lk: 44, lila: 13, status: "normal" },
  { id: 5, nama_anak: "Riko Aditya", tanggal: "2024-12-07", bb: 8.5, tb: 72, lk: 43, lila: 12, status: "kuning" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    normal: "bg-green-100 text-green-700",
    kuning: "bg-yellow-100 text-yellow-700",
    merah: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    normal: "Normal",
    kuning: "Perlu Perhatian",
    merah: "Berisiko Stunting",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function PemeriksaanPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pemeriksaan</h2>
          <p className="text-gray-500">Catat pemeriksaan tumbuh kembang anak</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Input Pemeriksaan
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Form Pemeriksaan Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Anak</label>
                <select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm">
                  <option value="">Pilih anak...</option>
                  <option value="1">Andi Pratama</option>
                  <option value="2">Siti Aminah</option>
                  <option value="3">Budi Santoso</option>
                </select>
              </div>
              <Input label="Tanggal Periksa" type="date" />
              <Input label="Berat Badan (kg)" type="number" placeholder="Contoh: 10.5" />
              <Input label="Tinggi Badan (cm)" type="number" placeholder="Contoh: 78" />
              <Input label="Lingkar Kepala (cm)" type="number" placeholder="Contoh: 44" />
              <Input label="Lingkar Lengan/LILA (cm)" type="number" placeholder="Contoh: 13" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                rows={3}
                placeholder="Catatan tambahan..."
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button>Simpan & Analisis AI</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tanggal</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Nama Anak</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">BB (kg)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">TB (cm)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">LK (cm)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">LILA (cm)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dummyPemeriksaan.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{p.tanggal}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{p.nama_anak}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.bb}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.tb}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.lk}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{p.lila}</td>
                    <td className="py-3 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">Lihat Analisis</Button>
                    </td>
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
