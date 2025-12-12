import { api } from "@/lib/api-client";

export interface Family {
    id: number;
    user_id?: number;
    no_kk?: string;
    nama_kepala_keluarga: string;
    alamat?: string;
    desa_kelurahan?: string;
    kecamatan?: string;
    kabupaten_kota?: string;
    provinsi?: string;
    no_hp?: string;
    created_at?: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface DataBuatFamily {
    user_id: number;
    no_kk?: string;
    nama_kepala_keluarga: string;
    alamat?: string;
    desa_kelurahan?: string;
    kecamatan?: string;
    kabupaten_kota?: string;
    provinsi?: string;
}

export interface UserOrtu {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface DataBuatUser {
    name: string;
    email: string;
    password: string;
    role: "ortu";
}

export const familyService = {
    buatUserOrtu: async (data: DataBuatUser): Promise<UserOrtu> => {
        const result = await api.kirim<any>("/posyandu/users", data);
        return result?.data || result;
    },

    ambilDaftar: async (): Promise<Family[]> => {
        const result = await api.ambil<any>("/posyandu/families");
        return result?.data || result || [];
    },

    buat: async (data: DataBuatFamily): Promise<Family> => {
        const result = await api.kirim<any>("/posyandu/families", data);
        return result?.data || result;
    },
};
