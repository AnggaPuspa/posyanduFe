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

const dataTerakhir = { bb: 10.2, tb: 78, lk: 44, lila: 13, tanggal: "9 Des 2024" };

export default function AnakSayaPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Hidden on mobile */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Anak Saya</h1>
        <p className="text-stone-500 mt-1">Profil lengkap dan data perkembangan anak</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 md:gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center shrink-0">
              <Avatar name={anakSaya.nama} size="xl" className="h-20 w-20 md:h-32 md:w-32 text-2xl md:text-4xl rounded-2xl md:rounded-3xl" />
              <div className="mt-3 md:mt-4">
                <StatusBadge status={anakSaya.status} />
              </div>
            </div>
            
            {/* Info Grid */}
            <div className="flex-1 w-full">
              <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-3 md:mb-5" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.nama}</h2>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Tanggal Lahir</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.tanggal_lahir}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Baby className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Jenis Kelamin</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>👦 Laki</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Scale className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Berat Lahir</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.berat_lahir}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-stone-50">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-sm md:shadow-md shrink-0">
                    <Ruler className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] md:text-xs text-stone-400">Panjang Lahir</p>
                    <p className="font-semibold text-xs md:text-base text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anakSaya.panjang_lahir}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Data */}
      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <CardTitle className="text-base md:text-lg">Data Pengukuran Terakhir</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 md:pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
              <Scale className="w-5 h-5 md:w-6 md:h-6 text-sky-500 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-3xl font-bold text-sky-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.bb}</p>
              <p className="text-xs md:text-sm text-sky-500">kg</p>
              <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Berat Badan</p>
            </div>
            <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Ruler className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-3xl font-bold text-emerald-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.tb}</p>
              <p className="text-xs md:text-sm text-emerald-500">cm</p>
              <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Tinggi Badan</p>
            </div>
            <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
              <CircleDot className="w-5 h-5 md:w-6 md:h-6 text-violet-500 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-3xl font-bold text-violet-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.lk}</p>
              <p className="text-xs md:text-sm text-violet-500">cm</p>
              <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Lingkar Kepala</p>
            </div>
            <div className="text-center p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-amber-500 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-3xl font-bold text-amber-600" style={{ fontFamily: 'var(--font-nunito)' }}>{dataTerakhir.lila}</p>
              <p className="text-xs md:text-sm text-amber-500">cm</p>
              <p className="text-[10px] md:text-xs text-stone-400 mt-1 md:mt-2">Lingkar Lengan</p>
            </div>
          </div>
          <p className="text-center text-[11px] md:text-sm text-stone-400 mt-3 md:mt-5">Terakhir diukur: {dataTerakhir.tanggal}</p>
        </CardContent>
      </Card>
    </div>
  );
}
