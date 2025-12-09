"use client";

import { useState } from "react";
import { Bell, AlertTriangle, Clock, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent, Button, Badge } from "@/components/ui";

const dummyNotifikasi = [
  { id: 1, tipe: "peringatan", judul: "Risiko Stunting Terdeteksi", pesan: "Rizki Ramadhan memiliki risiko tinggi stunting. Segera lakukan konsultasi dengan tenaga kesehatan.", anak: "Rizki Ramadhan", sudah_dibaca: false, waktu: "10 menit lalu" },
  { id: 2, tipe: "reminder", judul: "Jadwal Posyandu Besok", pesan: "Posyandu Mawar I dijadwalkan besok pukul 08:00. Jangan lupa siapkan perlengkapan penimbangan.", anak: null, sudah_dibaca: false, waktu: "1 jam lalu" },
  { id: 3, tipe: "info", judul: "Analisis AI Selesai", pesan: "Hasil analisis AI untuk pemeriksaan Siti Nurhaliza sudah tersedia. Lihat di halaman Analisis.", anak: "Siti Nurhaliza", sudah_dibaca: true, waktu: "2 jam lalu" },
  { id: 4, tipe: "peringatan", judul: "Pemeriksaan Terlambat", pesan: "3 balita belum melakukan pemeriksaan bulan ini. Segera hubungi orang tua untuk penjadwalan.", anak: null, sudah_dibaca: true, waktu: "Kemarin" },
  { id: 5, tipe: "sukses", judul: "Email Peringatan Terkirim", pesan: "Notifikasi peringatan telah dikirim ke orang tua Rizki Ramadhan via email.", anak: "Rizki Ramadhan", sudah_dibaca: true, waktu: "Kemarin" },
];

function NotifIcon({ tipe }: { tipe: string }) {
  const config: Record<string, { gradient: string; icon: React.ElementType }> = {
    peringatan: { gradient: "from-rose-400 to-red-500", icon: AlertTriangle },
    reminder: { gradient: "from-amber-400 to-orange-500", icon: Clock },
    info: { gradient: "from-sky-400 to-blue-500", icon: Info },
    sukses: { gradient: "from-emerald-400 to-teal-500", icon: CheckCircle2 },
  };
  const c = config[tipe] || config.info;
  const Icon = c.icon;
  return (
    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
}

export default function NotifikasiPage() {
  const [filter, setFilter] = useState<"semua" | "belum">("semua");

  const dataFiltered = filter === "semua" ? dummyNotifikasi : dummyNotifikasi.filter((n) => !n.sudah_dibaca);
  const belumDibaca = dummyNotifikasi.filter((n) => !n.sudah_dibaca).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Notifikasi</h1>
          <p className="text-stone-500 mt-1">Peringatan dan pemberitahuan sistem</p>
        </div>
        {belumDibaca > 0 && (
          <Badge variant="danger" className="flex items-center gap-2 px-4 py-2">
            <Bell className="w-4 h-4" />
            {belumDibaca} belum dibaca
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === "semua" ? "primary" : "outline"}
          size="sm"
          onClick={() => setFilter("semua")}
        >
          Semua
        </Button>
        <Button
          variant={filter === "belum" ? "primary" : "outline"}
          size="sm"
          onClick={() => setFilter("belum")}
        >
          Belum Dibaca
        </Button>
      </div>

      <div className="space-y-3">
        {dataFiltered.map((n) => (
          <Card
            key={n.id}
            className={n.sudah_dibaca ? "opacity-70" : "border-amber-200 shadow-md"}
          >
            <CardContent className="p-5">
              <div className="flex gap-4">
                <NotifIcon tipe={n.tipe} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{n.judul}</h4>
                      <p className="text-sm text-stone-600 mt-1">{n.pesan}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-stone-400">{n.waktu}</span>
                        {n.anak && (
                          <>
                            <span className="text-xs text-stone-300">•</span>
                            <span className="text-xs font-medium text-amber-600">{n.anak}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {!n.sudah_dibaca && (
                      <div className="h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-200" />
                    )}
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
