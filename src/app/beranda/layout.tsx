import { SidebarMasyarakat } from "@/components/layout/sidebar-masyarakat";
import { NotificationBell } from "@/components/layout/notification-bell";
import { AuthGuard } from "@/components/auth";
import { AuthProvider } from "@/contexts";

export default function BerandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AuthProvider>
        <div className="min-h-screen bg-stone-50">
          <SidebarMasyarakat />
          
          <div className="md:ml-72">
            <header className="sticky top-0 z-30 flex h-14 md:h-20 items-center justify-between bg-stone-50/90 backdrop-blur-xl px-4 md:px-8 border-b md:border-b-0 border-stone-200/60">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="md:hidden h-9 w-9" />
                <h1 className="text-base md:text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                  <span className="md:hidden">Posyandu Plus</span>
                  <span className="hidden md:inline">Portal Orang Tua</span>
                </h1>
              </div>
              <NotificationBell />
            </header>
            
            <main className="p-4 md:p-8 md:pt-0 pb-24 md:pb-8">{children}</main>
          </div>
        </div>
      </AuthProvider>
    </AuthGuard>
  );
}
