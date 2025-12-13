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

export interface Keluarga {
    id: number;
    nama_kepala_keluarga: string;
    alamat?: string;
    no_hp?: string;
}

export interface Anak {
    id: number;
    nama_anak: string;
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: "L" | "P";
    berat_lahir?: number;
    tinggi_lahir?: number;
    family_id: number;
    family?: Keluarga;
    status_gizi?: "normal" | "kuning" | "merah";
    dibuat_pada?: string;
    diupdate_pada?: string;
}

export interface DataBuatAnak {
    nama_anak: string;
    nik?: string;
    tanggal_lahir: string;
    jenis_kelamin: "L" | "P";
    berat_lahir?: number;
    tinggi_lahir?: number;
    family_id: number;
}

export interface ParamPencarian {
    q?: string;
    page?: number;
    per_page?: number;
}

export interface AIPrediction {
    status_gizi?: string;
    hasil_prediksi?: string;
    saran?: string;
    is_verified: boolean;
    z_score_bb_u?: number;
    z_score_tb_u?: number;
    z_score_bb_tb?: number;
}

export interface RecordPemeriksaan {
    id: number;
    child_id: number;
    berat_badan: number;
    tinggi_badan: number;
    lingkar_kepala?: number;
    lingkar_lengan?: number;
    catatan?: string;
    status?: string | null;
    tanggal_periksa?: string;
    created_at?: string;
    updated_at?: string;
    child?: Anak;
    ai_prediction?: AIPrediction;
}

export interface DataKonfirmasiAI {
    action: "accept" | "reject";
    manual_status?: string;
    manual_notes?: string;
}

export interface DataBuatRecord {
    child_id: number;
    tanggal_pemeriksaan: string;  // Format: YYYY-MM-DD
    berat_badan: number;
    tinggi_badan: number;
    lingkar_kepala?: number;
    lingkar_lengan?: number;
    catatan?: string;
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

export interface DataPertumbuhan {
    date: string;
    age_months: number;
    weight_kg: number;
    height_cm?: number;
    z_weight: number;
    z_height: number;
}

export interface GrafikPertumbuhan {
    anak_id: number;
    nama_anak: string;
    data: DataPertumbuhan[];
}
