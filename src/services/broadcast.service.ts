import { api } from "@/lib/api-client";

export interface Broadcast {
    id: number;
    judul: string;
    isi: string;
    tipe: "pengumuman" | "artikel" | "edukasi";
    created_at: string;
    updated_at: string;
}

export interface DataBuatBroadcast {
    judul: string;
    isi: string;
    tipe: "pengumuman" | "artikel" | "edukasi";
}

export interface DataUpdateBroadcast {
    judul?: string;
    isi?: string;
}

interface ResponList {
    data?: Broadcast[];
    success?: boolean;
}

export const broadcastService = {
    ambilDaftar: async (): Promise<Broadcast[]> => {
        const response = await api.ambil<ResponList | Broadcast[] | unknown>("/posyandu/broadcasts");

        if (Array.isArray(response)) {
            return response;
        }

        if (response && typeof response === 'object') {
            const res = response as Record<string, unknown>;

            if (Array.isArray(res.data)) {
                return res.data as Broadcast[];
            }

            if (res.data && typeof res.data === 'object' && Array.isArray((res.data as Record<string, unknown>).data)) {
                return (res.data as Record<string, unknown>).data as Broadcast[];
            }
        }

        return [];
    },

    buat: (data: DataBuatBroadcast): Promise<Broadcast> =>
        api.kirim<Broadcast>("/posyandu/broadcasts", data),

    update: (id: number, data: DataUpdateBroadcast): Promise<Broadcast> =>
        api.ubah<Broadcast>(`/posyandu/broadcasts/${id}`, data),

    hapus: (id: number): Promise<void> =>
        api.hapus<void>(`/posyandu/broadcasts/${id}`),
};

export default broadcastService;
