export interface ResponApi<T> {
    data: T;
    pesan?: string;
    sukses: boolean;
}

export interface ResponPaginasi<T> {
    data: T[];
    meta: {
        halaman_sekarang: number;
        halaman_terakhir: number;
        per_halaman: number;
        total: number;
    };
}

export interface ErrorApi {
    pesan: string;
    errors?: Record<string, string[]>;
    status: number;
}

export interface User {
    id: number;
    nama: string;
    email: string;
    role: "admin" | "kader" | "orang_tua";
    dibuat_pada: string;
    diupdate_pada: string;
}

export interface DataLogin {
    email: string;
    password: string;
}

export interface DataDaftar extends DataLogin {
    nama: string;
    konfirmasi_password: string;
}

export interface ResponAuth {
    user: User;
    token: string;
}

export interface Anak {
    id: number;
    nama: string;
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: "L" | "P";
    nama_ibu: string;
    nama_ayah: string;
    alamat: string;
    no_hp_ortu: string;
    foto?: string;
    dibuat_pada: string;
    diupdate_pada: string;
}

export interface Pemeriksaan {
    id: number;
    anak_id: number;
    tanggal_periksa: string;
    berat_badan: number;
    tinggi_badan: number;
    lingkar_kepala?: number;
    lingkar_lengan?: number;
    catatan?: string;
    dibuat_oleh: number;
    dibuat_pada: string;
}

export interface HasilAnalisis {
    id: number;
    pemeriksaan_id: number;
    z_score_bb_u: number;
    z_score_tb_u: number;
    z_score_bb_tb: number;
    status_gizi: "normal" | "kurang" | "buruk" | "lebih";
    level_risiko: "hijau" | "kuning" | "merah";
    interpretasi: string;
    prediksi_3_bulan: string;
    rekomendasi: string;
    dibuat_pada: string;
}

export interface Notifikasi {
    id: number;
    anak_id: number;
    tipe: "peringatan" | "reminder" | "info";
    judul: string;
    pesan: string;
    sudah_dibaca: boolean;
    dibuat_pada: string;
}

export interface StatistikDashboard {
    total_anak: number;
    total_pemeriksaan_bulan_ini: number;
    anak_berisiko: number;
    anak_normal: number;
    anak_perlu_perhatian: number;
}
