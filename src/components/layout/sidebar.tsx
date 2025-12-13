"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, ClipboardList, Brain, Megaphone, FileBarChart, Menu, X, LogOut } from "lucide-react";
import { pakeKonteksAuth, formatRole } from "@/contexts";
import { getAvatarByRole } from "@/lib/avatar";
import { useConfirm } from "@/components/providers/confirm-provider";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Data Balita", href: "/dashboard/anak", icon: Users },
  { label: "Pemeriksaan", href: "/dashboard/pemeriksaan", icon: ClipboardList },
  { label: "Analisis AI", href: "/dashboard/analisis", icon: Brain },
  { label: "Broadcast", href: "/dashboard/notifikasi", icon: Megaphone },
  { label: "Laporan", href: "/dashboard/laporan", icon: FileBarChart },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, sedangMemuat, keluar } = pakeKonteksAuth();
  const { confirmLogout } = useConfirm();
  const [isOpen, setIsOpen] = useState(false);
  const [sedangLogout, setSedangLogout] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    if (sedangLogout) return;
    confirmLogout(async () => {
      setSedangLogout(true);
      await keluar();
    });
  };

  const namaUser = user?.nama || user?.name || "Memuat...";
  const roleUser = user?.role ? formatRole(user.role) : "...";
  const avatarUrl = getAvatarByRole(namaUser, user?.role);

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white/90 backdrop-blur-xl border-b border-stone-200/60">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-9 w-9" />
          <span className="text-base font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
            Posyandu<span className="text-orange-500"> Plus</span>
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 bg-white/95 backdrop-blur-xl border-r border-stone-200/60 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="hidden lg:flex h-20 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-11 w-11" />
            <div>
              <span className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Posyandu</span>
              <span className="text-lg font-bold text-orange-500" style={{ fontFamily: 'var(--font-nunito)' }}> Plus</span>
            </div>
          </Link>
        </div>

        <div className="lg:hidden h-16 flex items-center justify-end px-4">
          <button
            onClick={closeSidebar}
            className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 px-4 mt-4 lg:mt-0">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 shadow-sm"
                    : "text-stone-500 hover:bg-stone-100/80 hover:text-stone-700"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-orange-500" : "text-stone-400")} />
                <span style={{ fontFamily: 'var(--font-nunito)' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-stone-100 to-stone-50 p-4 border border-stone-200/60">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-200">
                {sedangMemuat ? (
                  <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                ) : (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
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
                className="h-8 w-8 rounded-lg bg-stone-200/60 flex items-center justify-center text-stone-500 hover:bg-rose-100 hover:text-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
