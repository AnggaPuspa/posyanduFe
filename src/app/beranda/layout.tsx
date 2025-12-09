import { SidebarMasyarakat } from "@/components/layout/sidebar-masyarakat";
import { Bell } from "lucide-react";

export default function BerandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <SidebarMasyarakat />
      
      {/* Main content - No left margin on mobile */}
      <div className="md:ml-72">
        {/* Header - Mobile & Desktop */}
        <header className="sticky top-0 z-30 flex h-14 md:h-20 items-center justify-between bg-stone-50/90 backdrop-blur-xl px-4 md:px-8 border-b md:border-b-0 border-stone-200/60">
          <div className="flex items-center gap-3">
            {/* Mobile Logo */}
            <div className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-sm shadow-md">
              P
            </div>
            <h1 className="text-base md:text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
              <span className="md:hidden">Posyandu Pintar</span>
              <span className="hidden md:inline">Portal Orang Tua</span>
            </h1>
          </div>
          <button className="relative h-9 w-9 md:h-11 md:w-11 rounded-xl md:rounded-2xl bg-white border border-stone-200/60 flex items-center justify-center text-stone-500 hover:text-stone-700 hover:shadow-md transition-all">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-rose-500 text-white text-[10px] md:text-xs font-semibold flex items-center justify-center">2</span>
          </button>
        </header>
        
        {/* Main Content - With bottom padding for mobile nav */}
        <main className="p-4 md:p-8 md:pt-0 pb-24 md:pb-8">{children}</main>
      </div>
    </div>
  );
}
