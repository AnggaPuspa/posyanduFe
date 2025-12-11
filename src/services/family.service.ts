import { api } from "@/lib/api-client";

export interface Family {
    id: number;
    nama_kepala_keluarga: string;
    alamat?: string;
    no_hp?: string;
    user_id?: number;
    created_at?: string;
}

export const familyService = {
    ambilDaftar: (): Promise<Family[]> =>
        api.ambil<Family[]>("/posyandu/families"),
};
