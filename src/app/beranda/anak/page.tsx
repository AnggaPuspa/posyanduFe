"use client";

import { Baby, Scale, Ruler, CircleDot, Heart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Avatar, StatusBadge } from "@/components/ui";

const anakSaya = {
  nama: "Andi Pratama",
  tanggal_lahir: "15 Juni 2023",
  jenis_kelamin: "Laki-laki",
  berat_lahir: "3.2 kg",
  panjang_lahir: "50 cm",
  status: "kuning",
};

const dataTerakhir = { bb: 10.2, tb: 78, lk: 44, lila: 13, tanggal: "9 Desember 2024" };

export default function AnakSayaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Anak Saya</h1>
        <p className="text-stone-500 mt-1">Profil lengkap dan data perkembangan anak</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Avatar name={anakSaya.nama} size="xl" className="h-32 w-32 text-4xl rounded-3xl" />
              <div className="mt-4">
                <StatusBadge status={anakSaya.status} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-stone-800 mb-5" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.nama}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Tanggal Lahir</p>
                    <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.tanggal_lahir}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md">
                    <Baby className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Jenis Kelamin</p>
                    <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>👦 {anakSaya.jenis_kelamin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Berat Lahir</p>
                    <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.berat_lahir}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
                    <Ruler className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Panjang Lahir</p>
                    <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.panjang_lahir}</p>
                  </div>
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
            <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
              <Scale className="w-6 h-6 text-sky-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-sky-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.bb}</p>
              <p className="text-sm text-sky-500">kg</p>
              <p className="text-xs text-stone-400 mt-2">Berat Badan</p>
            </div>
            <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Ruler className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.tb}</p>
              <p className="text-sm text-emerald-500">cm</p>
              <p className="text-xs text-stone-400 mt-2">Tinggi Badan</p>
            </div>
            <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
              <CircleDot className="w-6 h-6 text-violet-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-violet-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.lk}</p>
              <p className="text-sm text-violet-500">cm</p>
              <p className="text-xs text-stone-400 mt-2">Lingkar Kepala</p>
            </div>
            <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
              <Heart className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.lila}</p>
              <p className="text-sm text-amber-500">cm</p>
              <p className="text-xs text-stone-400 mt-2">Lingkar Lengan</p>
            </div>
          </div>
          <p className="text-center text-sm text-stone-400 mt-5">Terakhir diukur: {dataTerakhir.tanggal}</p>
        </CardContent>
      </Card>
    </div>
  );
}
