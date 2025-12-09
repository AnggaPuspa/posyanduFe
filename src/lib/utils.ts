import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function formatTanggal(
    tanggal: string | Date,
    opsi?: Intl.DateTimeFormatOptions
): string {
    const defaultOpsi: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...opsi,
    };

    return new Date(tanggal).toLocaleDateString("id-ID", defaultOpsi);
}

export function formatRupiah(jumlah: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(jumlah);
}

export function tunggu(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    fungsi: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => fungsi(...args), delay);
    };
}

export function buatQueryString(
    params: Record<string, string | number | boolean | undefined | null>
): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
        }
    });

    const query = searchParams.toString();
    return query ? `?${query}` : "";
}
