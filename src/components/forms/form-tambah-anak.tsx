"use client";

import { useState, useEffect } from "react";
import { User, Calendar, Scale, Ruler, Users } from "lucide-react";
import { Button, Input, Select, Modal, Spinner } from "@/components/ui";
import { childrenService } from "@/services";
import { pakeToast } from "@/components/providers/toast-provider";
import type { Anak } from "@/types";

interface FormTambahAnakProps {
  buka: boolean;
  onTutup: () => void;
  onSukses?: (anak: Anak) => void;
}

const JENIS_KELAMIN_OPTIONS = [
  { value: "L", label: "👦 Laki-laki" },
  { value: "P", label: "👧 Perempuan" },
];

export function FormTambahAnak({ buka, onTutup, onSukses }: FormTambahAnakProps) {
  const { tampilkanSukses, tampilkanError } = pakeToast();
  const [sedangSimpan, setSedangSimpan] = useState(false);

  const [formData, setFormData] = useState({
    nama_anak: "",
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    berat_lahir: "",
    tinggi_lahir: "",
    family_id: "1",
  });

  useEffect(() => {
    if (buka) {
      setFormData({
        nama_anak: "",
        nik: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        berat_lahir: "",
        tinggi_lahir: "",
        family_id: "1",
      });
    }
  }, [buka]);

  const handleSubmit = async () => {
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
        family_id: parseInt(formData.family_id) || 1,
      };
      
      const result = await childrenService.buat(payload);
      const anakData = (result as any)?.data || result;
      
      tampilkanSukses("Data anak berhasil ditambahkan!");
      
      if (onSukses) {
        onSukses(anakData);
      }
      
      onTutup();
    } catch (error: any) {
      console.error("Error tambah anak:", error);
      
      let pesan = "Gagal menambahkan data anak";
      
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

  return (
    <Modal buka={buka} onTutup={onTutup} judul="Tambah Data Anak Baru" ukuran="lg">
      <div className="space-y-5">
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
                <Users className="w-5 h-5 mr-2" />
                Simpan Data Anak
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
