"use client";

import { createContext, useContext, ReactNode } from "react";
import { Toaster, toast } from "sonner";

type TipeNotifikasi = "sukses" | "error" | "info" | "peringatan";

interface KonteksToast {
    tampilkanToast: (pesan: string, tipe?: TipeNotifikasi) => void;
    tampilkanSukses: (pesan: string) => void;
    tampilkanError: (pesan: string) => void;
    tampilkanInfo: (pesan: string) => void;
    tampilkanPeringatan: (pesan: string) => void;
}

const ToastContext = createContext<KonteksToast | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const tampilkanToast = (pesan: string, tipe: TipeNotifikasi = "info") => {
        switch (tipe) {
            case "sukses": toast.success(pesan); break;
            case "error": toast.error(pesan); break;
            case "peringatan": toast.warning(pesan); break;
            default: toast.info(pesan); break;
        }
    };

    return (
        <ToastContext.Provider
            value={{
                tampilkanToast,
                tampilkanSukses: (pesan) => toast.success(pesan),
                tampilkanError: (pesan) => toast.error(pesan),
                tampilkanInfo: (pesan) => toast.info(pesan),
                tampilkanPeringatan: (pesan) => toast.warning(pesan),
            }}
        >
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: { fontFamily: "var(--font-nunito)" },
                    classNames: {
                        success: "bg-emerald-500 text-white border-emerald-600",
                        error: "bg-rose-500 text-white border-rose-600",
                        warning: "bg-amber-500 text-white border-amber-600",
                        info: "bg-sky-500 text-white border-sky-600",
                    },
                }}
                richColors
            />
        </ToastContext.Provider>
    );
}

export function pakeToast(): KonteksToast {
    const context = useContext(ToastContext);
    
    if (context === undefined) {
        return {
            tampilkanToast: (pesan, tipe = "info") => {
                switch (tipe) {
                    case "sukses": toast.success(pesan); break;
                    case "error": toast.error(pesan); break;
                    case "peringatan": toast.warning(pesan); break;
                    default: toast.info(pesan); break;
                }
            },
            tampilkanSukses: (pesan) => toast.success(pesan),
            tampilkanError: (pesan) => toast.error(pesan),
            tampilkanInfo: (pesan) => toast.info(pesan),
            tampilkanPeringatan: (pesan) => toast.warning(pesan),
        };
    }
    
    return context;
}

export default ToastProvider;
