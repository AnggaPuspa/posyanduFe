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

        let user: User;

        if (response && typeof response === 'object' && 'role' in response && response.role) {
            user = response as User;
        } else {
            const profilResponse = response as ProfilResponse;
            if (profilResponse.data && typeof profilResponse.data === 'object' && 'role' in profilResponse.data) {
                user = profilResponse.data;
            } else if (profilResponse.user && typeof profilResponse.user === 'object' && 'role' in profilResponse.user) {
                user = profilResponse.user;
            } else {
                user = response as User;
            }
        }

        if (user.name && !user.nama) {
            user.nama = user.name;
        }

        return user;
    },

    refreshToken: (): Promise<{ token: string }> =>
        api.kirim("/auth/refresh"),
};

export default authService;
