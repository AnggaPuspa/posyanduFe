"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Home, MapPin, FileText, Users, Plus } from "lucide-react";
import { Button, Input, Modal, Spinner } from "@/components/ui";
import { familyService } from "@/services";
import type { Family, UserOrtu } from "@/services/family.service";
import { pakeToast } from "@/components/providers/toast-provider";
import { FormTambahUserOrtu } from "./form-tambah-user-ortu";

interface FormTambahKeluargaProps {
  buka: boolean;
  onTutup: () => void;
  onSukses?: (family: Family) => void;
}

export function FormTambahKeluarga({ buka, onTutup, onSukses }: FormTambahKeluargaProps) {
  const { tampilkanSukses, tampilkanError, tampilkanInfo } = pakeToast();
  const [sedangSimpan, setSedangSimpan] = useState(false);
  const [modalTambahOrtu, setModalTambahOrtu] = useState(false);
  const [userIdBaru, setUserIdBaru] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    user_id: "",
    no_kk: "",
    nama_kepala_keluarga: "",
    alamat: "",
    desa_kelurahan: "",
    kecamatan: "",
    kabupaten_kota: "",
    provinsi: "",
  });

  useEffect(() => {
    if (buka) {
      setFormData({
        user_id: "",
        no_kk: "",
        nama_kepala_keluarga: "",
        alamat: "",
        desa_kelurahan: "",
        kecamatan: "",
        kabupaten_kota: "",
        provinsi: "",
      });
      setUserIdBaru(null);
    }
  }, [buka]);

  useEffect(() => {
    if (userIdBaru) {
      setFormData(prev => ({ ...prev, user_id: String(userIdBaru) }));
    }
  }, [userIdBaru]);

  const handleSubmit = async () => {
    if (!formData.user_id) {
      tampilkanError("Masukkan User ID akun orang tua");
      return;
    }
    if (!formData.nama_kepala_keluarga) {
      tampilkanError("Nama kepala keluarga harus diisi");
      return;
    }

    setSedangSimpan(true);
    try {
      const payload = {
        user_id: parseInt(formData.user_id),
        no_kk: formData.no_kk || undefined,
        nama_kepala_keluarga: formData.nama_kepala_keluarga,
        alamat: formData.alamat || undefined,
        desa_kelurahan: formData.desa_kelurahan || undefined,
        kecamatan: formData.kecamatan || undefined,
        kabupaten_kota: formData.kabupaten_kota || undefined,
        provinsi: formData.provinsi || undefined,
      };
      
      const result = await familyService.buat(payload);
      
      tampilkanSukses("Data keluarga berhasil ditambahkan!");
      
      if (onSukses) {
        onSukses(result);
      }
      
      onTutup();
    } catch (error: any) {
      console.error("Error tambah keluarga:", error);
      
      let pesan = "Gagal menambahkan data keluarga";
      
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

  const handleUserOrtuCreated = (user: UserOrtu) => {
    setUserIdBaru(user.id);
    tampilkanInfo(`Akun berhasil dibuat! User ID: ${user.id}`);
  };

  return (
    <>
      <Modal buka={buka} onTutup={onTutup} judul="Tambah Keluarga Baru" ukuran="xl">
        <div className="space-y-5">
          <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-violet-600" />
                <p className="font-semibold text-violet-800">Link ke Akun Orang Tua</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setModalTambahOrtu(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Buat Akun Ortu
              </Button>
            </div>

            {userIdBaru ? (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg mb-3">
                <p className="text-sm text-emerald-800 font-medium">
                  ✓ Akun baru dibuat dengan User ID: <strong>{userIdBaru}</strong>
                </p>
              </div>
            ) : null}

            <Input 
              label="User ID Akun Orang Tua" 
              placeholder="Masukkan User ID dari akun orang tua"
              type="number"
              icon={<User className="w-4 h-4" />}
              value={formData.user_id}
              onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
              hint="Buat akun orang tua terlebih dahulu untuk mendapatkan User ID"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input 
              label="Nama Kepala Keluarga" 
              placeholder="Nama lengkap kepala keluarga"
              icon={<User className="w-4 h-4" />}
              value={formData.nama_kepala_keluarga}
              onChange={(e) => setFormData({ ...formData, nama_kepala_keluarga: e.target.value })}
            />
            <Input 
              label="No. KK (opsional)" 
              placeholder="16 digit nomor KK"
              icon={<FileText className="w-4 h-4" />}
              value={formData.no_kk}
              onChange={(e) => setFormData({ ...formData, no_kk: e.target.value })}
            />
          </div>

          <Input 
            label="Alamat" 
            placeholder="Alamat lengkap"
            icon={<Home className="w-4 h-4" />}
            value={formData.alamat}
            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input 
              label="Desa/Kelurahan" 
              placeholder="Nama desa/kelurahan"
              icon={<MapPin className="w-4 h-4" />}
              value={formData.desa_kelurahan}
              onChange={(e) => setFormData({ ...formData, desa_kelurahan: e.target.value })}
            />
            <Input 
              label="Kecamatan" 
              placeholder="Nama kecamatan"
              value={formData.kecamatan}
              onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input 
              label="Kabupaten/Kota" 
              placeholder="Nama kabupaten/kota"
              value={formData.kabupaten_kota}
              onChange={(e) => setFormData({ ...formData, kabupaten_kota: e.target.value })}
            />
            <Input 
              label="Provinsi" 
              placeholder="Nama provinsi"
              value={formData.provinsi}
              onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
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
                  Simpan Data Keluarga
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onTutup} disabled={sedangSimpan}>
              Batal
            </Button>
          </div>
        </div>
      </Modal>

      <FormTambahUserOrtu
        buka={modalTambahOrtu}
        onTutup={() => setModalTambahOrtu(false)}
        onSukses={handleUserOrtuCreated}
      />
    </>
  );
}
