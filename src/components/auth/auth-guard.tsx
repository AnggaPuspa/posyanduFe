"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@/components/ui";
import { KONFIGURASI_AUTH } from "@/config";

interface PropsAuthGuard {
    children: ReactNode;
}

export function AuthGuard({ children }: PropsAuthGuard) {
    const router = useRouter();
    const pathname = usePathname();
    const [sedangMemeriksa, setSedangMemeriksa] = useState(true);
    const [terautentikasi, setTerautentikasi] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(KONFIGURASI_AUTH.NAMA_TOKEN);

        if (!token) {
            router.replace(`${KONFIGURASI_AUTH.HALAMAN_LOGIN}?kembali=${encodeURIComponent(pathname)}`);
            return;
        }

        setTerautentikasi(true);
        setSedangMemeriksa(false);
    }, [router, pathname]);

    if (sedangMemeriksa) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" />
                    <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Memeriksa autentikasi...
                    </p>
                </div>
            </div>
        );
    }

    if (!terautentikasi) return null;

    return <>{children}</>;
}

export default AuthGuard;
