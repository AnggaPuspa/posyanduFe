import { Sidebar } from "@/components/layout/sidebar";
import { AuthGuard } from "@/components/auth";
import { AuthProvider } from "@/contexts";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AuthProvider>
        <div className="min-h-screen bg-stone-50">
          <Sidebar />
          <div className="lg:ml-72">
            <div className="h-16 lg:hidden" />
            <main className="p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </AuthProvider>
    </AuthGuard>
  );
}
