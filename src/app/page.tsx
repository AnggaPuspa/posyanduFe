import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white text-2xl font-bold mb-4">
            P
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Posyandu Pintar</h1>
          <p className="text-gray-600 mt-2">Sistem pemantauan tumbuh kembang anak berbasis AI</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <CardTitle>Admin / Kader Posyandu</CardTitle>
              <CardDescription>Kelola data anak, input pemeriksaan, dan lihat analisis AI</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link href="/dashboard">
                <Button className="w-full">Masuk sebagai Kader</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <CardTitle>Orang Tua / Masyarakat</CardTitle>
              <CardDescription>Pantau perkembangan anak dan lihat hasil analisis kesehatan</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Link href="/beranda">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Masuk sebagai Orang Tua
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Powered by AI untuk mencegah stunting
        </p>
      </div>
    </main>
  );
}
