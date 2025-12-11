import { api } from "@/lib/api-client";
import type { Anak, DataBuatAnak, ResponPaginasi, ParamPencarian } from "@/types";

export const childrenService = {
    ambilDaftar: (params?: ParamPencarian): Promise<ResponPaginasi<Anak>> => {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", String(params.page));
        if (params?.per_page) query.append("per_page", String(params.per_page));
        const queryString = query.toString();
        return api.ambil<ResponPaginasi<Anak>>(`/posyandu/children${queryString ? `?${queryString}` : ""}`);
    },

    cari: (params: ParamPencarian): Promise<ResponPaginasi<Anak>> => {
        const query = new URLSearchParams();
        if (params.q) query.append("q", params.q);
        if (params.page) query.append("page", String(params.page));
        if (params.per_page) query.append("per_page", String(params.per_page));
        return api.ambil<ResponPaginasi<Anak>>(`/posyandu/children/search?${query.toString()}`);
    },

    ambilDetail: (id: number): Promise<Anak> =>
        api.ambil<Anak>(`/posyandu/children/${id}`),

    buat: (data: DataBuatAnak): Promise<Anak> =>
        api.kirim<Anak>("/posyandu/children", data),

    update: (id: number, data: Partial<DataBuatAnak>): Promise<Anak> =>
        api.ubah<Anak>(`/posyandu/children/${id}`, data),

    hapus: (id: number): Promise<void> =>
        api.hapus<void>(`/posyandu/children/${id}`),

    ambilQRCode: (id: number): Promise<string> =>
        api.ambil<string>(`/posyandu/children/${id}/qr`),
};
