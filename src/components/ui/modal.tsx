"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropsModal {
    buka: boolean;
    onTutup: () => void;
    judul?: string;
    children: ReactNode;
    ukuran?: "sm" | "md" | "lg" | "xl";
}

const ukuranClass = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

export function Modal({ buka, onTutup, judul, children, ukuran = "lg" }: PropsModal) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onTutup();
        };

        if (buka) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [buka, onTutup]);

    if (!buka) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onTutup}
            />
            <div
                ref={modalRef}
                className={cn(
                    "relative w-full bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col",
                    ukuranClass[ukuran]
                )}
            >
                {judul && (
                    <div className="flex items-center justify-between p-6 border-b border-stone-100">
                        <h2 className="text-lg font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                            {judul}
                        </h2>
                        <button
                            onClick={onTutup}
                            className="h-8 w-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
