"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Calendar, Scale, Ruler, Home, Save } from "lucide-react";
import { Button, Input, Select, Modal, Spinner } from "@/components/ui";
import { childrenService, familyService } from "@/services";
import type { Family } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { Anak } from "@/types";

interface FormEditAnakProps {
  buka: boolean;
  onTutup: () => void;
  anak: Anak | null;
  onSukses?: (anak: Anak) => void;
}

const JENIS_KELAMIN_OPTIONS = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

export function FormEditAnak({ buka, onTutup, anak, onSukses }: FormEditAnakProps) {
  const { tampilkanSukses, tampilkanError, tampilkanInfo } = pakeToast();
  const [sedangSimpan, setSedangSimpan] = useState(false);
  const [sedangMuatFamily, setSedangMuatFamily] = useState(false);
  const [daftarFamily, setDaftarFamily] = useState<Family[]>([]);
  const [errorMuatFamily, setErrorMuatFamily] = useState(false);

  const [formData, setFormData] = useState({
    nama_anak: "",
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    berat_lahir: "",
    tinggi_lahir: "",
    family_id: "",
  });


  const muatFamily = useCallback(async () => {
    setSedangMuatFamily(true);
    setErrorMuatFamily(false);
    try {
      const result = await familyService.ambilDaftar();
      const data = (result as any)?.data || result;
      if (Array.isArray(data)) {
        setDaftarFamily(data);
      }
    } catch (error: any) {
      console.error("Error muat family:", error);
      setErrorMuatFamily(true);
      if (error?.status === 401) {
        tampilkanInfo("Sesi mungkin expired. Silakan refresh halaman atau login ulang.");
      }
    } finally {
      setSedangMuatFamily(false);
    }
  }, [tampilkanInfo]);

  useEffect(() => {
    if (buka && anak) {
      setFormData({
        nama_anak: anak.nama_anak || "",
        nik: anak.nik || "",
        tanggal_lahir: anak.tanggal_lahir || "",
        jenis_kelamin: anak.jenis_kelamin || "",
        berat_lahir: anak.berat_lahir?.toString() || "",
        tinggi_lahir: anak.tinggi_lahir?.toString() || "",
        family_id: anak.family_id?.toString() || "",
      });
      muatFamily();
    }
  }, [buka, anak, muatFamily]);

  const handleSubmit = async () => {
    if (!anak) return;
    
    if (!formData.nama_anak || !formData.tanggal_lahir || !formData.jenis_kelamin) {
      tampilkanError("Lengkapi nama, tanggal lahir, dan jenis kelamin");
      return;
    }

    setSedangSimpan(true);
    try {
      const payload = {
        nama_anak: formData.nama_anak,
        nik: formData.nik || undefined,
        tanggal_lahir: formData.tanggal_lahir,
        jenis_kelamin: formData.jenis_kelamin as "L" | "P",
        berat_lahir: formData.berat_lahir ? parseFloat(formData.berat_lahir) : undefined,
        tinggi_lahir: formData.tinggi_lahir ? parseFloat(formData.tinggi_lahir) : undefined,
        family_id: formData.family_id ? parseInt(formData.family_id) : anak.family_id,
      };
      
      const result = await childrenService.update(anak.id, payload);
      const anakData = (result as any)?.data || result;
      
      tampilkanSukses("Data anak berhasil diperbarui!");
      
      if (onSukses) {
        onSukses(anakData);
      }
      
      onTutup();
    } catch (error: any) {
      console.error("Error update anak:", error);
      
      let pesan = "Gagal memperbarui data anak";
      
      if (error?.errors) {
        const errorMessages = Object.entries(error.errors)
          .map(([field, messages]: [string, any]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join("; ");
        pesan = errorMessages || pesan;
      } else if (error?.pesan) {
        pesan = error.pesan;
      } else if (error?.message) {
        pesan = error.message;
      }
      
      tampilkanError(pesan);
    } finally {
      setSedangSimpan(false);
    }
  };

  const familyOptions = daftarFamily.map(f => ({
    value: String(f.id),
    label: f.nama_kepala_keluarga + (f.no_hp ? ` (${f.no_hp.slice(-4)})` : ` - ID: ${f.id}`),
  }));

  if (!anak) return null;


  return (
    <Modal buka={buka} onTutup={onTutup} judul="Edit Data Anak" ukuran="lg">
      <div className="space-y-5">
        <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl">
          {errorMuatFamily ? (
            <Input 
              label="Family ID" 
              type="number"
              placeholder="Masukkan ID keluarga"
              icon={<Home className="w-4 h-4" />}
              value={formData.family_id}
              onChange={(e) => setFormData({ ...formData, family_id: e.target.value })}
            />
          ) : familyOptions.length > 0 ? (
            <>
              <Select 
                label="Keluarga / Orang Tua" 
                options={familyOptions}
                placeholder={sedangMuatFamily ? "Memuat..." : "Pilih keluarga..."}
                value={formData.family_id}
                onChange={(e) => setFormData({ ...formData, family_id: e.target.value })}
              />
              <p className="text-xs text-sky-600 mt-2">
                Ubah keluarga jika diperlukan
              </p>
            </>
          ) : (
            <p className="text-sm text-stone-500">
              {sedangMuatFamily ? "Memuat daftar keluarga..." : "Tidak ada data keluarga"}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input 
            label="Nama Anak" 
            placeholder="Nama lengkap anak"
            icon={<User className="w-4 h-4" />}
            value={formData.nama_anak}
            onChange={(e) => setFormData({ ...formData, nama_anak: e.target.value })}
          />
          <Input 
            label="NIK (opsional)" 
            placeholder="16 digit NIK"
            value={formData.nik}
            onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input 
            label="Tanggal Lahir" 
            type="date"
            icon={<Calendar className="w-4 h-4" />}
            value={formData.tanggal_lahir}
            onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
          />
          <Select 
            label="Jenis Kelamin" 
            options={JENIS_KELAMIN_OPTIONS}
            placeholder="Pilih jenis kelamin..."
            value={formData.jenis_kelamin}
            onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input 
            label="Berat Lahir (kg)" 
            type="number" 
            placeholder="3.2"
            icon={<Scale className="w-4 h-4" />}
            value={formData.berat_lahir}
            onChange={(e) => setFormData({ ...formData, berat_lahir: e.target.value })}
            hint="Opsional"
          />
          <Input 
            label="Tinggi Lahir (cm)" 
            type="number" 
            placeholder="50"
            icon={<Ruler className="w-4 h-4" />}
            value={formData.tinggi_lahir}
            onChange={(e) => setFormData({ ...formData, tinggi_lahir: e.target.value })}
            hint="Opsional"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
          <Button 
            variant="primary" 
            className="flex-1" 
            onClick={handleSubmit}
            disabled={sedangSimpan}
          >
            {sedangSimpan ? (
              <Spinner size="sm" />
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Simpan Perubahan
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
