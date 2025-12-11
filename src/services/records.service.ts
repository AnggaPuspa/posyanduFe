import { api } from "@/lib/api-client";
import type { RecordPemeriksaan, DataBuatRecord, DataKonfirmasiAI, ResponPaginasi, ParamPencarian } from "@/types";

export const recordsService = {
    ambilDaftar: (params?: ParamPencarian): Promise<ResponPaginasi<RecordPemeriksaan>> => {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", String(params.page));
        if (params?.per_page) query.append("per_page", String(params.per_page));
        const queryString = query.toString();
        return api.ambil<ResponPaginasi<RecordPemeriksaan>>(`/posyandu/records${queryString ? `?${queryString}` : ""}`);
    },

    ambilDetail: (id: number): Promise<RecordPemeriksaan> =>
        api.ambil<RecordPemeriksaan>(`/posyandu/records/${id}`),

    buat: (data: DataBuatRecord): Promise<RecordPemeriksaan> =>
        api.kirim<RecordPemeriksaan>("/posyandu/records", data),

    update: (id: number, data: Partial<DataBuatRecord>): Promise<RecordPemeriksaan> =>
        api.ubah<RecordPemeriksaan>(`/posyandu/records/${id}`, data),

    hapus: (id: number): Promise<void> =>
        api.hapus<void>(`/posyandu/records/${id}`),

    ambilByAnak: (childId: number): Promise<RecordPemeriksaan[]> =>
        api.ambil<RecordPemeriksaan[]>(`/posyandu/children/${childId}/records`),

    konfirmasiAI: (id: number, data: DataKonfirmasiAI): Promise<RecordPemeriksaan> =>
        api.kirim<RecordPemeriksaan>(`/posyandu/records/${id}/confirm`, data),

    analisisUlang: async (id: number): Promise<RecordPemeriksaan> => {
        try {
            return await api.kirim<RecordPemeriksaan>(`/posyandu/records/${id}/reanalyze`, {});
        } catch (error: any) {
            if (error?.status === 404) {
                return api.ubah<RecordPemeriksaan>(`/posyandu/records/${id}`, {
                    reanalyze: true
                } as any);
            }
            throw error;
        }
    },
};
