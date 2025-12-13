import api from "@/lib/api-client";
import type { User, DataLogin, DataDaftar, ResponAuth } from "@/types";

interface ProfilResponse {
    data?: User;
    user?: User;
    [key: string]: unknown;
}

export const authService = {
    login: (data: DataLogin): Promise<ResponAuth> =>
        api.kirim<ResponAuth>("/auth/login", data, { pakeAuth: false }),

    daftar: (data: DataDaftar): Promise<ResponAuth> =>
        api.kirim<ResponAuth>("/auth/register", data, { pakeAuth: false }),

    logout: (): Promise<void> =>
        api.kirim("/auth/logout"),

    ambilProfil: async (): Promise<User> => {
        const response = await api.ambil<ProfilResponse | User>("/auth/me");

        if (response && typeof response === 'object' && 'role' in response && response.role) {
            return response as User;
        }

        const profilResponse = response as ProfilResponse;
        if (profilResponse.data && typeof profilResponse.data === 'object' && 'role' in profilResponse.data) {
            return profilResponse.data;
        }

        if (profilResponse.user && typeof profilResponse.user === 'object' && 'role' in profilResponse.user) {
            return profilResponse.user;
        }

        return response as User;
    },

    refreshToken: (): Promise<{ token: string }> =>
        api.kirim("/auth/refresh"),
};

export default authService;
