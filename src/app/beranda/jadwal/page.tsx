"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Megaphone, FileText, BookOpen, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner } from "@/components/ui";
import { ortuService } from "@/services";
import type { BroadcastOrtu } from "@/services/ortu.service";

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TipeBroadcastIcon({ tipe }: { tipe: string }) {
  const config: Record<string, { color: string; icon: React.ElementType }> = {
    pengumuman: { color: "from-amber-400 to-orange-500", icon: Bell },
    artikel: { color: "from-sky-400 to-blue-500", icon: FileText },
    edukasi: { color: "from-emerald-400 to-teal-500", icon: BookOpen },
  };
  const c = config[tipe] || config.pengumuman;
  const Icon = c.icon;
  return (
    <div className={`h-9 w-9 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-md shrink-0`}>
      <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
    </div>
  );
}

function TipeBadge({ tipe }: { tipe: string }) {
  const config: Record<string, { variant: "warning" | "info" | "success"; label: string }> = {
    pengumuman: { variant: "warning", label: "Pengumuman" },
    artikel: { variant: "info", label: "Artikel" },
    edukasi: { variant: "success", label: "Edukasi" },
  };
  const c = config[tipe] || config.pengumuman;
  return <Badge variant={c.variant} className="text-[10px] md:text-xs">{c.label}</Badge>;
}

export default function JadwalPage() {
  const [broadcasts, setBroadcasts] = useState<BroadcastOrtu[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  const muatBroadcasts = useCallback(async () => {
    setSedangMemuat(true);
    try {
      const result = await ortuService.ambilBroadcasts();
      if (Array.isArray(result)) {
        setBroadcasts(result);
      }
    } catch {
      setBroadcasts([]);
    } finally {
      setSedangMemuat(false);
    }
  }, []);

  useEffect(() => {
    muatBroadcasts();
  }, [muatBroadcasts]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Jadwal Posyandu</h1>
        <p className="text-stone-500 mt-1">Lihat informasi dan pengumuman dari Posyandu</p>
      </div>

      <Card className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 border-0" hover={false}>
        <CardContent className="p-4 md:p-6 text-white">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-white/80 text-xs md:text-sm font-medium">Jadwal Posyandu</p>
              <p className="text-lg md:text-2xl font-bold mt-0.5 md:mt-1" style={{ fontFamily: 'var(--font-nunito)' }}>
                Hubungi Posyandu
              </p>
              <p className="text-white/80 text-xs md:text-sm mt-0.5 md:mt-1">
                Untuk informasi jadwal terbaru
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <CardHeader className="pb-2 md:pb-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base md:text-lg">Pengumuman Posyandu</CardTitle>
              <p className="text-[10px] md:text-xs text-violet-600">{broadcasts.length} pengumuman</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-4">
          {sedangMemuat ? (
            <div className="flex items-center justify-center py-8">
              <Spinner size="md" />
            </div>
          ) : broadcasts.length === 0 ? (
            <div className="text-center py-8 text-stone-400">
              <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Belum ada pengumuman</p>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {broadcasts.map((b) => (
                <div key={b.id} className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/80 border border-violet-100">
                  <div className="flex items-start gap-3">
                    <TipeBroadcastIcon tipe={b.tipe} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                          {b.judul}
                        </h4>
                        <TipeBadge tipe={b.tipe} />
                      </div>
                      <p className="text-xs md:text-sm text-stone-600 line-clamp-2">{b.isi}</p>
                      <p className="text-[10px] md:text-xs text-stone-400 mt-1">{formatTanggal(b.created_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
