import { api } from "@/lib/api-client";
import type { DataPertumbuhan, GrafikPertumbuhan } from "@/types";

export const growthService = {
    ambilSeriesPertumbuhan: (childId: number): Promise<DataPertumbuhan[]> =>
        api.ambil<DataPertumbuhan[]>(`/growth/${childId}/series`),

    ambilGrafikPertumbuhan: (childId: number): Promise<GrafikPertumbuhan> =>
        api.ambil<GrafikPertumbuhan>(`/growth/${childId}/chart`),
};
