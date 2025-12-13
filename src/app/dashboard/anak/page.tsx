"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Baby, Calendar, User, TrendingUp, QrCode, X } from "lucide-react";
import { Card, CardContent, Button, Input, Avatar, StatusBadge, Modal, Spinner } from "@/components/ui";
import { GrafikPertumbuhan } from "@/components/charts";
import { FormTambahAnak, FormTambahKeluarga } from "@/components/forms";
import { childrenService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { Anak, ResponPaginasi } from "@/types";

function hitungUmur(tanggal: string) {
  const lahir = new Date(tanggal);
  const sekarang = new Date();
  const bulan = (sekarang.getFullYear() - lahir.getFullYear()) * 12 + (sekarang.getMonth() - lahir.getMonth());
  if (bulan < 12) return `${bulan} bulan`;
  const tahun = Math.floor(bulan / 12);
  const sisaBulan = bulan % 12;
  return `${tahun} tahun ${sisaBulan} bulan`;
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DataAnakPage() {
  const { tampilkanSukses, tampilkanError } = pakeToast();
  const [data, setData] = useState<Anak[]>([]);
  const [meta, setMeta] = useState<ResponPaginasi<Anak>["meta"] | null>(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [cari, setCari] = useState("");
  const [halaman, setHalaman] = useState(1);
  
  // Modal detail
  const [modalBuka, setModalBuka] = useState(false);
  const [anakTerpilih, setAnakTerpilih] = useState<Anak | null>(null);
  
  // Modal QR Code
  const [modalQRBuka, setModalQRBuka] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [sedangMemuatQR, setSedangMemuatQR] = useState(false);

  // Form tambah anak (menggunakan komponen global)
  const [modalTambahAnak, setModalTambahAnak] = useState(false);
  
  // Form tambah keluarga
  const [modalTambahKeluarga, setModalTambahKeluarga] = useState(false);

  const muatData = useCallback(async () => {
    setSedangMemuat(true);
    try {
      const result = cari.trim() 
        ? await childrenService.cari({ q: cari, page: halaman, per_page: 10 })
        : await childrenService.ambilDaftar({ page: halaman, per_page: 10 });
      
      const response = result as any;
      
      if (response?.data?.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
        setMeta({
          halaman_sekarang: response.data.current_page || 1,
          halaman_terakhir: response.data.last_page || Math.ceil((response.data.total || 0) / (response.data.per_page || 10)),
          per_halaman: response.data.per_page || 10,
          total: response.data.total || 0,
        });
      } else if (Array.isArray(response?.data)) {
        // Format: { data: [...] }
        setData(response.data);
        setMeta(null);
      } else if (Array.isArray(response)) {
        // Format langsung array
        setData(response);
        setMeta(null);
      } else {
        setData([]);
        setMeta(null);
      }
    } catch (error) {
      console.error("API Error:", error);
      tampilkanError("Gagal memuat data balita");
      setData([]);
    } finally {
      setSedangMemuat(false);
    }
  }, [cari, halaman, tampilkanError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      muatData();
    }, cari ? 500 : 0);
    return () => clearTimeout(timer);
  }, [muatData, cari]);

  const bukaDetail = (anak: Anak) => {
    setAnakTerpilih(anak);
    setModalBuka(true);
  };

  const tutupModal = () => {
    setModalBuka(false);
    setAnakTerpilih(null);
  };

  const bukaQRCode = async (anak: Anak) => {
    setAnakTerpilih(anak);
    setModalQRBuka(true);
    setSedangMemuatQR(true);
    try {
      const qr = await childrenService.ambilQRCode(anak.id);
      setQrCode(qr);
    } catch {
      tampilkanError("Gagal memuat QR Code");
    } finally {
      setSedangMemuatQR(false);
    }
  };

  const tutupQR = () => {
    setModalQRBuka(false);
    setQrCode(null);
    setAnakTerpilih(null);
  };

  const hapusAnak = async (anak: Anak) => {
    if (!confirm(`Yakin ingin menghapus data ${anak.nama_anak}?`)) return;
    try {
      await childrenService.hapus(anak.id);
      tampilkanSukses("Data balita berhasil dihapus");
      muatData();
    } catch {
      tampilkanError("Gagal menghapus data balita");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Data Balita</h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">Kelola data balita yang terdaftar di Posyandu</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setModalTambahKeluarga(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Tambah Keluarga
          </Button>
          <Button className="w-full sm:w-auto" onClick={() => setModalTambahAnak(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Tambah Balita
          </Button>
        </div>
      </div>

      {/* Form Tambah Keluarga Modal */}
      <FormTambahKeluarga 
        buka={modalTambahKeluarga} 
        onTutup={() => setModalTambahKeluarga(false)}
        onSukses={() => {
          muatData();
        }}
      />

      {/* Form Tambah Anak Modal (Global Component) */}
      <FormTambahAnak 
        buka={modalTambahAnak} 
        onTutup={() => setModalTambahAnak(false)}
        onSukses={() => {
          muatData();
        }}
      />

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex-1">
              <Input
                placeholder="Cari nama atau NIK..."
                value={cari}
                onChange={(e) => { setCari(e.target.value); setHalaman(1); }}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {sedangMemuat ? (
            <div className="flex items-center justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Baby className="w-12 h-12 mx-auto mb-3 text-stone-300" />
              <p>Belum ada data balita</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {data.map((anak) => (
                  <div key={anak.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={anak.nama_anak} size="md" jenisKelamin={anak.jenis_kelamin as "L" | "P"} />
                        <div>
                          <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anak.nama_anak}</p>
                          <p className="text-xs text-stone-500">{hitungUmur(anak.tanggal_lahir)} • {anak.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</p>
                        </div>
                      </div>
                      <StatusBadge status={anak.status_gizi || "normal"} />
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Keluarga</span>
                        <span className="text-stone-700">{anak.family?.nama_kepala_keluarga || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">NIK</span>
                        <span className="text-stone-700 font-mono text-xs">{anak.nik ? anak.nik.slice(-8) : "-"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-200">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => bukaDetail(anak)}>
                        <Eye className="w-3 h-3 mr-1" /> Detail
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => bukaQRCode(anak)}>
                        <QrCode className="w-3 h-3 mr-1" /> QR
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Balita</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">NIK</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Umur</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Jenis Kelamin</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Keluarga</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((anak) => (
                      <tr key={anak.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={anak.nama_anak} size="md" jenisKelamin={anak.jenis_kelamin as "L" | "P"} />
                            <span className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>{anak.nama_anak}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-stone-600 font-mono">{anak.nik || "-"}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{hitungUmur(anak.tanggal_lahir)}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{anak.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{anak.family?.nama_kepala_keluarga || "-"}</td>
                        <td className="py-4 px-4"><StatusBadge status={anak.status_gizi || "normal"} /></td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-sky-500 hover:bg-sky-50" onClick={() => bukaDetail(anak)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-purple-500 hover:bg-purple-50" onClick={() => bukaQRCode(anak)}>
                              <QrCode className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-amber-500 hover:bg-amber-50">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50" onClick={() => hapusAnak(anak)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {meta && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 md:mt-6 pt-4 border-t border-stone-100">
              <p className="text-xs md:text-sm text-stone-500">
                Menampilkan {data.length} dari {meta.total} balita
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={halaman <= 1} onClick={() => setHalaman(h => h - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-amber-50 text-amber-600 font-semibold text-xs md:text-sm">
                  {halaman} / {meta.halaman_terakhir}
                </span>
                <Button variant="outline" size="sm" disabled={halaman >= meta.halaman_terakhir} onClick={() => setHalaman(h => h + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Detail Anak */}
      <Modal buka={modalBuka} onTutup={tutupModal} judul="Detail Balita" ukuran="xl">
        {anakTerpilih && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
              <Avatar name={anakTerpilih.nama_anak} size="lg" jenisKelamin={anakTerpilih.jenis_kelamin as "L" | "P"} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                    {anakTerpilih.nama_anak}
                  </h3>
                  <StatusBadge status={anakTerpilih.status_gizi || "normal"} />
                </div>
                <p className="text-stone-500 text-sm">
                  {anakTerpilih.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"} • {hitungUmur(anakTerpilih.tanggal_lahir)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                  <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center">
                    <Baby className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">NIK</p>
                    <p className="font-mono text-sm text-stone-800">{anakTerpilih.nik || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                  <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Tanggal Lahir</p>
                    <p className="text-sm text-stone-800">{formatTanggal(anakTerpilih.tanggal_lahir)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                  <div className="h-10 w-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Kepala Keluarga</p>
                    <p className="text-sm text-stone-800">{anakTerpilih.family?.nama_kepala_keluarga || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                  <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Berat/Tinggi Lahir</p>
                    <p className="text-sm text-stone-800">{anakTerpilih.berat_lahir || "-"} kg / {anakTerpilih.tinggi_lahir || "-"} cm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                  Grafik Pertumbuhan
                </h4>
              </div>
              <GrafikPertumbuhan anakId={anakTerpilih.id} />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              <Button variant="outline" className="flex-1" onClick={tutupModal}>
                Tutup
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => { tutupModal(); bukaQRCode(anakTerpilih); }}>
                <QrCode className="w-4 h-4 mr-2" />
                Lihat QR
              </Button>
              <Button className="flex-1">
                <Pencil className="w-4 h-4 mr-2" />
                Edit Data
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal QR Code */}
      <Modal buka={modalQRBuka} onTutup={tutupQR} judul="QR Code Balita" ukuran="sm">
        {anakTerpilih && (
          <div className="text-center space-y-4">
            <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
              {anakTerpilih.nama_anak}
            </p>
            {sedangMemuatQR ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : qrCode ? (
              <div className="mx-auto p-4 bg-white rounded-2xl border border-stone-200">
                {qrCode.startsWith("blob:") || qrCode.startsWith("http") || qrCode.startsWith("data:") ? (
                  <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
                ) : qrCode.startsWith("<svg") || qrCode.startsWith("<?xml") ? (
                  <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                ) : (
                  <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
                )}
              </div>
            ) : (
              <p className="text-stone-500 py-8">Gagal memuat QR Code</p>
            )}
            <p className="text-sm text-stone-500">
              Scan QR code ini untuk melihat data anak
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
