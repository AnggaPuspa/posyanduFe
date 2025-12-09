import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const hasilAnalisis = {
  tanggal: "9 Desember 2024",
  z_score_bb_u: -1.5,
  z_score_tb_u: -1.8,
  status_gizi: "Gizi Cukup",
  level_risiko: "kuning",
  interpretasi: "Andi berada di zona waspada. Tinggi badan sedikit di bawah rata-rata untuk usianya (18 bulan). Berat badan masih dalam batas normal bawah.",
  prediksi: "Dengan intervensi nutrisi yang tepat, Andi diprediksi dapat kembali ke jalur pertumbuhan normal dalam 2-3 bulan ke depan.",
  rekomendasi: [
    "Tingkatkan asupan protein hewani seperti telur, ikan, atau daging",
    "Berikan susu pertumbuhan 2-3 kali sehari",
    "Tambahkan sayur dan buah dalam menu harian",
    "Pastikan anak cukup tidur (11-14 jam per hari)",
    "Lakukan pemeriksaan rutin setiap bulan ke Posyandu",
  ],
};

function RisikoBadge({ level }: { level: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    hijau: { bg: "bg-green-100", text: "text-green-700", label: "Risiko Rendah" },
    kuning: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Risiko Sedang" },
    merah: { bg: "bg-red-100", text: "text-red-700", label: "Risiko Tinggi" },
  };
  const c = config[level] || config.hijau;
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function ZScoreBar({ value, label }: { value: number; label: string }) {
  const position = Math.max(0, Math.min(100, ((value + 3) / 6) * 100));
  const color = value < -2 ? "bg-red-500" : value < -1 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value.toFixed(1)} SD</span>
      </div>
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/6 bg-red-200" />
          <div className="w-1/6 bg-yellow-200" />
          <div className="w-2/6 bg-green-200" />
          <div className="w-1/6 bg-yellow-200" />
          <div className="w-1/6 bg-red-200" />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow ${color}`}
          style={{ left: `calc(${position}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>-3 (Buruk)</span>
        <span>0 (Normal)</span>
        <span>+3 (Lebih)</span>
      </div>
    </div>
  );
}

export default function HasilPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Hasil Analisis AI</h2>
        <p className="text-gray-500">Analisis pertumbuhan Andi berdasarkan data terakhir</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analisis Pemeriksaan {hasilAnalisis.tanggal}</CardTitle>
            <RisikoBadge level={hasilAnalisis.level_risiko} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-900">Z-Score (Standar WHO)</h4>
              <ZScoreBar value={hasilAnalisis.z_score_bb_u} label="BB/U (Berat per Umur)" />
              <ZScoreBar value={hasilAnalisis.z_score_tb_u} label="TB/U (Tinggi per Umur)" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Status Gizi</h4>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-lg font-semibold text-yellow-800 mb-2">{hasilAnalisis.status_gizi}</p>
                <p className="text-sm text-yellow-700">{hasilAnalisis.interpretasi}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Prediksi 3 Bulan ke Depan
            </h4>
            <p className="text-sm text-purple-700">{hasilAnalisis.prediksi}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Rekomendasi untuk Orang Tua
            </h4>
            <div className="space-y-2">
              {hasilAnalisis.rekomendasi.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
