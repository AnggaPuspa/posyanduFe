"use client";

import { useState, useEffect } from "react";
import { User, Mail, Lock, Users } from "lucide-react";
import { Button, Input, Modal, Spinner } from "@/components/ui";
import { familyService } from "@/services";
import type { UserOrtu } from "@/services/family.service";
import { pakeToast } from "@/components/providers/toast-provider";

interface FormTambahUserOrtuProps {
  buka: boolean;
  onTutup: () => void;
  onSukses?: (user: UserOrtu) => void;
}

export function FormTambahUserOrtu({ buka, onTutup, onSukses }: FormTambahUserOrtuProps) {
  const { tampilkanSukses, tampilkanError } = pakeToast();
  const [sedangSimpan, setSedangSimpan] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (buka) {
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [buka]);

  const handleSubmit = async () => {
    if (!formData.name) {
      tampilkanError("Nama harus diisi");
      return;
    }
    if (!formData.email) {
      tampilkanError("Email harus diisi");
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      tampilkanError("Password minimal 8 karakter");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      tampilkanError("Konfirmasi password tidak cocok");
      return;
    }

    setSedangSimpan(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "ortu" as const,
      };
      
      const result = await familyService.buatUserOrtu(payload);
      
      tampilkanSukses(`Akun orang tua "${formData.name}" berhasil dibuat!`);
      
      if (onSukses) {
        onSukses(result);
      }
      
      onTutup();
    } catch (error: any) {
      console.error("Error buat user ortu:", error);
      
      let pesan = "Gagal membuat akun orang tua";
      
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
    <Modal buka={buka} onTutup={onTutup} judul="Buat Akun Orang Tua Baru" ukuran="md">
      <div className="space-y-5">
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
          <p className="text-sm text-emerald-700">
            <strong>Langkah 1:</strong> Buat akun login untuk orang tua terlebih dahulu. 
            Setelah akun dibuat, lanjutkan dengan membuat data Keluarga.
          </p>
        </div>

        <Input 
          label="Nama Lengkap" 
          placeholder="Nama orang tua"
          icon={<User className="w-4 h-4" />}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input 
          label="Email" 
          type="email"
          placeholder="email@example.com"
          icon={<Mail className="w-4 h-4" />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input 
            label="Password" 
            type="password"
            placeholder="Minimal 8 karakter"
            icon={<Lock className="w-4 h-4" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input 
            label="Konfirmasi Password" 
            type="password"
            placeholder="Ulangi password"
            icon={<Lock className="w-4 h-4" />}
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
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
                Buat Akun Orang Tua
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
