"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Brain, ChevronLeft, ChevronRight, Sparkles, Check, AlertTriangle, Edit3, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Textarea, Avatar, StatusBadge, Modal, Spinner } from "@/components/ui";
import { FormPemeriksaan } from "@/components/forms";
import { recordsService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { RecordPemeriksaan, ResponPaginasi } from "@/types";

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusFromPrediction(prediction?: { status_gizi?: string; hasil_prediksi?: string } | null): string {
  if (!prediction) return "";
  return prediction.status_gizi || prediction.hasil_prediksi || "";
}

function statusFromPrediction(prediction?: { status_gizi?: string; hasil_prediksi?: string } | null): string {
  const status = getStatusFromPrediction(prediction);
  if (!status) return "normal";
  
  const lower = status.toLowerCase();
  if (lower === "error" || lower === "gagal") return "kuning";
  if (lower.includes("buruk") || lower.includes("stunting") || lower.includes("sangat kurang")) return "merah";
  if (lower.includes("kurang")) return "kuning";
  if (lower.includes("lebih") || lower.includes("obesitas")) return "kuning";
  if (lower.includes("baik") || lower.includes("normal") || lower.includes("sehat")) return "normal";
  return "kuning";
}

function formatHasilPrediksi(prediction?: { status_gizi?: string; hasil_prediksi?: string } | null): string {
  const status = getStatusFromPrediction(prediction);
  if (!status) return "Belum dianalisis";
  
  const lower = status.toLowerCase();
  if (lower === "error" || lower === "gagal") return "⚠️ Terjadi kesalahan saat analisis";
  if (lower.includes("baik") || lower.includes("normal") || lower.includes("sehat")) return "✅ Gizi Baik";
  if (lower.includes("kurang") && !lower.includes("sangat")) return "⚠️ Gizi Kurang";
  if (lower.includes("buruk") || lower.includes("stunting") || lower.includes("sangat kurang")) return "🚨 Gizi Buruk / Stunting";
  if (lower.includes("lebih") || lower.includes("obesitas")) return "⚠️ Gizi Lebih";
  return status;
}

const STATUS_OPTIONS = [
  { value: "Gizi Baik", label: "✅ Gizi Baik" },
  { value: "Gizi Kurang", label: "⚠️ Gizi Kurang" },
  { value: "Gizi Buruk", label: "🚨 Gizi Buruk" },
  { value: "Gizi Lebih", label: "⚠️ Gizi Lebih" },
];

export default function PemeriksaanPage() {
  const { tampilkanSukses, tampilkanError, tampilkanInfo } = pakeToast();
  const [data, setData] = useState<RecordPemeriksaan[]>([]);
  const [meta, setMeta] = useState<ResponPaginasi<RecordPemeriksaan>["meta"] | null>(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [halaman, setHalaman] = useState(1);
  
  // Form modal menggunakan komponen global
  const [showForm, setShowForm] = useState(false);

  // Modal untuk melihat detail
  const [modalBuka, setModalBuka] = useState(false);
  const [recordTerpilih, setRecordTerpilih] = useState<RecordPemeriksaan | null>(null);

  // Modal untuk konfirmasi AI (Human-in-the-Loop)
  const [modalKonfirmasi, setModalKonfirmasi] = useState(false);
  const [recordBaru, setRecordBaru] = useState<RecordPemeriksaan | null>(null);
  const [sedangKonfirmasi, setSedangKonfirmasi] = useState(false);
  const [modeKoreksi, setModeKoreksi] = useState(false);
  const [koreksiData, setKoreksiData] = useState({ status: "", catatan: "" });

  // State untuk analisis ulang
  const [sedangAnalisisUlang, setSedangAnalisisUlang] = useState<number | null>(null);

  const muatData = useCallback(async () => {
    setSedangMemuat(true);
    try {
      const result = await recordsService.ambilDaftar({ page: halaman, per_page: 10 });
      const response = result as any;
      
      if (response?.data?.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
        setMeta({
          halaman_sekarang: response.data.current_page || 1,
          halaman_terakhir: response.data.last_page || 1,
          per_halaman: response.data.per_page || 10,
          total: response.data.total || 0,
        });
      } else if (Array.isArray(response?.data)) {
        setData(response.data);
        setMeta(null);
      } else {
        setData([]);
        setMeta(null);
      }
    } catch (error) {
      console.error("API Error:", error);
      tampilkanError("Gagal memuat data pemeriksaan");
      setData([]);
    } finally {
      setSedangMemuat(false);
    }
  }, [halaman, tampilkanError]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  const handleFormSukses = (result: RecordPemeriksaan) => {
    if (result.ai_prediction && !result.ai_prediction.is_verified) {
      setRecordBaru(result);
      setModeKoreksi(false);
      setKoreksiData({ status: "", catatan: "" });
      setModalKonfirmasi(true);
      tampilkanInfo("Hasil AI perlu dikonfirmasi oleh Kader");
    } else {
      muatData();
    }
  };

  // Konfirmasi AI - Terima hasil
  const handleTerimaAI = async () => {
    if (!recordBaru) return;
    
    setSedangKonfirmasi(true);
    try {
      await recordsService.konfirmasiAI(recordBaru.id, { action: "accept" });
      tampilkanSukses("Hasil AI dikonfirmasi! Notifikasi dikirim ke orang tua.");
      setModalKonfirmasi(false);
      setRecordBaru(null);
      muatData();
    } catch (error) {
      console.error("Error konfirmasi AI:", error);
      tampilkanError("Gagal mengkonfirmasi hasil AI");
    } finally {
      setSedangKonfirmasi(false);
    }
  };

  // Konfirmasi AI - Koreksi manual
  const handleKoreksiAI = async () => {
    if (!recordBaru || !koreksiData.status) {
      tampilkanError("Pilih status gizi yang benar");
      return;
    }
    
    setSedangKonfirmasi(true);
    try {
      await recordsService.konfirmasiAI(recordBaru.id, {
        action: "reject",
        manual_status: koreksiData.status,
        manual_notes: koreksiData.catatan || undefined,
      });
      tampilkanSukses("Hasil dikoreksi! Status gizi diubah menjadi: " + koreksiData.status);
      setModalKonfirmasi(false);
      setRecordBaru(null);
      setModeKoreksi(false);
      setKoreksiData({ status: "", catatan: "" });
      muatData();
    } catch (error) {
      console.error("Error koreksi AI:", error);
      tampilkanError("Gagal menyimpan koreksi");
    } finally {
      setSedangKonfirmasi(false);
    }
  };

  const lihatAnalisis = async (record: RecordPemeriksaan) => {
    if (record.ai_prediction) {
      setRecordTerpilih(record);
      setModalBuka(true);
    } else {
      try {
        const detail = await recordsService.ambilDetail(record.id);
        setRecordTerpilih(detail);
        setModalBuka(true);
      } catch {
        tampilkanError("Gagal memuat detail pemeriksaan");
      }
    }
  };

  // Analisis Ulang AI untuk data lama
  const handleAnalisisUlang = async (record: RecordPemeriksaan) => {
    setSedangAnalisisUlang(record.id);
    try {
      const result = await recordsService.analisisUlang(record.id);
      const resultData = (result as any)?.data || result;
      
      if (resultData?.ai_prediction && !resultData.ai_prediction.is_verified) {
        setRecordBaru(resultData);
        setModeKoreksi(false);
        setKoreksiData({ status: "", catatan: "" });
        setModalKonfirmasi(true);
        tampilkanInfo("Hasil AI baru perlu dikonfirmasi");
      } else if (resultData?.ai_prediction) {
        setRecordTerpilih(resultData);
        setModalBuka(true);
        tampilkanSukses("Analisis ulang berhasil!");
      } else {
        const detail = await recordsService.ambilDetail(record.id);
        const detailData = (detail as any)?.data || detail;
        if (detailData?.ai_prediction) {
          setRecordTerpilih(detailData);
          setModalBuka(true);
          tampilkanSukses("Data berhasil diperbarui!");
        } else {
          tampilkanInfo("Data diperbarui, namun tidak ada hasil AI baru.");
        }
      }
      muatData();
    } catch (error: any) {
      console.error("Error analisis ulang:", error);
      const pesan = error?.pesan || error?.message || "";
      
      if (pesan.includes("could not be found") || error?.status === 404) {
        tampilkanError("Endpoint analisis ulang belum tersedia di backend.");
      } else if (pesan.includes("validation") || error?.status === 422) {
        tampilkanError("Data tidak valid untuk dianalisis ulang.");
      } else {
        tampilkanError("Gagal melakukan analisis ulang.");
      }
    } finally {
      setSedangAnalisisUlang(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>Pemeriksaan</h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">Catat hasil penimbangan dan pengukuran balita</p>
        </div>
        <Button variant="success" onClick={() => setShowForm(true)} className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Input Pemeriksaan
        </Button>
      </div>

      {/* Form Pemeriksaan Modal (Global Component) */}
      <FormPemeriksaan 
        buka={showForm} 
        onTutup={() => setShowForm(false)}
        onSukses={handleFormSukses}
      />

      {/* Daftar Pemeriksaan */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent>
          {sedangMemuat ? (
            <div className="flex items-center justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 mx-auto text-stone-300 mb-4" />
              <p className="text-stone-500">Belum ada data pemeriksaan</p>
              <Button variant="primary" className="mt-4" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Pemeriksaan Pertama
              </Button>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {data.map((p) => (
                  <div key={p.id} className="p-4 bg-stone-50 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.child?.nama_anak || "?"} size="sm" jenisKelamin={p.child?.jenis_kelamin as "L" | "P"} />
                        <div>
                          <p className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                            {p.child?.nama_anak || "Anak tidak ditemukan"}
                          </p>
                          <p className="text-xs text-stone-500">{formatTanggal(p.created_at || p.tanggal_periksa || "")}</p>
                        </div>
                      </div>
                      <StatusBadge status={statusFromPrediction(p.ai_prediction)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div className="bg-white p-2 rounded-lg text-center">
                        <p className="text-stone-500 text-xs">BB</p>
                        <p className="font-semibold text-stone-800">{p.berat_badan} kg</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center">
                        <p className="text-stone-500 text-xs">TB</p>
                        <p className="font-semibold text-stone-800">{p.tinggi_badan} cm</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => lihatAnalisis(p)}>
                        <Brain className="w-3 h-3 mr-1" /> Lihat
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 text-xs text-amber-600 hover:bg-amber-50" 
                        onClick={() => handleAnalisisUlang(p)}
                        disabled={sedangAnalisisUlang === p.id}
                      >
                        {sedangAnalisisUlang === p.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <><RefreshCw className="w-3 h-3 mr-1" /> Ulang</>
                        )}
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
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Tanggal</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Balita</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">BB</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">TB</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LK</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">LILA</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-stone-500">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((p) => (
                      <tr key={p.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                        <td className="py-4 px-4 text-sm text-stone-600">{formatTanggal(p.created_at || p.tanggal_periksa || "")}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={p.child?.nama_anak || "?"} size="sm" jenisKelamin={p.child?.jenis_kelamin as "L" | "P"} />
                            <span className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                              {p.child?.nama_anak || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-stone-600">{p.berat_badan} kg</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{p.tinggi_badan} cm</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{p.lingkar_kepala || "-"} cm</td>
                        <td className="py-4 px-4 text-sm text-stone-600">{p.lingkar_lengan || "-"} cm</td>
                        <td className="py-4 px-4">
                          <StatusBadge status={statusFromPrediction(p.ai_prediction)} />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-violet-600 hover:bg-violet-50" onClick={() => lihatAnalisis(p)}>
                              <Brain className="w-4 h-4 mr-1" />
                              Lihat
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-amber-600 hover:bg-amber-50" 
                              onClick={() => handleAnalisisUlang(p)}
                              disabled={sedangAnalisisUlang === p.id}
                            >
                              {sedangAnalisisUlang === p.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <><RefreshCw className="w-4 h-4 mr-1" /> Ulang</>
                              )}
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-stone-100">
              <p className="text-xs md:text-sm text-stone-500">
                Menampilkan {data.length} dari {meta.total} pemeriksaan
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={halaman <= 1} onClick={() => setHalaman(h => h - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1.5 rounded-xl bg-violet-50 text-violet-600 font-semibold text-xs">
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

      {/* Modal Analisis AI */}
      <Modal buka={modalBuka} onTutup={() => setModalBuka(false)} judul="Hasil Analisis AI" ukuran="lg">
        {recordTerpilih && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl">
              <Avatar name={recordTerpilih.child?.nama_anak || "?"} size="lg" jenisKelamin={recordTerpilih.child?.jenis_kelamin as "L" | "P"} />
              <div>
                <h3 className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {recordTerpilih.child?.nama_anak || "Anak"}
                </h3>
                <p className="text-sm text-stone-500">
                  Pemeriksaan: {formatTanggal(recordTerpilih.created_at || recordTerpilih.tanggal_periksa || "")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-800">{recordTerpilih.berat_badan}</p>
                <p className="text-xs text-stone-500">Berat (kg)</p>
              </div>
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-800">{recordTerpilih.tinggi_badan}</p>
                <p className="text-xs text-stone-500">Tinggi (cm)</p>
              </div>
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-800">{recordTerpilih.lingkar_kepala || "-"}</p>
                <p className="text-xs text-stone-500">LK (cm)</p>
              </div>
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-800">{recordTerpilih.lingkar_lengan || "-"}</p>
                <p className="text-xs text-stone-500">LILA (cm)</p>
              </div>
            </div>

            {recordTerpilih.ai_prediction ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  <h4 className="font-semibold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Hasil Prediksi AI
                  </h4>
                </div>
                
                {recordTerpilih.ai_prediction.hasil_prediksi?.toLowerCase() === "error" ? (
                  <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">⚠️</span>
                      <span className="text-lg font-semibold text-amber-800">Terjadi Kesalahan</span>
                    </div>
                    <p className="text-sm text-amber-700">
                      Analisis AI tidak dapat memproses data ini. Kemungkinan penyebab:
                    </p>
                    <ul className="text-sm text-amber-700 mt-2 list-disc list-inside space-y-1">
                      <li>Data pengukuran tidak valid atau di luar rentang normal</li>
                      <li>Layanan AI sedang mengalami gangguan</li>
                      <li>Data anak tidak lengkap (tanggal lahir, jenis kelamin)</li>
                    </ul>
                  </div>
                ) : (
                  <div className="p-4 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-stone-600">Status Gizi:</span>
                      <StatusBadge status={statusFromPrediction(recordTerpilih.ai_prediction)} />
                    </div>
                    <p className="text-lg font-semibold text-violet-800">
                      {formatHasilPrediksi(recordTerpilih.ai_prediction)}
                    </p>
                  </div>
                )}

                <div className={`p-4 rounded-xl border ${
                  recordTerpilih.ai_prediction.hasil_prediksi?.toLowerCase() === "error" 
                    ? "bg-stone-50 border-stone-200" 
                    : "bg-emerald-50 border-emerald-100"
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    recordTerpilih.ai_prediction.hasil_prediksi?.toLowerCase() === "error"
                      ? "text-stone-700"
                      : "text-emerald-800"
                  }`}>💡 Saran:</p>
                  <p className={`text-sm ${
                    recordTerpilih.ai_prediction.hasil_prediksi?.toLowerCase() === "error"
                      ? "text-stone-600"
                      : "text-emerald-700"
                  }`}>
                    {recordTerpilih.ai_prediction.saran || "Tidak ada saran khusus. Lanjutkan pemeriksaan rutin."}
                  </p>
                </div>

                {recordTerpilih.ai_prediction.z_score_bb_u && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-sky-50 rounded-xl">
                      <p className="text-lg font-bold text-sky-700">{recordTerpilih.ai_prediction.z_score_bb_u?.toFixed(2)}</p>
                      <p className="text-xs text-sky-600">Z-Score BB/U</p>
                    </div>
                    <div className="text-center p-3 bg-sky-50 rounded-xl">
                      <p className="text-lg font-bold text-sky-700">{recordTerpilih.ai_prediction.z_score_tb_u?.toFixed(2)}</p>
                      <p className="text-xs text-sky-600">Z-Score TB/U</p>
                    </div>
                    <div className="text-center p-3 bg-sky-50 rounded-xl">
                      <p className="text-lg font-bold text-sky-700">{recordTerpilih.ai_prediction.z_score_bb_tb?.toFixed(2)}</p>
                      <p className="text-xs text-sky-600">Z-Score BB/TB</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500">
                <Brain className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                <p>Belum ada hasil analisis AI</p>
              </div>
            )}

            <div className="pt-4 border-t border-stone-100">
              <Button variant="outline" className="w-full" onClick={() => setModalBuka(false)}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Konfirmasi AI (Human-in-the-Loop) */}
      <Modal 
        buka={modalKonfirmasi} 
        onTutup={() => {
          if (!sedangKonfirmasi) {
            setModalKonfirmasi(false);
            setRecordBaru(null);
          }
        }} 
        judul="⚡ Konfirmasi Hasil AI" 
        ukuran="lg"
      >
        {recordBaru && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800">Konfirmasi Diperlukan</p>
                <p className="text-sm text-amber-700 mt-1">
                  Hasil AI belum terverifikasi. Periksa hasil analisis di bawah dan pilih tindakan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl">
              <Avatar name={recordBaru.child?.nama_anak || "?"} size="lg" jenisKelamin={recordBaru.child?.jenis_kelamin as "L" | "P"} />
              <div>
                <h3 className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                  {recordBaru.child?.nama_anak || "Anak"}
                </h3>
                <p className="text-sm text-stone-500">
                  BB: {recordBaru.berat_badan} kg • TB: {recordBaru.tinggi_badan} cm
                </p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-semibold text-violet-800">Hasil Prediksi AI:</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-violet-800">
                  {formatHasilPrediksi(recordBaru.ai_prediction)}
                </p>
                <StatusBadge status={statusFromPrediction(recordBaru.ai_prediction)} />
              </div>
              {recordBaru.ai_prediction?.saran && (
                <p className="text-sm text-violet-700 mt-3 p-3 bg-white/50 rounded-lg">
                  💡 {recordBaru.ai_prediction.saran}
                </p>
              )}
            </div>

            {modeKoreksi && (
              <div className="p-4 bg-stone-50 rounded-xl space-y-4 border-2 border-dashed border-stone-200">
                <div className="flex items-center gap-2 text-stone-700">
                  <Edit3 className="w-4 h-4" />
                  <span className="font-semibold">Koreksi Manual</span>
                </div>
                <Select
                  label="Status Gizi yang Benar"
                  options={STATUS_OPTIONS}
                  placeholder="Pilih status gizi..."
                  value={koreksiData.status}
                  onChange={(e) => setKoreksiData({ ...koreksiData, status: e.target.value })}
                />
                <Textarea
                  label="Alasan Koreksi (opsional)"
                  placeholder="Jelaskan alasan koreksi..."
                  rows={2}
                  value={koreksiData.catatan}
                  onChange={(e) => setKoreksiData({ ...koreksiData, catatan: e.target.value })}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
              {!modeKoreksi ? (
                <>
                  <Button 
                    variant="success" 
                    className="flex-1" 
                    onClick={handleTerimaAI}
                    disabled={sedangKonfirmasi}
                  >
                    {sedangKonfirmasi ? <Spinner size="sm" /> : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Terima Hasil AI
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setModeKoreksi(true)}
                    disabled={sedangKonfirmasi}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Koreksi Manual
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="primary" 
                    className="flex-1" 
                    onClick={handleKoreksiAI}
                    disabled={sedangKonfirmasi || !koreksiData.status}
                  >
                    {sedangKonfirmasi ? <Spinner size="sm" /> : "Simpan Koreksi"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setModeKoreksi(false);
                      setKoreksiData({ status: "", catatan: "" });
                    }}
                    disabled={sedangKonfirmasi}
                  >
                    Batal
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
