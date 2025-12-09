import { ErrorApi } from "@/types";

const URL_API = process.env.NEXT_PUBLIC_API_URL || "";

type MetodeRequest = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface KonfigRequest {
    method: MetodeRequest;
    headers: Record<string, string>;
    body?: string;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

const ambilToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
};

export const simpanToken = (token: string): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
    }
};

export const hapusToken = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
    }
};

const buatHeaders = (pakeAuth: boolean = true): Record<string, string> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    if (pakeAuth) {
        const token = ambilToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return headers;
};

const prosesRespon = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const dataError = await response.json().catch(() => ({}));
        const error: ErrorApi = {
            pesan: dataError.message || `HTTP Error: ${response.status}`,
            errors: dataError.errors,
            status: response.status,
        };
        throw error;
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
};

async function requestApi<T>(
    endpoint: string,
    metode: MetodeRequest = "GET",
    data?: unknown,
    opsi?: {
        pakeAuth?: boolean;
        cache?: RequestCache;
        revalidate?: number | false;
        tags?: string[];
    }
): Promise<T> {
    const url = `${URL_API}${endpoint}`;

    const config: KonfigRequest = {
        method: metode,
        headers: buatHeaders(opsi?.pakeAuth ?? true),
    };

    if (data && metode !== "GET") {
        config.body = JSON.stringify(data);
    }

    if (opsi?.cache) {
        config.cache = opsi.cache;
    }

    if (opsi?.revalidate !== undefined || opsi?.tags) {
        config.next = {
            ...(opsi.revalidate !== undefined && { revalidate: opsi.revalidate }),
            ...(opsi.tags && { tags: opsi.tags }),
        };
    }

    const response = await fetch(url, config);
    return prosesRespon<T>(response);
}

export const api = {
    ambil: <T>(
        endpoint: string,
        opsi?: {
            pakeAuth?: boolean;
            cache?: RequestCache;
            revalidate?: number | false;
            tags?: string[];
        }
    ): Promise<T> => requestApi<T>(endpoint, "GET", undefined, opsi),

    kirim: <T>(
        endpoint: string,
        data?: unknown,
        opsi?: { pakeAuth?: boolean }
    ): Promise<T> => requestApi<T>(endpoint, "POST", data, opsi),

    ubah: <T>(
        endpoint: string,
        data?: unknown,
        opsi?: { pakeAuth?: boolean }
    ): Promise<T> => requestApi<T>(endpoint, "PUT", data, opsi),

    patch: <T>(
        endpoint: string,
        data?: unknown,
        opsi?: { pakeAuth?: boolean }
    ): Promise<T> => requestApi<T>(endpoint, "PATCH", data, opsi),

    hapus: <T>(
        endpoint: string,
        opsi?: { pakeAuth?: boolean }
    ): Promise<T> => requestApi<T>(endpoint, "DELETE", undefined, opsi),
};

export default api;
