import { api } from "@/lib/api-client";
import type { Anak, RecordPemeriksaan, ResponPaginasi } from "@/types";

export interface RiwayatPemeriksaan {
    id: number;
    berat_badan: number;
    tinggi_badan: number;
    lingkar_kepala?: number;
    lingkar_lengan?: number;
    status?: string;
    tanggal_periksa?: string;
    created_at?: string;
    ai_prediction?: {
        hasil_prediksi: string;
        saran?: string;
        is_verified: boolean;
    };
    child?: Anak;
}

export const ortuService = {
    ambilAnakSaya: (): Promise<Anak[]> =>
        api.ambil<Anak[]>("/ortu/children"),

    ambilRiwayat: (): Promise<RiwayatPemeriksaan[]> =>
        api.ambil<RiwayatPemeriksaan[]>("/ortu/history"),
};
