import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const statistik = {
  total_anak: 156,
  total_pemeriksaan_bulan_ini: 89,
  anak_berisiko: 12,
  anak_normal: 132,
  anak_perlu_perhatian: 12,
};

const anakBerisiko = [
  { id: 1, nama: "Andi Pratama", umur: "18 bulan", status: "merah", masalah: "BB/U sangat rendah" },
  { id: 2, nama: "Siti Aminah", umur: "24 bulan", status: "kuning", masalah: "TB/U di bawah normal" },
  { id: 3, nama: "Budi Santoso", umur: "12 bulan", status: "kuning", masalah: "Pertumbuhan lambat" },
];

const pemeriksaanTerbaru = [
  { id: 1, nama: "Dina Putri", tanggal: "9 Des 2024", bb: "10.2 kg", tb: "78 cm", status: "normal" },
  { id: 2, nama: "Riko Aditya", tanggal: "9 Des 2024", bb: "8.5 kg", tb: "72 cm", status: "kuning" },
  { id: 3, nama: "Maya Sari", tanggal: "8 Des 2024", bb: "11.0 kg", tb: "82 cm", status: "normal" },
  { id: 4, nama: "Andi Pratama", tanggal: "8 Des 2024", bb: "7.1 kg", tb: "68 cm", status: "merah" },
];

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`h-12 w-12 rounded-full ${color} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    normal: "bg-green-100 text-green-700",
    hijau: "bg-green-100 text-green-700",
    kuning: "bg-yellow-100 text-yellow-700",
    merah: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.normal}`}>
      {status === "normal" || status === "hijau" ? "Normal" : status === "kuning" ? "Perlu Perhatian" : "Berisiko"}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Selamat Datang, Kader!</h2>
        <p className="text-gray-500">Berikut ringkasan data Posyandu hari ini</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Anak Terdaftar"
          value={statistik.total_anak}
          color="bg-blue-100"
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard
          title="Pemeriksaan Bulan Ini"
          value={statistik.total_pemeriksaan_bulan_ini}
          color="bg-green-100"
          icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Anak Status Normal"
          value={statistik.anak_normal}
          color="bg-emerald-100"
          icon={<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Anak Berisiko Stunting"
          value={statistik.anak_berisiko}
          color="bg-red-100"
          icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Anak Perlu Perhatian Khusus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anakBerisiko.map((anak) => (
                <div key={anak.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                      {anak.nama.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{anak.nama}</p>
                      <p className="text-sm text-gray-500">{anak.umur} • {anak.masalah}</p>
                    </div>
                  </div>
                  <StatusBadge status={anak.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Pemeriksaan Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pemeriksaanTerbaru.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {p.nama.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{p.nama}</p>
                      <p className="text-sm text-gray-500">{p.tanggal} • BB: {p.bb}, TB: {p.tb}</p>
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
