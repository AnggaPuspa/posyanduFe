"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AlertTriangle, Info, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui";

type ConfirmType = "warning" | "danger" | "info" | "question";

interface ConfirmOptions {
    title: string;
    message: string;
    type?: ConfirmType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
    confirmLogout: (onConfirm: () => void | Promise<void>) => Promise<boolean>;
    confirmDelete: (itemName: string, onConfirm: () => void | Promise<void>) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm harus digunakan di dalam ConfirmProvider");
    }
    return context;
}

const typeConfig: Record<ConfirmType, { icon: React.ElementType; iconBg: string; iconColor: string }> = {
    warning: { icon: AlertTriangle, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
    danger: { icon: AlertTriangle, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
    info: { icon: Info, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
    question: { icon: HelpCircle, iconBg: "bg-violet-100", iconColor: "text-violet-600" },
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

    const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setOptions(opts);
            setIsOpen(true);
            setResolvePromise(() => resolve);
        });
    }, []);

    const confirmLogout = useCallback((onConfirm: () => void | Promise<void>): Promise<boolean> => {
        return confirm({
            title: "Keluar dari Akun?",
            message: "Anda yakin ingin keluar? Anda perlu login kembali untuk mengakses aplikasi.",
            type: "warning",
            confirmText: "Ya, Keluar",
            cancelText: "Batal",
            onConfirm,
        });
    }, [confirm]);

    const confirmDelete = useCallback((itemName: string, onConfirm: () => void | Promise<void>): Promise<boolean> => {
        return confirm({
            title: "Hapus Data?",
            message: `Anda yakin ingin menghapus "${itemName}"? Tindakan ini tidak dapat dibatalkan.`,
            type: "danger",
            confirmText: "Ya, Hapus",
            cancelText: "Batal",
            onConfirm,
        });
    }, [confirm]);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            if (options?.onConfirm) {
                await options.onConfirm();
            }
            resolvePromise?.(true);
        } finally {
            setIsLoading(false);
            setIsOpen(false);
            setOptions(null);
        }
    };

    const handleCancel = () => {
        options?.onCancel?.();
        resolvePromise?.(false);
        setIsOpen(false);
        setOptions(null);
    };

    const type = options?.type || "question";
    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <ConfirmContext.Provider value={{ confirm, confirmLogout, confirmDelete }}>
            {children}

            {isOpen && options && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleCancel}
                    />
                    
                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <button
                            onClick={handleCancel}
                            className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="p-6 pt-8">
                            <div className="flex flex-col items-center text-center">
                                <div className={`h-16 w-16 rounded-2xl ${config.iconBg} flex items-center justify-center mb-4`}>
                                    <Icon className={`w-8 h-8 ${config.iconColor}`} />
                                </div>
                                
                                <h3 className="text-xl font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                                    {options.title}
                                </h3>
                                
                                <p className="text-stone-500 text-sm leading-relaxed">
                                    {options.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 p-6 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                {options.cancelText || "Batal"}
                            </Button>
                            <Button
                                variant={type === "danger" ? "danger" : "primary"}
                                className="flex-1"
                                onClick={handleConfirm}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Memproses...</span>
                                    </div>
                                ) : (
                                    options.confirmText || "Ya"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
}
