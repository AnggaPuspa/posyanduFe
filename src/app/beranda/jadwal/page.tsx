import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components/ui";

const jadwalPosyandu = [
  {
    tanggal: "9 Januari 2025",
    hari: "Kamis",
    waktu: "08:00 - 12:00 WIB",
    lokasi: "Posyandu Melati",
    alamat: "Jl. Melati No. 15, RT 05/RW 02",
    kegiatan: ["Penimbangan", "Pengukuran TB", "Imunisasi", "PMT"],
    status: "upcoming",
  },
  {
    tanggal: "9 Desember 2024",
    hari: "Senin",
    waktu: "08:00 - 12:00 WIB",
    lokasi: "Posyandu Melati",
    alamat: "Jl. Melati No. 15, RT 05/RW 02",
    kegiatan: ["Penimbangan", "Pengukuran TB"],
    status: "done",
  },
  {
    tanggal: "9 November 2024",
    hari: "Sabtu",
    waktu: "08:00 - 12:00 WIB",
    lokasi: "Posyandu Melati",
    alamat: "Jl. Melati No. 15, RT 05/RW 02",
    kegiatan: ["Penimbangan", "Pengukuran TB", "Vitamin A"],
    status: "done",
  },
];

export default function JadwalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Jadwal Posyandu</h2>
        <p className="text-gray-500">Lihat jadwal posyandu yang akan datang</p>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-green-600 font-medium">Jadwal Berikutnya</p>
              <p className="text-2xl font-bold text-green-800">9 Januari 2025</p>
              <p className="text-green-700">Kamis, 08:00 - 12:00 WIB</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Ingatkan Saya
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {jadwalPosyandu.map((j, i) => (
          <Card key={i} className={j.status === "done" ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${j.status === "upcoming" ? "bg-green-100" : "bg-gray-100"}`}>
                    <svg className={`w-6 h-6 ${j.status === "upcoming" ? "text-green-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{j.tanggal}</p>
                    <p className="text-sm text-gray-500">{j.hari}, {j.waktu}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{j.lokasi}</p>
                  <p className="text-sm text-gray-500">{j.alamat}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {j.kegiatan.map((k, ki) => (
                    <span key={ki} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                      {k}
                    </span>
                  ))}
                </div>
                {j.status === "done" && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-500">
                    Selesai
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
