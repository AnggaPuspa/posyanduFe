"use client";

import { useState, useEffect, useCallback } from "react";
import { ErrorApi } from "@/types";
import api from "@/lib/api-client";

interface StateFetch<T> {
    data: T | null;
    error: ErrorApi | null;
    loading: boolean;
}

interface OpsiFetch {
    aktif?: boolean;
    refetchPasFokus?: boolean;
}

export function pakeFetch<T>(
    endpoint: string,
    opsi: OpsiFetch = {}
): StateFetch<T> & { ulangi: () => Promise<void> } {
    const { aktif = true, refetchPasFokus = false } = opsi;

    const [state, setState] = useState<StateFetch<T>>({
        data: null,
        error: null,
        loading: aktif,
    });

    const ambilData = useCallback(async () => {
        if (!aktif) return;

        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const data = await api.ambil<T>(endpoint);
            setState({ data, error: null, loading: false });
        } catch (error) {
            setState({ data: null, error: error as ErrorApi, loading: false });
        }
    }, [endpoint, aktif]);

    useEffect(() => {
        ambilData();
    }, [ambilData]);

    useEffect(() => {
        if (!refetchPasFokus) return;
        const handle = () => ambilData();
        window.addEventListener("focus", handle);
        return () => window.removeEventListener("focus", handle);
    }, [ambilData, refetchPasFokus]);

    return { ...state, ulangi: ambilData };
}

interface StateMutasi<T> {
    data: T | null;
    error: ErrorApi | null;
    loading: boolean;
    sukses: boolean;
}

type MetodeMutasi = "POST" | "PUT" | "PATCH" | "DELETE";

export function pakeMutasi<T, TPayload = unknown>(
    endpoint: string,
    metode: MetodeMutasi = "POST"
): StateMutasi<T> & { mutasi: (data?: TPayload) => Promise<T>; reset: () => void } {
    const [state, setState] = useState<StateMutasi<T>>({
        data: null,
        error: null,
        loading: false,
        sukses: false,
    });

    const mutasi = useCallback(
        async (payload?: TPayload): Promise<T> => {
            setState({ data: null, error: null, loading: true, sukses: false });

            try {
                let hasil: T;

                switch (metode) {
                    case "POST":
                        hasil = await api.kirim<T>(endpoint, payload);
                        break;
                    case "PUT":
                        hasil = await api.ubah<T>(endpoint, payload);
                        break;
                    case "PATCH":
                        hasil = await api.patch<T>(endpoint, payload);
                        break;
                    case "DELETE":
                        hasil = await api.hapus<T>(endpoint);
                        break;
                }

                setState({ data: hasil, error: null, loading: false, sukses: true });
                return hasil;
            } catch (error) {
                const err = error as ErrorApi;
                setState({ data: null, error: err, loading: false, sukses: false });
                throw err;
            }
        },
        [endpoint, metode]
    );

    const reset = useCallback(() => {
        setState({ data: null, error: null, loading: false, sukses: false });
    }, []);

    return { ...state, mutasi, reset };
}
