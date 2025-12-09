"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui";

const dummyNotifikasi = [
  {
    id: 1,
    tipe: "peringatan",
    judul: "Peringatan Risiko Stunting",
    pesan: "Anak Andi Pratama memiliki risiko tinggi stunting. Segera lakukan konsultasi dengan tenaga kesehatan.",
    anak: "Andi Pratama",
    sudah_dibaca: false,
    dibuat_pada: "2024-12-09 10:30",
  },
  {
    id: 2,
    tipe: "reminder",
    judul: "Jadwal Pemeriksaan",
    pesan: "Siti Aminah dijadwalkan untuk pemeriksaan rutin bulanan. Jangan lupa ingatkan orang tua.",
    anak: "Siti Aminah",
    sudah_dibaca: false,
    dibuat_pada: "2024-12-09 08:00",
  },
  {
    id: 3,
    tipe: "info",
    judul: "Hasil Analisis Tersedia",
    pesan: "Hasil analisis AI untuk pemeriksaan Dina Putri sudah tersedia. Lihat di halaman Analisis.",
    anak: "Dina Putri",
    sudah_dibaca: true,
    dibuat_pada: "2024-12-08 15:45",
  },
  {
    id: 4,
    tipe: "peringatan",
    judul: "Perhatian: Pertumbuhan Lambat",
    pesan: "Riko Aditya menunjukkan pertumbuhan yang lebih lambat dari standar. Perlu pemantauan lebih intensif.",
    anak: "Riko Aditya",
    sudah_dibaca: true,
    dibuat_pada: "2024-12-07 14:20",
  },
  {
    id: 5,
    tipe: "info",
    judul: "Email Terkirim",
    pesan: "Email peringatan telah dikirim ke orang tua Andi Pratama di alamat email terdaftar.",
    anak: "Andi Pratama",
    sudah_dibaca: true,
    dibuat_pada: "2024-12-07 10:35",
  },
];

function TipeIcon({ tipe }: { tipe: string }) {
  if (tipe === "peringatan") {
    return (
      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    );
  }
  if (tipe === "reminder") {
    return (
      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
}

export default function NotifikasiPage() {
  const [filter, setFilter] = useState<"semua" | "belum_dibaca">("semua");

  const dataFiltered = filter === "semua" ? dummyNotifikasi : dummyNotifikasi.filter((n) => !n.sudah_dibaca);
  const belumDibaca = dummyNotifikasi.filter((n) => !n.sudah_dibaca).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifikasi</h2>
          <p className="text-gray-500">Peringatan dan pemberitahuan sistem</p>
        </div>
        {belumDibaca > 0 && (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
            {belumDibaca} belum dibaca
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter("semua")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "semua" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("belum_dibaca")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "belum_dibaca" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Belum Dibaca
        </button>
      </div>

      <div className="space-y-3">
        {dataFiltered.map((n) => (
          <Card key={n.id} className={n.sudah_dibaca ? "opacity-70" : ""}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <TipeIcon tipe={n.tipe} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{n.judul}</h4>
                      <p className="text-sm text-gray-600 mt-1">{n.pesan}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">{n.dibuat_pada}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-blue-600">{n.anak}</span>
                      </div>
                    </div>
                    {!n.sudah_dibaca && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
