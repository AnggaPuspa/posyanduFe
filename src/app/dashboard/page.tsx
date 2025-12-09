"use client";

import { Bell, Calendar, ChevronRight, TrendingUp, Users, Baby, HeartPulse, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, Avatar, StatusBadge, Button } from "@/components/ui";

const statusGiziData = [
  { name: "Gizi Baik", value: 142, color: "#86EFAC" },
  { name: "Gizi Kurang", value: 18, color: "#FCD34D" },
  { name: "Stunting", value: 8, color: "#FDA4AF" },
];

const jadwalKegiatan = [
  { id: 1, nama: "Posyandu Mawar I", tanggal: "Senin, 11 Des 2024", waktu: "08:00", tipe: "Penimbangan", warna: "from-teal-400 to-emerald-500" },
  { id: 2, nama: "Imunisasi BCG", tanggal: "Rabu, 13 Des 2024", waktu: "09:00", tipe: "Imunisasi", warna: "from-violet-400 to-purple-500" },
  { id: 3, nama: "Penyuluhan Gizi", tanggal: "Jumat, 15 Des 2024", waktu: "10:00", tipe: "Penyuluhan", warna: "from-amber-400 to-orange-500" },
];

const antrianHariIni = [
  { id: 1, nama: "Andi Pratama", umur: "18 bln", waktu: "08:15", bb: "10.2 kg", status: "selesai" },
  { id: 2, nama: "Siti Nurhaliza", umur: "24 bln", waktu: "08:32", bb: "11.5 kg", status: "selesai" },
  { id: 3, nama: "Budi Santoso", umur: "12 bln", waktu: "08:45", bb: "8.9 kg", status: "selesai" },
  { id: 4, nama: "Dina Amelia", umur: "36 bln", waktu: "09:00", bb: "-", status: "menunggu" },
  { id: 5, nama: "Rizki Ramadhan", umur: "6 bln", waktu: "09:15", bb: "-", status: "menunggu" },
];

function StatCard({ title, value, subtitle, icon: Icon, gradient, shadowColor }: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  shadowColor: string;
}) {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center sm:items-start gap-3 sm:gap-0 sm:flex-col">
            {/* Icon - inline on mobile */}
            <div className={`h-9 w-9 sm:hidden rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md ${shadowColor} shrink-0`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs md:text-sm font-medium text-stone-500 leading-tight">{title}</p>
              <p className="text-xl sm:text-2xl md:text-4xl font-bold text-stone-800 mt-0.5 sm:mt-1 md:mt-2" style={{ fontFamily: 'var(--font-nunito)' }}>{value}</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-stone-400 mt-0 sm:mt-0.5 md:mt-1 leading-tight">{subtitle}</p>
            </div>
          </div>
          {/* Icon - separate on tablet+ */}
          <div className={`hidden sm:flex h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} items-center justify-center shadow-lg ${shadowColor} shrink-0`}>
            <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DonutChart() {
  const total = statusGiziData.reduce((acc, item) => acc + item.value, 0);
  const giziBaik = statusGiziData[0].value;
  const percentage = Math.round((giziBaik / total) * 100);

  return (
    <Card>
      <CardHeader className="pb-2 md:pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Status Gizi Balita</CardTitle>
          <span className="text-[10px] md:text-xs font-medium text-stone-400 bg-stone-100 px-2 md:px-3 py-1 rounded-full">Bulan Ini</span>
        </div>
      </CardHeader>
      <CardContent className="pt-3 md:pt-6">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusGiziData} cx="50%" cy="50%" innerRadius="55%" outerRadius="85%" paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {statusGiziData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{percentage}%</span>
              <span className="text-[10px] md:text-xs text-stone-400">Sehat</span>
            </div>
          </div>
          <div className="flex-1 space-y-2 md:space-y-3">
            {statusGiziData.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs md:text-sm text-stone-600">{item.name}</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-stone-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertCard() {
  return (
    <Card className="bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200/60">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base md:text-lg">Ibu Hamil Resti</CardTitle>
            <p className="text-[10px] md:text-xs text-rose-500">Perlu perhatian khusus</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl md:text-4xl font-bold text-rose-600" style={{ fontFamily: 'var(--font-nunito)' }}>5</p>
            <p className="text-xs md:text-sm text-stone-500">dari 28 ibu hamil</p>
          </div>
          <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-100 text-xs md:text-sm px-2 md:px-3">
            Detail
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function JadwalCard() {
  return (
    <Card>
      <CardHeader className="pb-2 md:pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Jadwal Kegiatan</CardTitle>
          <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 text-xs md:text-sm px-2 md:px-3">
            Semua
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-3 md:pt-6">
        <div className="space-y-2 md:space-y-3">
          {jadwalKegiatan.map((item) => (
            <div key={item.id} className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-xl md:rounded-2xl bg-stone-50/80 hover:bg-stone-100/80 transition-colors">
              <div className={`h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-gradient-to-br ${item.warna} flex items-center justify-center shadow-md shrink-0`}>
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>{item.nama}</p>
                <p className="text-[11px] md:text-sm text-stone-500 truncate">{item.tanggal} • {item.waktu}</p>
              </div>
              <span className="hidden sm:inline text-[10px] md:text-xs font-medium text-stone-500 bg-white px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-stone-200 shrink-0">{item.tipe}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AntrianCard() {
  return (
    <Card>
      <CardHeader className="pb-2 md:pb-0">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base md:text-lg">Antrian Hari Ini</CardTitle>
          <span className="text-[10px] md:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full shrink-0">3✓ 2○</span>
        </div>
      </CardHeader>
      <CardContent className="pt-3 md:pt-6">
        <div className="space-y-1.5 md:space-y-2">
          {antrianHariIni.map((item) => (
            <div key={item.id} className={`flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-xl md:rounded-2xl transition-colors ${item.status === 'selesai' ? 'bg-emerald-50/50' : 'bg-amber-50/50'}`}>
              <Avatar name={item.nama} size="sm" className="md:w-10 md:h-10" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>{item.nama}</p>
                <p className="text-[10px] md:text-xs text-stone-500">{item.umur} • {item.waktu}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs md:text-sm font-medium text-stone-700">{item.bb}</p>
                <p className={`text-[10px] md:text-xs font-medium ${item.status === 'selesai' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {item.status === 'selesai' ? '✓' : '○'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
            Selamat Pagi, Bu Siti! 👋
          </h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">{today}</p>
        </div>
        <div className="relative">
          <Button variant="outline" size="sm" className="relative md:hidden">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="md" className="relative hidden md:flex">
            <Bell className="w-5 h-5" />
          </Button>
          <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-rose-500 text-white text-[10px] md:text-xs font-semibold flex items-center justify-center">3</span>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 border-0" hover={false}>
        <CardContent className="p-4 md:p-6 text-white">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="min-w-0">
              <p className="text-white/80 text-xs md:text-sm font-medium">Jadwal Hari Ini</p>
              <p className="text-base md:text-xl font-bold truncate" style={{ fontFamily: 'var(--font-nunito)' }}>Posyandu Mawar I - Penimbangan Balita</p>
              <p className="text-white/80 text-xs md:text-sm mt-0.5 truncate">Pukul 08:00 - 12:00 WIB • Balai Desa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-5 lg:grid-cols-4">
        <StatCard title="Total Balita" value={168} subtitle="+12 bln ini" icon={Baby} gradient="from-sky-400 to-blue-500" shadowColor="shadow-sky-200" />
        <StatCard title="Ibu Hamil" value={28} subtitle="Trimester 1-3" icon={HeartPulse} gradient="from-pink-400 to-rose-500" shadowColor="shadow-pink-200" />
        <StatCard title="Kunjungan" value={89} subtitle="↑ 15% bln lalu" icon={TrendingUp} gradient="from-emerald-400 to-teal-500" shadowColor="shadow-emerald-200" />
        <StatCard title="Kader Aktif" value={12} subtitle="5 Posyandu" icon={Users} gradient="from-violet-400 to-purple-500" shadowColor="shadow-violet-200" />
      </div>

      <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
        <DonutChart />
        <AlertCard />
      </div>

      <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
        <JadwalCard />
        <AntrianCard />
      </div>
    </div>
  );
}
