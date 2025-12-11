const URL_API = process.env.NEXT_PUBLIC_API_URL || "";

const ambilToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
};

export const exportService = {
    downloadCSV: async (): Promise<void> => {
        const token = ambilToken();
        const response = await fetch(`${URL_API}/admin/export/csv`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Gagal download CSV");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `laporan_posyandu_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    },

    downloadJSON: async (): Promise<void> => {
        const token = ambilToken();
        const response = await fetch(`${URL_API}/admin/export/json`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Gagal download JSON");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `laporan_posyandu_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    },
};
