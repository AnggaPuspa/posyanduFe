"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Baby, LineChart, Brain, Calendar, Bell } from "lucide-react";

const menuMasyarakat = [
  { label: "Beranda", href: "/beranda", icon: Home },
  { label: "Anak Saya", href: "/beranda/anak", icon: Baby },
  { label: "Riwayat Pertumbuhan", href: "/beranda/riwayat", icon: LineChart },
  { label: "Hasil Analisis", href: "/beranda/hasil", icon: Brain },
  { label: "Jadwal Posyandu", href: "/beranda/jadwal", icon: Calendar },
];

export function SidebarMasyarakat() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-stone-200/60">
      <div className="flex h-20 items-center px-6">
        <Link href="/beranda" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-lg shadow-lg shadow-emerald-200">
            P
          </div>
          <div>
            <span className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Posyandu</span>
            <span className="text-lg font-bold text-emerald-500" style={{ fontFamily: 'var(--font-nunito)' }}> Pintar</span>
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
              SR
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Siti Rahayu</p>
              <p className="text-xs text-stone-500">Orang Tua</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
