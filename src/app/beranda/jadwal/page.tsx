"use client";

import { Calendar, MapPin, Clock, Bell, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";

const jadwalPosyandu = [
  {
    tanggal: "9 Jan 2025",
    hari: "Kamis",
    waktu: "08:00 - 12:00",
    lokasi: "Posyandu Melati",
    kegiatan: ["Timbang", "TB", "Imunisasi", "PMT"],
    status: "upcoming",
  },
  {
    tanggal: "9 Des 2024",
    hari: "Senin",
    waktu: "08:00 - 12:00",
    lokasi: "Posyandu Melati",
    kegiatan: ["Timbang", "TB"],
    status: "done",
  },
  {
    tanggal: "9 Nov 2024",
    hari: "Sabtu",
    waktu: "08:00 - 12:00",
    lokasi: "Posyandu Melati",
    kegiatan: ["Timbang", "TB", "Vit A"],
    status: "done",
  },
];

export default function JadwalPage() {
  const nextJadwal = jadwalPosyandu[0];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Hidden on mobile */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Jadwal Posyandu</h1>
        <p className="text-stone-500 mt-1">Lihat jadwal dan riwayat kunjungan Posyandu</p>
      </div>

      {/* Next Schedule Card */}
      <Card className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 border-0" hover={false}>
        <CardContent className="p-4 md:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-5">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-white/80 text-xs md:text-sm font-medium">Jadwal Berikutnya</p>
                <p className="text-lg md:text-2xl font-bold mt-0.5 md:mt-1" style={{ fontFamily: 'var(--font-nunito)' }}>{nextJadwal.tanggal}</p>
                <p className="text-white/80 text-xs md:text-sm mt-0.5 md:mt-1">{nextJadwal.hari} • {nextJadwal.waktu}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30 self-start sm:self-center text-xs md:text-sm">
              <Bell className="w-4 h-4 mr-1.5" />
              Ingatkan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule History */}
      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <CardTitle className="text-base md:text-lg">Riwayat Jadwal</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          <div className="space-y-3 md:space-y-4">
            {jadwalPosyandu.map((j, i) => (
              <div key={i} className={`p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all ${j.status === 'upcoming' ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-50/50 border-stone-200/60 opacity-80'}`}>
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Icon */}
                  <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${j.status === 'upcoming' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200' : 'bg-stone-200'}`}>
                    <Calendar className={`w-4 h-4 md:w-5 md:h-5 ${j.status === 'upcoming' ? 'text-white' : 'text-stone-400'}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-sm md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{j.tanggal}</p>
                        <div className="flex items-center gap-2 md:gap-3 text-[11px] md:text-sm text-stone-500 mt-0.5 md:mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {j.waktu.split(' ')[0]}
                          </span>
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {j.lokasi}
                          </span>
                        </div>
                      </div>
                      {j.status === 'done' && (
                        <Badge variant="success" className="flex items-center gap-1 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="hidden sm:inline">Selesai</span>
                        </Badge>
                      )}
                    </div>
                    
                    {/* Activities */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
                      {j.kegiatan.map((k, ki) => (
                        <Badge key={ki} variant="neutral" className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5">{k}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
