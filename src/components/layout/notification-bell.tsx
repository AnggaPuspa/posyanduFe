"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Bell, Megaphone, FileText, BookOpen, X } from "lucide-react";
import { ortuService } from "@/services";
import type { BroadcastOrtu } from "@/services/ortu.service";

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TipeIcon({ tipe }: { tipe: string }) {
  const config: Record<string, { color: string; icon: React.ElementType }> = {
    pengumuman: { color: "from-amber-400 to-orange-500", icon: Bell },
    artikel: { color: "from-sky-400 to-blue-500", icon: FileText },
    edukasi: { color: "from-emerald-400 to-teal-500", icon: BookOpen },
  };
  const c = config[tipe] || config.pengumuman;
  const Icon = c.icon;
  return (
    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
  );
}

export function NotificationBell() {
  const [broadcasts, setBroadcasts] = useState<BroadcastOrtu[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const muatBroadcasts = useCallback(async () => {
    try {
      const result = await ortuService.ambilBroadcasts();
      if (Array.isArray(result)) {
        setBroadcasts(result);
      }
    } catch {
      setBroadcasts([]);
    }
  }, []);

  useEffect(() => {
    muatBroadcasts();
  }, [muatBroadcasts]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-9 w-9 md:h-11 md:w-11 rounded-xl md:rounded-2xl bg-white border border-stone-200/60 flex items-center justify-center text-stone-500 hover:text-stone-700 hover:shadow-md transition-all"
      >
        <Bell className="w-4 h-4 md:w-5 md:h-5" />
        {broadcasts.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-rose-500 text-white text-[10px] md:text-xs font-semibold flex items-center justify-center">
            {broadcasts.length > 9 ? "9+" : broadcasts.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-stone-200/60 overflow-hidden z-50">
          <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-gradient-to-r from-violet-50 to-purple-50">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                Pengumuman
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {broadcasts.length === 0 ? (
              <div className="py-12 text-center text-stone-400">
                <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Belum ada pengumuman</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {broadcasts.map((b) => (
                  <div key={b.id} className="p-4 hover:bg-stone-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <TipeIcon tipe={b.tipe} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                          {b.judul}
                        </h4>
                        <p className="text-xs text-stone-600 line-clamp-2 mt-0.5">{b.isi}</p>
                        <p className="text-[10px] text-stone-400 mt-1">{formatTanggal(b.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
