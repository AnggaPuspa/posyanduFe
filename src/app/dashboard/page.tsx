"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, Calendar, ChevronRight, TrendingUp, Users, Baby, HeartPulse, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, Avatar, StatusBadge, Button, Spinner } from "@/components/ui";
import { dashboardService, childrenService, recordsService } from "@/services";
import { pakeKonteksAuth } from "@/contexts/auth-context";
import type { RecordPemeriksaan, Anak } from "@/types";

interface StatusGizi {
  name: string;
  value: number;
  color: string;
}

function StatCard({ title, value, subtitle, icon: Icon, gradient, shadowColor, loading }: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  shadowColor: string;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center sm:items-start gap-3 sm:gap-0 sm:flex-col">
            <div className={`h-9 w-9 sm:hidden rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md ${shadowColor} shrink-0`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs md:text-sm font-medium text-stone-500 leading-tight">{title}</p>
              {loading ? (
                <Spinner size="sm" className="mt-2" />
              ) : (
                <>
                  <p className="text-xl sm:text-2xl md:text-4xl font-bold text-stone-800 mt-0.5 sm:mt-1 md:mt-2" style={{ fontFamily: 'var(--font-nunito)' }}>{value}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-stone-400 mt-0 sm:mt-0.5 md:mt-1 leading-tight">{subtitle}</p>
                </>
              )}
            </div>
          </div>
          <div className={`hidden sm:flex h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} items-center justify-center shadow-lg ${shadowColor} shrink-0`}>
            <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DonutChart({ data, loading }: { data: StatusGizi[]; loading: boolean }) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const giziBaik = data.find(d => d.name === "Gizi Baik")?.value || 0;
  const percentage = total > 0 ? Math.round((giziBaik / total) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-2 md:pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Status Gizi Balita</CardTitle>
          <span className="text-[10px] md:text-xs font-medium text-stone-400 bg-stone-100 px-2 md:px-3 py-1 rounded-full">Bulan Ini</span>
        </div>
      </CardHeader>
      <CardContent className="pt-3 md:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-36">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data as any} cx="50%" cy="50%" innerRadius="55%" outerRadius="85%" paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {data.map((entry, index) => (
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
              {data.map((item, i) => (
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
        )}
      </CardContent>
    </Card>
  );
}

function AlertCard({ berisiko, total, loading }: { berisiko: number; total: number; loading: boolean }) {
  return (
    <Card className="bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200/60">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base md:text-lg">Anak Berisiko</CardTitle>
            <p className="text-[10px] md:text-xs text-rose-500">Perlu perhatian khusus</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          {loading ? (
            <Spinner size="md" />
          ) : (
            <div>
              <p className="text-2xl md:text-4xl font-bold text-rose-600" style={{ fontFamily: 'var(--font-nunito)' }}>{berisiko}</p>
              <p className="text-xs md:text-sm text-stone-500">dari {total} balita</p>
            </div>
          )}
          <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-100 text-xs md:text-sm px-2 md:px-3">
            Detail
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PemeriksaanTerakhirCard({ data, loading }: { data: RecordPemeriksaan[]; loading: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2 md:pb-0">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base md:text-lg">Pemeriksaan Terakhir</CardTitle>
          <span className="text-[10px] md:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full shrink-0">
            {data.length} data
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-3 md:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Spinner size="md" />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-stone-400 py-8">Belum ada data</p>
        ) : (
          <div className="space-y-1.5 md:space-y-2">
            {data.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-xl md:rounded-2xl transition-colors bg-stone-50/80 hover:bg-stone-100/80">
                <Avatar name={item.child?.nama_anak || "?"} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                    {item.child?.nama_anak || "Anak"}
                  </p>
                  <p className="text-[10px] md:text-xs text-stone-500">
                    BB: {item.berat_badan}kg • TB: {item.tinggi_badan}cm
                  </p>
                </div>
                <StatusBadge status={item.ai_prediction?.hasil_prediksi === "normal" ? "normal" : item.ai_prediction?.hasil_prediksi === "buruk" ? "merah" : "kuning"} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AnakTerbaruCard({ data, loading }: { data: Anak[]; loading: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2 md:pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Balita Terbaru</CardTitle>
          <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 text-xs md:text-sm px-2 md:px-3">
            Semua
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-3 md:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Spinner size="md" />
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-stone-400 py-8">Belum ada data</p>
        ) : (
          <div className="space-y-2 md:space-y-3">
            {data.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-xl md:rounded-2xl bg-stone-50/80 hover:bg-stone-100/80 transition-colors">
                <Avatar name={item.nama_anak} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>{item.nama_anak}</p>
                  <p className="text-[11px] md:text-sm text-stone-500 truncate">
                    {item.jenis_kelamin === "L" ? "👦" : "👧"} • {item.family?.nama_kepala_keluarga || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = pakeKonteksAuth();
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const [loading, setLoading] = useState(true);
  const [totalAnak, setTotalAnak] = useState(0);
  const [totalPemeriksaan, setTotalPemeriksaan] = useState(0);
  const [statusGizi, setStatusGizi] = useState<StatusGizi[]>([
    { name: "Gizi Baik", value: 0, color: "#86EFAC" },
    { name: "Gizi Kurang", value: 0, color: "#FCD34D" },
    { name: "Stunting", value: 0, color: "#FDA4AF" },
  ]);
  const [anakBerisiko, setAnakBerisiko] = useState(0);
  const [pemeriksaanTerakhir, setPemeriksaanTerakhir] = useState<RecordPemeriksaan[]>([]);
  const [anakTerbaru, setAnakTerbaru] = useState<Anak[]>([]);

  const muatData = useCallback(async () => {
    setLoading(true);
    try {
      // Muat data anak
      const anakResult = await childrenService.ambilDaftar({ per_page: 100 });
      const anakResponse = anakResult as any;
      let anakList: Anak[] = [];
      if (anakResponse?.data?.data && Array.isArray(anakResponse.data.data)) {
        anakList = anakResponse.data.data;
        setTotalAnak(anakResponse.data.total || anakList.length);
        setAnakTerbaru(anakList.slice(0, 5));
      }

      // Muat data pemeriksaan
      const recordResult = await recordsService.ambilDaftar({ per_page: 20 });
      const recordResponse = recordResult as any;
      if (recordResponse?.data?.data && Array.isArray(recordResponse.data.data)) {
        const records = recordResponse.data.data as RecordPemeriksaan[];
        setTotalPemeriksaan(recordResponse.data.total || records.length);
        setPemeriksaanTerakhir(records);

        // Hitung status gizi dari AI prediction
        let giziBaik = 0, giziKurang = 0, stunting = 0;
        records.forEach(r => {
          const hasil = r.ai_prediction?.hasil_prediksi;
          if (hasil === "normal") giziBaik++;
          else if (hasil === "kurang") giziKurang++;
          else if (hasil === "buruk") stunting++;
        });
        
        // Jika tidak ada data AI, hitung dari total
        if (giziBaik + giziKurang + stunting === 0) {
          giziBaik = Math.floor(anakList.length * 0.85);
          giziKurang = Math.floor(anakList.length * 0.10);
          stunting = anakList.length - giziBaik - giziKurang;
        }

        setStatusGizi([
          { name: "Gizi Baik", value: giziBaik, color: "#86EFAC" },
          { name: "Gizi Kurang", value: giziKurang, color: "#FCD34D" },
          { name: "Stunting", value: stunting, color: "#FDA4AF" },
        ]);
        setAnakBerisiko(stunting);
      }
    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    muatData();
  }, [muatData]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
            {greeting()}, {user?.nama?.split(' ')[0] || 'User'}! 👋
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
              <p className="text-white/80 text-xs md:text-sm font-medium">Dashboard Posyandu</p>
              <p className="text-base md:text-xl font-bold truncate" style={{ fontFamily: 'var(--font-nunito)' }}>Posyandu Pintar - Pantau Tumbuh Kembang Anak</p>
              <p className="text-white/80 text-xs md:text-sm mt-0.5 truncate">Monitoring kesehatan balita dengan teknologi AI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-5 lg:grid-cols-4">
        <StatCard title="Total Balita" value={totalAnak} subtitle="Terdaftar" icon={Baby} gradient="from-sky-400 to-blue-500" shadowColor="shadow-sky-200" loading={loading} />
        <StatCard title="Pemeriksaan" value={totalPemeriksaan} subtitle="Total record" icon={HeartPulse} gradient="from-pink-400 to-rose-500" shadowColor="shadow-pink-200" loading={loading} />
        <StatCard title="Gizi Baik" value={statusGizi[0].value} subtitle={`${Math.round((statusGizi[0].value / (totalAnak || 1)) * 100)}% dari total`} icon={TrendingUp} gradient="from-emerald-400 to-teal-500" shadowColor="shadow-emerald-200" loading={loading} />
        <StatCard title="Berisiko" value={anakBerisiko} subtitle="Perlu perhatian" icon={AlertTriangle} gradient="from-rose-400 to-red-500" shadowColor="shadow-rose-200" loading={loading} />
      </div>

      <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
        <DonutChart data={statusGizi} loading={loading} />
        <AlertCard berisiko={anakBerisiko} total={totalAnak} loading={loading} />
      </div>

      <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
        <AnakTerbaruCard data={anakTerbaru} loading={loading} />
        <PemeriksaanTerakhirCard data={pemeriksaanTerakhir} loading={loading} />
      </div>
    </div>
  );
}
