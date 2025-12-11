import { api } from "@/lib/api-client";
import type { Anak, DataBuatAnak, ResponPaginasi, ParamPencarian } from "@/types";

const URL_API = process.env.NEXT_PUBLIC_API_URL || "";

const ambilToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
};

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

    ambilQRCode: async (id: number): Promise<string> => {
        const token = ambilToken();
        const response = await fetch(`${URL_API}/posyandu/children/${id}/qr`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Gagal memuat QR Code");
        }

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("image/svg") || contentType?.includes("image/png")) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }

        const text = await response.text();
        if (text.startsWith("<svg") || text.startsWith("<?xml")) {
            const blob = new Blob([text], { type: "image/svg+xml" });
            return URL.createObjectURL(blob);
        }

        try {
            const json = JSON.parse(text);
            return json.data || json.qr_code || json.url || text;
        } catch {
            return text;
        }
    },
};
