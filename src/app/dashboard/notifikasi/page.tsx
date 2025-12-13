"use client";

import { useState, useEffect, useCallback } from "react";
import { Megaphone, Plus, Pencil, Trash2, Send, X, FileText, BookOpen, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Modal, Spinner, Badge } from "@/components/ui";
import { broadcastService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { Broadcast, DataBuatBroadcast } from "@/services/broadcast.service";

const TIPE_OPTIONS = [
  { value: "pengumuman", label: "Pengumuman", icon: Bell, color: "from-amber-400 to-orange-500" },
  { value: "artikel", label: "Artikel", icon: FileText, color: "from-sky-400 to-blue-500" },
  { value: "edukasi", label: "Edukasi", icon: BookOpen, color: "from-emerald-400 to-teal-500" },
] as const;

function TipeIcon({ tipe }: { tipe: string }) {
  const config = TIPE_OPTIONS.find((t) => t.value === tipe) || TIPE_OPTIONS[0];
  const Icon = config.icon;
  return (
    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
}

function TipeBadge({ tipe }: { tipe: string }) {
  const config: Record<string, { variant: "warning" | "info" | "success"; label: string }> = {
    pengumuman: { variant: "warning", label: "Pengumuman" },
    artikel: { variant: "info", label: "Artikel" },
    edukasi: { variant: "success", label: "Edukasi" },
  };
  const c = config[tipe] || config.pengumuman;
  return <Badge variant={c.variant}>{c.label}</Badge>;
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotifikasiPage() {
  const { tampilkanSukses, tampilkanError } = pakeToast();
  const [data, setData] = useState<Broadcast[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [modalBuka, setModalBuka] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const [broadcastTerpilih, setBroadcastTerpilih] = useState<Broadcast | null>(null);
  const [sedangKirim, setSedangKirim] = useState(false);

  const [formData, setFormData] = useState<DataBuatBroadcast>({
    judul: "",
    isi: "",
    tipe: "pengumuman",
  });

  const muatData = useCallback(async () => {
    setSedangMemuat(true);
    try {
      const result = await broadcastService.ambilDaftar();
      setData(result);
    } catch {
      tampilkanError("Gagal memuat data broadcast");
    } finally {
      setSedangMemuat(false);
    }
  }, [tampilkanError]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  const bukaModalTambah = () => {
    setFormData({ judul: "", isi: "", tipe: "pengumuman" });
    setModeEdit(false);
    setBroadcastTerpilih(null);
    setModalBuka(true);
  };

  const bukaModalEdit = (broadcast: Broadcast) => {
    setFormData({ judul: broadcast.judul, isi: broadcast.isi, tipe: broadcast.tipe });
    setModeEdit(true);
    setBroadcastTerpilih(broadcast);
    setModalBuka(true);
  };

  const tutupModal = () => {
    setModalBuka(false);
    setBroadcastTerpilih(null);
    setFormData({ judul: "", isi: "", tipe: "pengumuman" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul.trim() || !formData.isi.trim()) {
      tampilkanError("Judul dan isi harus diisi");
      return;
    }

    setSedangKirim(true);
    try {
      if (modeEdit && broadcastTerpilih) {
        await broadcastService.update(broadcastTerpilih.id, {
          judul: formData.judul,
          isi: formData.isi,
        });
        tampilkanSukses("Broadcast berhasil diperbarui");
      } else {
        await broadcastService.buat(formData);
        tampilkanSukses("Broadcast berhasil dikirim ke semua orang tua");
      }
      tutupModal();
      muatData();
    } catch {
      tampilkanError(modeEdit ? "Gagal memperbarui broadcast" : "Gagal mengirim broadcast");
    } finally {
      setSedangKirim(false);
    }
  };

  const handleHapus = async (broadcast: Broadcast) => {
    if (!confirm(`Yakin ingin menghapus broadcast "${broadcast.judul}"? Data akan hilang permanen.`)) return;
    try {
      await broadcastService.hapus(broadcast.id);
      tampilkanSukses("Broadcast berhasil dihapus");
      muatData();
    } catch {
      tampilkanError("Gagal menghapus broadcast");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
            Broadcast
          </h1>
          <p className="text-sm md:text-base text-stone-500 mt-1">
            Kirim pengumuman, artikel, dan edukasi ke semua orang tua
          </p>
        </div>
        <Button onClick={bukaModalTambah} className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Buat Broadcast
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2 md:pb-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base md:text-lg">Riwayat Broadcast</CardTitle>
              <p className="text-xs text-stone-500">{data.length} broadcast terkirim</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 md:pt-6">
          {sedangMemuat ? (
            <div className="flex items-center justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 mx-auto text-stone-200 mb-4" />
              <h3 className="text-lg font-semibold text-stone-700 mb-2">Belum Ada Broadcast</h3>
              <p className="text-stone-500 text-sm mb-4">Buat broadcast pertama untuk menginformasikan orang tua</p>
              <Button onClick={bukaModalTambah}>
                <Plus className="w-4 h-4 mr-2" />
                Buat Broadcast
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="p-4 md:p-5 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    <TipeIcon tipe={broadcast.tipe} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-stone-800 truncate" style={{ fontFamily: 'var(--font-nunito)' }}>
                              {broadcast.judul}
                            </h4>
                            <TipeBadge tipe={broadcast.tipe} />
                          </div>
                          <p className="text-sm text-stone-600 line-clamp-2">{broadcast.isi}</p>
                          <p className="text-xs text-stone-400 mt-2">{formatTanggal(broadcast.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-stone-400 hover:text-amber-500 hover:bg-amber-50"
                            onClick={() => bukaModalEdit(broadcast)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50"
                            onClick={() => handleHapus(broadcast)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal buka={modalBuka} onTutup={tutupModal} judul={modeEdit ? "Edit Broadcast" : "Buat Broadcast Baru"} ukuran="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Tipe Broadcast</label>
            <div className="grid grid-cols-3 gap-2">
              {TIPE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = formData.tipe === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={modeEdit}
                    onClick={() => setFormData((prev) => ({ ...prev, tipe: option.value }))}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-200 hover:border-stone-300"
                    } ${modeEdit ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className={`h-10 w-10 mx-auto rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-2`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${isSelected ? "text-amber-700" : "text-stone-600"}`}>
                      {option.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Judul</label>
            <Input
              value={formData.judul}
              onChange={(e) => setFormData((prev) => ({ ...prev, judul: e.target.value }))}
              placeholder="Contoh: Jadwal Posyandu Bulan Desember"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Isi Pesan</label>
            <textarea
              value={formData.isi}
              onChange={(e) => setFormData((prev) => ({ ...prev, isi: e.target.value }))}
              placeholder="Tulis isi pesan lengkap di sini..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none text-sm"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
            <Button type="button" variant="outline" className="flex-1" onClick={tutupModal} disabled={sedangKirim}>
              <X className="w-4 h-4 mr-2" />
              Batal
            </Button>
            <Button type="submit" className="flex-1" disabled={sedangKirim}>
              {sedangKirim ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {modeEdit ? "Simpan Perubahan" : "Kirim Broadcast"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
