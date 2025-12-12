"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Baby, LineChart, Brain, Calendar, LogOut } from "lucide-react";
import { pakeKonteksAuth, ambilInisial, formatRole } from "@/contexts";

const menuMasyarakat = [
  { label: "Beranda", href: "/beranda", icon: Home },
  { label: "Anak Saya", href: "/beranda/anak", icon: Baby },
  { label: "Riwayat", href: "/beranda/riwayat", icon: LineChart },
  { label: "Hasil AI", href: "/beranda/hasil", icon: Brain },
  { label: "Jadwal", href: "/beranda/jadwal", icon: Calendar },
];

export function SidebarMasyarakat() {
  const pathname = usePathname();
  const { user, sedangMemuat, keluar } = pakeKonteksAuth();
  const [sedangLogout, setSedangLogout] = useState(false);

  const handleLogout = async () => {
    if (sedangLogout) return;
    setSedangLogout(true);
    await keluar();
  };

  const namaUser = user?.nama || "Memuat...";
  const roleUser = user?.role ? formatRole(user.role) : "...";
  const inisialUser = user?.nama ? ambilInisial(user.nama) : "??";

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-stone-200 safe-area-pb">
        <div className="flex items-center justify-around py-2">
          {menuMasyarakat.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                  isActive ? "text-emerald-600" : "text-stone-400"
                )}
              >
                <div className={cn("p-1.5 rounded-xl transition-all", isActive && "bg-emerald-50")}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            disabled={sedangLogout}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-stone-400 hover:text-rose-500 disabled:opacity-50"
          >
            <div className="p-1.5 rounded-xl transition-all">
              {sedangLogout ? (
                <div className="w-5 h-5 border-2 border-stone-400/30 border-t-stone-400 rounded-full animate-spin" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
            </div>
            <span className="text-[10px] font-medium">Keluar</span>
          </button>
        </div>
      </nav>

      <aside className="hidden md:block fixed left-0 top-0 z-40 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-stone-200/60">
        <div className="flex h-20 items-center px-6">
          <Link href="/beranda" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-11 w-11" />
            <div>
              <span className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Posyandu</span>
              <span className="text-lg font-bold text-emerald-500" style={{ fontFamily: 'var(--font-nunito)' }}> Plus</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-1.5 px-4 mt-4">
          {menuMasyarakat.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 shadow-sm"
                    : "text-stone-500 hover:bg-stone-100/80 hover:text-stone-700"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-emerald-500" : "text-stone-400")} />
                <span style={{ fontFamily: 'var(--font-nunito)' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-rose-200">
                {sedangMemuat ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  inisialUser
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {namaUser}
                </p>
                <p className="text-xs text-stone-500 truncate">{roleUser}</p>
              </div>
              <button 
                onClick={handleLogout}
                disabled={sedangLogout}
                className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center text-stone-400 hover:bg-rose-100 hover:text-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Keluar"
              >
                {sedangLogout ? (
                  <div className="w-4 h-4 border-2 border-stone-400/30 border-t-stone-400 rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
