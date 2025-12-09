import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const anakSaya = [
  { id: 1, nama: "Andi Pratama", umur: "18 bulan", status: "kuning", terakhir_periksa: "9 Des 2024" },
];

const riwayatTerbaru = [
  { tanggal: "9 Des 2024", bb: "10.2 kg", tb: "78 cm", status: "kuning" },
  { tanggal: "9 Nov 2024", bb: "9.8 kg", tb: "76 cm", status: "normal" },
  { tanggal: "9 Okt 2024", bb: "9.5 kg", tb: "74 cm", status: "normal" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    normal: "bg-green-100 text-green-700",
    kuning: "bg-yellow-100 text-yellow-700",
    merah: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    normal: "Normal",
    kuning: "Perlu Perhatian",
    merah: "Berisiko",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function BerandaPage() {
  const anak = anakSaya[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Selamat Datang, Ibu Siti!</h2>
        <p className="text-gray-500">Pantau tumbuh kembang anak Anda di sini</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil Anak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">
                {anak.nama.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{anak.nama}</h3>
                <p className="text-gray-500">{anak.umur}</p>
                <div className="flex items-center gap-4 mt-2">
                  <StatusBadge status={anak.status} />
                  <span className="text-sm text-gray-500">Terakhir periksa: {anak.terakhir_periksa}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Berikutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900">9 Januari 2025</p>
              <p className="text-sm text-gray-500">Posyandu Melati, 08:00 WIB</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pertumbuhan Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riwayatTerbaru.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{r.tanggal}</p>
                    <p className="text-sm text-gray-500">BB: {r.bb} • TB: {r.tb}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Rekomendasi dari AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800 mb-3">
                Pertumbuhan Andi perlu perhatian. Tinggi badan sedikit di bawah standar untuk usianya.
              </p>
              <h4 className="font-medium text-yellow-900 mb-2">Saran:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-sm text-yellow-800">
                  <svg className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tingkatkan asupan protein (telur, ikan, daging)
                </li>
                <li className="flex items-start gap-2 text-sm text-yellow-800">
                  <svg className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Berikan susu formula atau ASI yang cukup
                </li>
                <li className="flex items-start gap-2 text-sm text-yellow-800">
                  <svg className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Konsultasi dengan bidan atau dokter anak
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
