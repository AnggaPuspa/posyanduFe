import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const riwayat = [
  { tanggal: "9 Des 2024", umur: "18 bulan", bb: 10.2, tb: 78, lk: 44, lila: 13, status: "kuning" },
  { tanggal: "9 Nov 2024", umur: "17 bulan", bb: 9.8, tb: 76, lk: 43.5, lila: 12.8, status: "normal" },
  { tanggal: "9 Okt 2024", umur: "16 bulan", bb: 9.5, tb: 74, lk: 43, lila: 12.5, status: "normal" },
  { tanggal: "9 Sep 2024", umur: "15 bulan", bb: 9.2, tb: 72, lk: 42.5, lila: 12.2, status: "normal" },
  { tanggal: "9 Agt 2024", umur: "14 bulan", bb: 8.9, tb: 70, lk: 42, lila: 12, status: "normal" },
  { tanggal: "9 Jul 2024", umur: "13 bulan", bb: 8.5, tb: 68, lk: 41.5, lila: 11.8, status: "normal" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    normal: "bg-green-100 text-green-700",
    kuning: "bg-yellow-100 text-yellow-700",
    merah: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status === "normal" ? "Normal" : status === "kuning" ? "Perlu Perhatian" : "Berisiko"}
    </span>
  );
}

export default function RiwayatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Riwayat Tumbuh Kembang</h2>
        <p className="text-gray-500">Pantau perkembangan anak dari waktu ke waktu</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafik Pertumbuhan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-500">Grafik akan muncul setelah integrasi API</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tanggal</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Umur</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">BB (kg)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">TB (cm)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">LK (cm)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">LILA (cm)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{r.tanggal}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{r.umur}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{r.bb}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{r.tb}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{r.lk}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{r.lila}</td>
                    <td className="py-3 px-4"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
