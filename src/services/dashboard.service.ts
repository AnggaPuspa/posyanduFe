import { api } from "@/lib/api-client";

export interface StatistikDashboard {
    total_anak: number;
    total_pemeriksaan: number;
    total_pemeriksaan_bulan_ini: number;
    anak_gizi_baik: number;
    anak_gizi_kurang: number;
    anak_stunting: number;
    anak_berisiko: number;
}

export interface JadwalPosyandu {
    id: number;
    nama: string;
    tanggal: string;
    waktu: string;
    tipe: string;
    lokasi?: string;
}

export interface AntrianHariIni {
    id: number;
    child_id: number;
    nama_anak: string;
    umur: string;
    waktu: string;
    berat_badan?: number;
    status: "menunggu" | "selesai" | "batal";
}

export const dashboardService = {
    ambilStatistik: (): Promise<StatistikDashboard> =>
        api.ambil<StatistikDashboard>("/posyandu/dashboard/statistics"),

    ambilJadwal: (): Promise<JadwalPosyandu[]> =>
        api.ambil<JadwalPosyandu[]>("/posyandu/schedules"),

    ambilAntrian: (): Promise<AntrianHariIni[]> =>
        api.ambil<AntrianHariIni[]>("/posyandu/queue/today"),

    ambilRingkasanBulanan: (bulan?: string): Promise<any> =>
        api.ambil<any>(`/posyandu/reports/monthly${bulan ? `?month=${bulan}` : ""}`),
};
