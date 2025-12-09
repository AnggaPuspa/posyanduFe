"use client";

import { useState } from "react";
import { Search, Filter, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, Button, Input, Avatar, StatusBadge } from "@/components/ui";

const dummyAnak = [
  { id: 1, nama: "Andi Pratama", nik: "3201010101010001", tanggal_lahir: "2023-06-15", jenis_kelamin: "L", nama_ibu: "Siti Rahayu", status: "kuning" },
  { id: 2, nama: "Siti Nurhaliza", nik: "3201010101010002", tanggal_lahir: "2022-12-20", jenis_kelamin: "P", nama_ibu: "Dewi Sartika", status: "normal" },
  { id: 3, nama: "Budi Santoso", nik: "3201010101010003", tanggal_lahir: "2023-12-01", jenis_kelamin: "L", nama_ibu: "Rina Santoso", status: "normal" },
  { id: 4, nama: "Dina Amelia", nik: "3201010101010004", tanggal_lahir: "2023-03-10", jenis_kelamin: "P", nama_ibu: "Wati Putri", status: "normal" },
  { id: 5, nama: "Rizki Ramadhan", nik: "3201010101010005", tanggal_lahir: "2023-08-25", jenis_kelamin: "L", nama_ibu: "Nina Aditya", status: "merah" },
];

function hitungUmur(tanggal: string) {
  const lahir = new Date(tanggal);
  const sekarang = new Date();
  const bulan = (sekarang.getFullYear() - lahir.getFullYear()) * 12 + (sekarang.getMonth() - lahir.getMonth());
  return `${bulan} bulan`;
}

export default function DataAnakPage() {
  const [cari, setCari] = useState("");

  const dataFiltered = dummyAnak.filter((a) =>
    a.nama.toLowerCase().includes(cari.toLowerCase()) || a.nik.includes(cari)
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Data Balita</h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">Kelola data balita yang terdaftar di Posyandu</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Balita
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <Input
                placeholder="Cari nama atau NIK..."
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {dataFiltered.map((anak) => (
              <div key={anak.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={anak.nama} size="md" />
                    <div>
                      <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anak.nama}</p>
                      <p className="text-xs text-stone-500">{hitungUmur(anak.tanggal_lahir)} • {anak.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</p>
                    </div>
                  </div>
                  <StatusBadge status={anak.status} />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Nama Ibu</span>
                    <span className="text-stone-700">{anak.nama_ibu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">NIK</span>
                    <span className="text-stone-700 font-mono text-xs">{anak.nik.slice(-8)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-200">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Eye className="w-3 h-3 mr-1" /> Detail
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Balita</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">NIK</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Umur</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Jenis Kelamin</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Nama Ibu</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataFiltered.map((anak) => (
                  <tr key={anak.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={anak.nama} size="md" />
                        <span className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anak.nama}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-600 font-mono">{anak.nik}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{hitungUmur(anak.tanggal_lahir)}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{anak.jenis_kelamin === "L" ? "👦 Laki-laki" : "👧 Perempuan"}</td>
                    <td className="py-4 px-4 text-sm text-stone-600">{anak.nama_ibu}</td>
                    <td className="py-4 px-4"><StatusBadge status={anak.status} /></td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-sky-500 hover:bg-sky-50">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-amber-500 hover:bg-amber-50">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 md:mt-6 pt-4 border-t border-stone-100">
            <p className="text-xs md:text-sm text-stone-500">Menampilkan {dataFiltered.length} dari {dummyAnak.length} balita</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-amber-50 text-amber-600 font-semibold text-xs md:text-sm">1</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
