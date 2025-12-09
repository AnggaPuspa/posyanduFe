import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components/ui";

const anakSaya = [
  {
    id: 1,
    nama: "Andi Pratama",
    tanggal_lahir: "15 Juni 2023",
    jenis_kelamin: "Laki-laki",
    berat_lahir: "3.2 kg",
    panjang_lahir: "50 cm",
    status: "kuning",
  },
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
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AnakSayaPage() {
  const anak = anakSaya[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Anak Saya</h2>
        <p className="text-gray-500">Data lengkap anak yang terdaftar</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl font-bold mb-4">
                {anak.nama.charAt(0)}
              </div>
              <StatusBadge status={anak.status} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{anak.nama}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">Tanggal Lahir</p>
                  <p className="font-medium text-gray-900">{anak.tanggal_lahir}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">Jenis Kelamin</p>
                  <p className="font-medium text-gray-900">{anak.jenis_kelamin}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">Berat Lahir</p>
                  <p className="font-medium text-gray-900">{anak.berat_lahir}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">Panjang Lahir</p>
                  <p className="font-medium text-gray-900">{anak.panjang_lahir}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Pengukuran Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <p className="text-3xl font-bold text-blue-600">10.2</p>
              <p className="text-sm text-blue-600">kg</p>
              <p className="text-xs text-gray-500 mt-1">Berat Badan</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50">
              <p className="text-3xl font-bold text-green-600">78</p>
              <p className="text-sm text-green-600">cm</p>
              <p className="text-xs text-gray-500 mt-1">Tinggi Badan</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <p className="text-3xl font-bold text-purple-600">44</p>
              <p className="text-sm text-purple-600">cm</p>
              <p className="text-xs text-gray-500 mt-1">Lingkar Kepala</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50">
              <p className="text-3xl font-bold text-orange-600">13</p>
              <p className="text-sm text-orange-600">cm</p>
              <p className="text-xs text-gray-500 mt-1">Lingkar Lengan</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">Terakhir diukur: 9 Desember 2024</p>
        </CardContent>
      </Card>
    </div>
  );
}
