import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Sidebar />
      <div className="ml-72">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
