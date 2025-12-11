"use client";

import { useState, useEffect, useCallback } from "react";
import { Scale, Ruler, CircleDot, Sparkles } from "lucide-react";
import { Button, Input, Select, Textarea, Modal, Spinner } from "@/components/ui";
import { recordsService, childrenService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { RecordPemeriksaan, Anak } from "@/types";

interface FormPemeriksaanProps {
  buka: boolean;
  onTutup: () => void;
  onSukses?: (result: RecordPemeriksaan) => void;
  childIdDefault?: number;
}

export function FormPemeriksaan({ buka, onTutup, onSukses, childIdDefault }: FormPemeriksaanProps) {
  const { tampilkanSukses, tampilkanError } = pakeToast();
  const [sedangSimpan, setSedangSimpan] = useState(false);
  const [daftarAnak, setDaftarAnak] = useState<Anak[]>([]);
  const [sedangMuatAnak, setSedangMuatAnak] = useState(false);

  const [formData, setFormData] = useState({
    child_id: childIdDefault ? String(childIdDefault) : "",
    tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
    berat_badan: "",
    tinggi_badan: "",
    lingkar_kepala: "",
    lingkar_lengan: "",
    catatan: "",
  });

  useEffect(() => {
    if (buka) {
      setFormData({
        child_id: childIdDefault ? String(childIdDefault) : "",
        tanggal_pemeriksaan: new Date().toISOString().split('T')[0],
        berat_badan: "",
        tinggi_badan: "",
        lingkar_kepala: "",
        lingkar_lengan: "",
        catatan: "",
      });
    }
  }, [buka, childIdDefault]);

  const muatDaftarAnak = useCallback(async () => {
    if (childIdDefault) return;
    
    setSedangMuatAnak(true);
    try {
      const result = await childrenService.ambilDaftar({ per_page: 100 });
      const response = result as any;
      if (response?.data?.data && Array.isArray(response.data.data)) {
        setDaftarAnak(response.data.data);
      } else if (Array.isArray(response?.data)) {
        setDaftarAnak(response.data);
      }
    } catch (error) {
      console.error("Gagal memuat daftar anak:", error);
    } finally {
      setSedangMuatAnak(false);
    }
  }, [childIdDefault]);

  useEffect(() => {
    if (buka && !childIdDefault) {
      muatDaftarAnak();
    }
  }, [buka, childIdDefault, muatDaftarAnak]);

  const handleSubmit = async () => {
    if (!formData.child_id || !formData.berat_badan || !formData.tinggi_badan || !formData.tanggal_pemeriksaan) {
      tampilkanError("Lengkapi data balita, tanggal, berat badan, dan tinggi badan");
      return;
    }

    setSedangSimpan(true);
    try {
      const result = await recordsService.buat({
        child_id: parseInt(formData.child_id),
        tanggal_pemeriksaan: formData.tanggal_pemeriksaan,
        berat_badan: parseFloat(formData.berat_badan),
        tinggi_badan: parseFloat(formData.tinggi_badan),
        lingkar_kepala: formData.lingkar_kepala ? parseFloat(formData.lingkar_kepala) : undefined,
        lingkar_lengan: formData.lingkar_lengan ? parseFloat(formData.lingkar_lengan) : undefined,
        catatan: formData.catatan || undefined,
      });

      tampilkanSukses("Pemeriksaan berhasil disimpan!");
      
      if (onSukses) {
        onSukses(result);
      }
      
      onTutup();
    } catch (error: any) {
      console.error("Error simpan pemeriksaan:", error);
      tampilkanError(error?.pesan || "Gagal menyimpan pemeriksaan");
    } finally {
      setSedangSimpan(false);
    }
  };

  const anakOptions = daftarAnak.map(anak => ({
    value: String(anak.id),
    label: anak.nik 
      ? `${anak.nama_anak} (${anak.nik.slice(-4)})` 
      : anak.nama_anak,
  }));

  return (
    <Modal buka={buka} onTutup={onTutup} judul="Form Pemeriksaan Baru" ukuran="xl">
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-3">
          {!childIdDefault ? (
            <Select 
              label="Pilih Balita" 
              options={anakOptions} 
              placeholder={sedangMuatAnak ? "Memuat..." : "Pilih balita..."}
              value={formData.child_id}
              onChange={(e) => setFormData({ ...formData, child_id: e.target.value })}
              disabled={sedangMuatAnak}
            />
          ) : (
            <div className="flex items-center gap-2 p-3 bg-violet-50 rounded-xl">
              <span className="text-sm text-violet-700">Anak sudah dipilih</span>
            </div>
          )}
          <Input 
            label="Tanggal Pemeriksaan" 
            type="date"
            value={formData.tanggal_pemeriksaan}
            onChange={(e) => setFormData({ ...formData, tanggal_pemeriksaan: e.target.value })}
          />
          <Input 
            label="Berat Badan (kg)" 
            type="number" 
            placeholder="10.5" 
            icon={<Scale className="w-4 h-4" />}
            value={formData.berat_badan}
            onChange={(e) => setFormData({ ...formData, berat_badan: e.target.value })}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Input 
            label="Tinggi Badan (cm)" 
            type="number" 
            placeholder="78" 
            icon={<Ruler className="w-4 h-4" />}
            value={formData.tinggi_badan}
            onChange={(e) => setFormData({ ...formData, tinggi_badan: e.target.value })}
          />
          <Input 
            label="Lingkar Kepala (cm)" 
            type="number" 
            placeholder="44" 
            icon={<CircleDot className="w-4 h-4" />}
            value={formData.lingkar_kepala}
            onChange={(e) => setFormData({ ...formData, lingkar_kepala: e.target.value })}
          />
          <Input 
            label="LILA (cm)" 
            type="number" 
            placeholder="13" 
            value={formData.lingkar_lengan}
            onChange={(e) => setFormData({ ...formData, lingkar_lengan: e.target.value })}
          />
        </div>

        <Textarea
          label="Catatan"
          placeholder="Catatan tambahan..."
          rows={3}
          value={formData.catatan}
          onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
          <Button 
            variant="success" 
            className="flex-1" 
            onClick={handleSubmit}
            disabled={sedangSimpan}
          >
            {sedangSimpan ? (
              <Spinner size="sm" />
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Simpan & Analisis AI
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onTutup} disabled={sedangSimpan}>
            Batal
          </Button>
        </div>
      </div>
    </Modal>
  );
}
