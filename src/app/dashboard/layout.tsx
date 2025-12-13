import { Sidebar } from "@/components/layout/sidebar";
import { AuthGuard, RoleGuard } from "@/components/auth";
import { AuthProvider } from "@/contexts";

// Role yang diizinkan mengakses dashboard admin
const ALLOWED_ROLES = ["admin", "kader", "posyandu"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={ALLOWED_ROLES} redirectTo="/beranda">
        <AuthProvider>
          <div className="min-h-screen bg-stone-50">
            <Sidebar />
            <div className="lg:ml-72">
              <div className="h-16 lg:hidden" />
              <main className="p-4 md:p-6 lg:p-8">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </RoleGuard>
    </AuthGuard>
  );
}
