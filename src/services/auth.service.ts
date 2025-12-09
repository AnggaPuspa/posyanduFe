import api from "@/lib/api-client";
import type { User, DataLogin, DataDaftar, ResponAuth } from "@/types";

export const authService = {
    login: (data: DataLogin): Promise<ResponAuth> =>
        api.kirim<ResponAuth>("/auth/login", data, { pakeAuth: false }),

    daftar: (data: DataDaftar): Promise<ResponAuth> =>
        api.kirim<ResponAuth>("/auth/register", data, { pakeAuth: false }),

    logout: (): Promise<void> =>
        api.kirim("/auth/logout"),

    ambilProfil: (): Promise<User> =>
        api.ambil<User>("/auth/me"),

    refreshToken: (): Promise<{ token: string }> =>
        api.kirim("/auth/refresh"),
};

export default authService;
