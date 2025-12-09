import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const dummyAnalisis = [
  {
    id: 1,
    nama_anak: "Andi Pratama",
    tanggal: "2024-12-09",
    z_score_bb_u: -2.8,
    z_score_tb_u: -2.5,
    status_gizi: "Gizi Kurang",
    level_risiko: "merah",
    interpretasi: "Anak mengalami underweight dan stunting berdasarkan standar WHO. Berat badan dan tinggi badan berada di bawah -2 SD.",
    prediksi: "Jika tidak ada intervensi, risiko stunting permanen dalam 3 bulan ke depan sangat tinggi.",
    rekomendasi: [
      "Konsultasikan segera ke Puskesmas atau dokter anak",
      "Berikan makanan tinggi protein dan kalori (telur, ikan, daging)",
      "Pastikan anak mendapat ASI atau susu formula yang cukup",
      "Pantau pertumbuhan setiap 2 minggu",
    ],
  },
  {
    id: 2,
    nama_anak: "Siti Aminah",
    tanggal: "2024-12-09",
    z_score_bb_u: -1.5,
    z_score_tb_u: -1.8,
    status_gizi: "Gizi Cukup",
    level_risiko: "kuning",
    interpretasi: "Anak berada di zona waspada. Tinggi badan sedikit di bawah rata-rata untuk usianya.",
    prediksi: "Dengan penanganan yang tepat, anak dapat kembali ke jalur pertumbuhan normal dalam 2-3 bulan.",
    rekomendasi: [
      "Tingkatkan asupan protein hewani",
      "Berikan suplemen vitamin sesuai anjuran",
      "Lakukan pemeriksaan rutin setiap bulan",
    ],
  },
  {
    id: 3,
    nama_anak: "Dina Putri",
    tanggal: "2024-12-08",
    z_score_bb_u: 0.5,
    z_score_tb_u: 0.3,
    status_gizi: "Gizi Baik",
    level_risiko: "hijau",
    interpretasi: "Pertumbuhan anak sesuai dengan standar WHO. Berat badan dan tinggi badan dalam rentang normal.",
    prediksi: "Pertumbuhan diprediksi akan tetap optimal jika pola makan dan kesehatan dijaga.",
    rekomendasi: [
      "Pertahankan pola makan seimbang",
      "Lanjutkan pemeriksaan rutin setiap bulan",
      "Pastikan imunisasi lengkap",
    ],
  },
];

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
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value.toFixed(1)} SD</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div className="absolute inset-0 flex">
          <div className="w-1/6 bg-red-200 rounded-l-full" />
          <div className="w-1/6 bg-yellow-200" />
          <div className="w-2/6 bg-green-200" />
          <div className="w-1/6 bg-yellow-200" />
          <div className="w-1/6 bg-red-200 rounded-r-full" />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white ${color}`}
          style={{ left: `calc(${position}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>-3</span>
        <span>-2</span>
        <span>0</span>
        <span>+2</span>
        <span>+3</span>
      </div>
    </div>
  );
}

export default function AnalisisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analisis AI</h2>
        <p className="text-gray-500">Hasil analisis pertumbuhan anak menggunakan AI (Google Gemini)</p>
      </div>

      <div className="grid gap-6">
        {dummyAnalisis.map((a) => (
          <Card key={a.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {a.nama_anak.charAt(0)}
                  </div>
                  <div>
                    <CardTitle>{a.nama_anak}</CardTitle>
                    <p className="text-sm text-gray-500">Pemeriksaan: {a.tanggal}</p>
                  </div>
                </div>
                <RisikoBadge level={a.level_risiko} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Z-Score</h4>
                  <ZScoreBar value={a.z_score_bb_u} label="BB/U (Berat Badan per Umur)" />
                  <ZScoreBar value={a.z_score_tb_u} label="TB/U (Tinggi Badan per Umur)" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status Gizi</h4>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-900">{a.status_gizi}</p>
                    <p className="text-sm text-gray-600 mt-1">{a.interpretasi}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Prediksi 3 Bulan
                  </h4>
                  <p className="text-sm text-gray-600 p-4 rounded-lg bg-purple-50">{a.prediksi}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Rekomendasi
                  </h4>
                  <ul className="space-y-2">
                    {a.rekomendasi.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
