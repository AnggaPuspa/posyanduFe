"use client";

import { useState } from "react";
import { Button, Card, CardContent, Input } from "@/components/ui";

const dummyAnak = [
  { id: 1, nama: "Andi Pratama", nik: "3201010101010001", tanggal_lahir: "2023-06-15", jenis_kelamin: "L", nama_ibu: "Siti Rahayu", nama_ayah: "Budi Pratama", no_hp: "081234567890", status: "merah" },
  { id: 2, nama: "Siti Aminah", nik: "3201010101010002", tanggal_lahir: "2022-12-20", jenis_kelamin: "P", nama_ibu: "Dewi Sartika", nama_ayah: "Ahmad Aminah", no_hp: "081234567891", status: "kuning" },
  { id: 3, nama: "Budi Santoso", nik: "3201010101010003", tanggal_lahir: "2023-12-01", jenis_kelamin: "L", nama_ibu: "Rina Santoso", nama_ayah: "Joko Santoso", no_hp: "081234567892", status: "normal" },
  { id: 4, nama: "Dina Putri", nik: "3201010101010004", tanggal_lahir: "2023-03-10", jenis_kelamin: "P", nama_ibu: "Wati Putri", nama_ayah: "Hendra Putri", no_hp: "081234567893", status: "normal" },
  { id: 5, nama: "Riko Aditya", nik: "3201010101010005", tanggal_lahir: "2023-08-25", jenis_kelamin: "L", nama_ibu: "Nina Aditya", nama_ayah: "Eko Aditya", no_hp: "081234567894", status: "kuning" },
];

function hitungUmur(tanggal: string) {
  const lahir = new Date(tanggal);
  const sekarang = new Date();
  const bulan = (sekarang.getFullYear() - lahir.getFullYear()) * 12 + (sekarang.getMonth() - lahir.getMonth());
  return `${bulan} bulan`;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    normal: "bg-green-100 text-green-700",
    kuning: "bg-yellow-100 text-yellow-700",
    merah: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    normal: "Normal",
    kuning: "Perlu Perhatian",
    merah: "Berisiko",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function DataAnakPage() {
  const [cari, setCari] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dataFiltered = dummyAnak.filter((a) =>
    a.nama.toLowerCase().includes(cari.toLowerCase()) ||
    a.nik.includes(cari)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Anak</h2>
          <p className="text-gray-500">Kelola data anak yang terdaftar di Posyandu</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Anak
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Cari nama atau NIK..."
                value={cari}
                onChange={(e) => setCari(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">NIK</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Umur</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Jenis Kelamin</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Orang Tua</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataFiltered.map((anak) => (
                  <tr key={anak.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                          {anak.nama.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{anak.nama}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{anak.nik}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{hitungUmur(anak.tanggal_lahir)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{anak.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{anak.nama_ibu}</td>
                    <td className="py-3 px-4"><StatusBadge status={anak.status} /></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-yellow-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Menampilkan {dataFiltered.length} dari {dummyAnak.length} data</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
              <Button variant="outline" size="sm">Selanjutnya</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
