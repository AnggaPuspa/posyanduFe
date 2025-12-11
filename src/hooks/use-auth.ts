"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { simpanToken, hapusToken } from "@/lib/api-client";
import { KONFIGURASI_AUTH } from "@/config";
import type { DataLogin, User, ErrorApi } from "@/types";

interface StateAuth {
    user: User | null;
    sedangMemuat: boolean;
    error: ErrorApi | null;
}

interface KonfigAuth {
    redirectSetelahLogin?: string;
    redirectSetelahLogout?: string;
}

export function pakeAuth(konfig: KonfigAuth = {}) {
    const {
        redirectSetelahLogin = KONFIGURASI_AUTH.HALAMAN_DEFAULT,
        redirectSetelahLogout = KONFIGURASI_AUTH.HALAMAN_LOGIN,
    } = konfig;

    const router = useRouter();

    const [state, setState] = useState<StateAuth>({
        user: null,
        sedangMemuat: false,
        error: null,
    });

    const masuk = useCallback(
        async (dataLogin: DataLogin): Promise<{ sukses: boolean; pesan?: string }> => {
            setState((prev) => ({ ...prev, sedangMemuat: true, error: null }));

            try {
                const respon = await authService.login(dataLogin);
                simpanToken(respon.token);

                setState({ user: respon.user, sedangMemuat: false, error: null });

                const halamanTujuan = KONFIGURASI_AUTH.HALAMAN_SESUAI_ROLE[respon.user.role] || redirectSetelahLogin;
                router.push(halamanTujuan);

                return { sukses: true };
            } catch (error) {
                const errorApi = error as ErrorApi;
                setState({ user: null, sedangMemuat: false, error: errorApi });
                return { sukses: false, pesan: errorApi.pesan || "Gagal masuk. Silakan coba lagi." };
            }
        },
        [router, redirectSetelahLogin]
    );

    const keluar = useCallback(async (): Promise<void> => {
        setState((prev) => ({ ...prev, sedangMemuat: true }));

        try {
            await authService.logout();
        } catch {
            console.warn("API logout gagal, tetap menghapus token lokal");
        } finally {
            hapusToken();
            setState({ user: null, sedangMemuat: false, error: null });
            router.push(redirectSetelahLogout);
        }
    }, [router, redirectSetelahLogout]);

    const ambilProfil = useCallback(async (): Promise<void> => {
        setState((prev) => ({ ...prev, sedangMemuat: true, error: null }));

        try {
            const user = await authService.ambilProfil();
            setState({ user, sedangMemuat: false, error: null });
        } catch (error) {
            setState({ user: null, sedangMemuat: false, error: error as ErrorApi });
        }
    }, []);

    const hapusError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    return {
        user: state.user,
        sedangMemuat: state.sedangMemuat,
        error: state.error,
        masuk,
        keluar,
        ambilProfil,
        hapusError,
        sudahLogin: !!state.user,
    };
}

export default pakeAuth;
