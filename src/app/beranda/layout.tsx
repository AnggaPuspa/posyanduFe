import { SidebarMasyarakat } from "@/components/layout/sidebar-masyarakat";
import { Bell } from "lucide-react";

export default function BerandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <SidebarMasyarakat />
      <div className="ml-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-stone-50/80 backdrop-blur-xl px-8">
          <h1 className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Portal Orang Tua</h1>
          <button className="relative h-11 w-11 rounded-2xl bg-white border border-stone-200/60 flex items-center justify-center text-stone-500 hover:text-stone-700 hover:shadow-md transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-xs font-semibold flex items-center justify-center">2</span>
          </button>
        </header>
        <main className="p-8 pt-0">{children}</main>
      </div>
    </div>
  );
}
