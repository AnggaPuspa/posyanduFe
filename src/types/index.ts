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
    role: string;
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
