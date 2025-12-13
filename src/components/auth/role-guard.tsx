"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui";
import { authService } from "@/services";
import { KONFIGURASI_AUTH } from "@/config";

interface PropsRoleGuard {
    children: ReactNode;
    allowedRoles: string[];
    redirectTo: string;
}

const ROLE_ORTU = ["orang_tua", "ortu", "masyarakat"];

export function RoleGuard({ children, allowedRoles, redirectTo }: PropsRoleGuard) {
    const router = useRouter();
    const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking");

    useEffect(() => {
        let isMounted = true;
        
        const cekRole = async () => {
            try {
                const user = await authService.ambilProfil();
                
                if (!isMounted) return;
                
                const roleNormalized = user.role?.toLowerCase()?.trim() || "";
                
                if (!roleNormalized) {
                    router.replace(KONFIGURASI_AUTH.HALAMAN_LOGIN);
                    return;
                }
                
                const allowedRolesNormalized = allowedRoles.map(r => r.toLowerCase().trim());
                const roleAllowed = allowedRolesNormalized.includes(roleNormalized);

                if (roleAllowed) {
                    setStatus("allowed");
                } else {
                    let targetRedirect = redirectTo;
                    
                    if (ROLE_ORTU.includes(roleNormalized)) {
                        targetRedirect = "/beranda";
                    }
                    
                    setStatus("denied");
                    router.replace(targetRedirect);
                }
            } catch {
                if (!isMounted) return;
                router.replace(KONFIGURASI_AUTH.HALAMAN_LOGIN);
            }
        };

        cekRole();
        
        return () => {
            isMounted = false;
        };
    }, [router, allowedRoles, redirectTo]);

    if (status === "checking") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" />
                    <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Memeriksa akses...
                    </p>
                </div>
            </div>
        );
    }

    if (status === "denied") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" />
                    <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Mengalihkan...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default RoleGuard;
