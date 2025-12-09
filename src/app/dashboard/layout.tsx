import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Sidebar />
      {/* Main content - responsive padding */}
      <div className="lg:ml-72">
        {/* Spacer for mobile header */}
        <div className="h-16 lg:hidden" />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
