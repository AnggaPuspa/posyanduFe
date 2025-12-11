"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/services";
import { hapusToken } from "@/lib/api-client";
import { KONFIGURASI_AUTH } from "@/config";
import type { User, ErrorApi } from "@/types";

interface KonteksAuth {
    user: User | null;
    sedangMemuat: boolean;
    error: ErrorApi | null;
    keluar: () => Promise<void>;
    muatUlangProfil: () => Promise<void>;
}

const AuthContext = createContext<KonteksAuth | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [sedangMemuat, setSedangMemuat] = useState(true);
    const [error, setError] = useState<ErrorApi | null>(null);

    const ambilProfil = useCallback(async () => {
        const token = localStorage.getItem(KONFIGURASI_AUTH.NAMA_TOKEN);
        if (!token) {
            setSedangMemuat(false);
            return;
        }

        try {
            const userData = await authService.ambilProfil();
            setUser(userData);
            setError(null);
        } catch (err) {
            const errorApi = err as ErrorApi;
            setError(errorApi);
            
            if (errorApi.status === 401) {
                hapusToken();
                router.push(KONFIGURASI_AUTH.HALAMAN_LOGIN);
            }
        } finally {
            setSedangMemuat(false);
        }
    }, [router]);

    const keluar = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            console.warn("API logout gagal");
        } finally {
            hapusToken();
            setUser(null);
            router.push(KONFIGURASI_AUTH.HALAMAN_LOGIN);
        }
    }, [router]);

    useEffect(() => {
        ambilProfil();
    }, [ambilProfil]);

    return (
        <AuthContext.Provider value={{ user, sedangMemuat, error, keluar, muatUlangProfil: ambilProfil }}>
            {children}
        </AuthContext.Provider>
    );
}

export function pakeKonteksAuth(): KonteksAuth {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("pakeKonteksAuth harus digunakan dalam AuthProvider");
    }
    return context;
}

export function ambilInisial(nama: string): string {
    if (!nama) return "??";
    const parts = nama.split(" ");
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nama.substring(0, 2).toUpperCase();
}

export function formatRole(role: string): string {
    const roleMap: Record<string, string> = {
        admin: "Administrator",
        kader: "Kader Posyandu",
        posyandu: "Kader Posyandu",
        orang_tua: "Orang Tua",
        ortu: "Orang Tua",
    };
    return roleMap[role] || role;
}
