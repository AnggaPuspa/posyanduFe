import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const ringkasanBulanan = {
  bulan: "Desember 2024",
  total_pemeriksaan: 89,
  anak_baru: 5,
  status: {
    normal: 72,
    perlu_perhatian: 12,
    berisiko: 5,
  },
};

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Laporan</h2>
          <p className="text-gray-500">Unduh dan lihat laporan Posyandu</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600">Periode</span>
                <span className="font-medium text-gray-900">{ringkasanBulanan.bulan}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600">Total Pemeriksaan</span>
                <span className="font-medium text-gray-900">{ringkasanBulanan.total_pemeriksaan}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600">Anak Baru Terdaftar</span>
                <span className="font-medium text-gray-900">{ringkasanBulanan.anak_baru}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center p-3 rounded-lg bg-green-50">
                  <p className="text-2xl font-bold text-green-700">{ringkasanBulanan.status.normal}</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-yellow-50">
                  <p className="text-2xl font-bold text-yellow-700">{ringkasanBulanan.status.perlu_perhatian}</p>
                  <p className="text-xs text-yellow-600">Perlu Perhatian</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-50">
                  <p className="text-2xl font-bold text-red-700">{ringkasanBulanan.status.berisiko}</p>
                  <p className="text-xs text-red-600">Berisiko</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ekspor Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Laporan Excel (.xlsx)</p>
                    <p className="text-sm text-gray-500">Data lengkap pemeriksaan</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Unduh</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Laporan PDF</p>
                    <p className="text-sm text-gray-500">Format siap cetak</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Unduh</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Data CSV</p>
                    <p className="text-sm text-gray-500">Format untuk analisis lanjutan</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Unduh</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafik Pertumbuhan Bulanan</CardTitle>
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
    </div>
  );
}
