"use client";

import { useState } from "react";
import { Plus, Scale, Ruler, CircleDot, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Textarea, Avatar, StatusBadge } from "@/components/ui";

const dummyPemeriksaan = [
  { id: 1, nama_anak: "Andi Pratama", tanggal: "2024-12-09", bb: 10.2, tb: 78, lk: 44, lila: 13, status: "kuning" },
  { id: 2, nama_anak: "Siti Nurhaliza", tanggal: "2024-12-09", bb: 11.5, tb: 82, lk: 45, lila: 14, status: "normal" },
  { id: 3, nama_anak: "Budi Santoso", tanggal: "2024-12-08", bb: 8.9, tb: 70, lk: 43, lila: 12, status: "normal" },
  { id: 4, nama_anak: "Dina Amelia", tanggal: "2024-12-08", bb: 12.1, tb: 85, lk: 46, lila: 14, status: "normal" },
  { id: 5, nama_anak: "Rizki Ramadhan", tanggal: "2024-12-07", bb: 7.1, tb: 65, lk: 41, lila: 11, status: "merah" },
];

const anakOptions = [
  { value: "1", label: "Andi Pratama" },
  { value: "2", label: "Siti Nurhaliza" },
  { value: "3", label: "Budi Santoso" },
];

export default function PemeriksaanPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Pemeriksaan</h1>
          <p className="text-stone-500 mt-1">Catat hasil penimbangan dan pengukuran balita</p>
        </div>
        <Button variant="success" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-5 h-5 mr-2" />
          Input Pemeriksaan
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Form Pemeriksaan Baru</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <Select label="Pilih Balita" options={anakOptions} placeholder="Pilih balita..." />
              <Input label="Tanggal Periksa" type="date" />
              <Input label="Berat Badan (kg)" type="number" placeholder="10.5" icon={<Scale className="w-4 h-4" />} />
              <Input label="Tinggi Badan (cm)" type="number" placeholder="78" icon={<Ruler className="w-4 h-4" />} />
              <Input label="Lingkar Kepala (cm)" type="number" placeholder="44" icon={<CircleDot className="w-4 h-4" />} />
              <Input label="LILA (cm)" type="number" placeholder="13" />
            </div>
            <div className="mt-5">
              <Textarea label="Catatan" placeholder="Catatan tambahan..." rows={3} />
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="success" className="flex-1">
                💡 Simpan & Analisis AI
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Batal
              </Button>
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
                <tr className="border-b border-stone-100">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Tanggal</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Balita</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">BB</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">TB</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LK</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LILA</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dummyPemeriksaan.map((p) => (
                  <tr key={p.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm text-stone-600">{p.tanggal}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.nama_anak} size="sm" />
                        <span className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{p.nama_anak}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-600">{p.bb} kg</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{p.tb} cm</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{p.lk} cm</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{p.lila} cm</td>
                    <td className="py-4 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="text-violet-600 hover:bg-violet-50">
                        Lihat Analisis
                      </Button>
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
