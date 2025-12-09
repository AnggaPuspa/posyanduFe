"use client";

import { Calendar, MapPin, Clock, Bell, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";

const jadwalPosyandu = [
  {
    tanggal: "9 Januari 2025",
    hari: "Kamis",
    waktu: "08:00 - 12:00",
    lokasi: "Posyandu Melati",
    alamat: "Jl. Melati No. 15, RT 05/RW 02",
    kegiatan: ["Penimbangan", "Pengukuran TB", "Imunisasi", "PMT"],
    status: "upcoming",
  },
  {
    tanggal: "9 Desember 2024",
    hari: "Senin",
    waktu: "08:00 - 12:00",
    lokasi: "Posyandu Melati",
    alamat: "Jl. Melati No. 15, RT 05/RW 02",
    kegiatan: ["Penimbangan", "Pengukuran TB"],
    status: "done",
  },
  {
    tanggal: "9 November 2024",
    hari: "Sabtu",
    waktu: "08:00 - 12:00",
    lokasi: "Posyandu Melati",
    alamat: "Jl. Melati No. 15, RT 05/RW 02",
    kegiatan: ["Penimbangan", "Pengukuran TB", "Vitamin A"],
    status: "done",
  },
];

export default function JadwalPage() {
  const nextJadwal = jadwalPosyandu[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Jadwal Posyandu</h1>
        <p className="text-stone-500 mt-1">Lihat jadwal dan riwayat kunjungan Posyandu</p>
      </div>

      <Card className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 border-0" hover={false}>
        <CardContent className="p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Jadwal Berikutnya</p>
                <p className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-nunito)' }}>{nextJadwal.tanggal}</p>
                <p className="text-white/80 text-sm mt-1">{nextJadwal.hari} • {nextJadwal.waktu} WIB</p>
              </div>
            </div>
            <Button variant="outline" className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30">
              <Bell className="w-5 h-5 mr-2" />
              Ingatkan Saya
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Jadwal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jadwalPosyandu.map((j, i) => (
              <div key={i} className={`p-5 rounded-2xl border transition-all ${j.status === 'upcoming' ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-50/50 border-stone-200/60 opacity-70'}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${j.status === 'upcoming' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200' : 'bg-stone-200'}`}>
                      <Calendar className={`w-5 h-5 ${j.status === 'upcoming' ? 'text-white' : 'text-stone-400'}`} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{j.tanggal}</p>
                      <div className="flex items-center gap-3 text-sm text-stone-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {j.waktu}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {j.lokasi}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {j.kegiatan.map((k, ki) => (
                      <Badge key={ki} variant="neutral">{k}</Badge>
                    ))}
                  </div>
                  {j.status === 'done' && (
                    <Badge variant="success" className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Selesai
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
