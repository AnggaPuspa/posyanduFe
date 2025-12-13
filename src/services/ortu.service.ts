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
        status_gizi?: string;
        hasil_prediksi?: string;
        saran?: string;
        is_verified: boolean;
    };
    child?: Anak;
}

export interface BroadcastOrtu {
    id: number;
    judul: string;
    isi: string;
    tipe: "pengumuman" | "artikel" | "edukasi";
    created_at: string;
}

export const ortuService = {
    ambilAnakSaya: (): Promise<Anak[]> =>
        api.ambil<Anak[]>("/ortu/children"),

    ambilRiwayat: (): Promise<RiwayatPemeriksaan[]> =>
        api.ambil<RiwayatPemeriksaan[]>("/ortu/history"),

    ambilBroadcasts: async (): Promise<BroadcastOrtu[]> => {
        const response = await api.ambil<{ data?: BroadcastOrtu[] } | BroadcastOrtu[]>("/ortu/broadcasts");
        if (Array.isArray(response)) {
            return response;
        }
        if (response && typeof response === 'object') {
            const res = response as Record<string, unknown>;
            if (Array.isArray(res.data)) {
                return res.data as BroadcastOrtu[];
            }
            if (res.data && typeof res.data === 'object' && Array.isArray((res.data as Record<string, unknown>).data)) {
                return (res.data as Record<string, unknown>).data as BroadcastOrtu[];
            }
        }
        return [];
    },
};

