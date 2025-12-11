"use client";

import { useState, useEffect } from "react";
import { growthService } from "@/services";
import { Spinner } from "@/components/ui";
import type { DataPertumbuhan } from "@/types";

interface PropsGrafikPertumbuhan {
    anakId: number;
    judul?: string;
}

export function GrafikPertumbuhan({ anakId, judul = "Grafik Pertumbuhan" }: PropsGrafikPertumbuhan) {
    const [data, setData] = useState<DataPertumbuhan[]>([]);
    const [sedangMemuat, setSedangMemuat] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ambilData = async () => {
            try {
                const result = await growthService.ambilSeriesPertumbuhan(anakId);
                const response = result as any;
                let dataArray: DataPertumbuhan[] = [];
                
                if (Array.isArray(response)) {
                    dataArray = response;
                } else if (response?.data && Array.isArray(response.data)) {
                    dataArray = response.data;
                } else if (response?.data?.data && Array.isArray(response.data.data)) {
                    dataArray = response.data.data;
                }
                
                setData(dataArray);
            } catch (err) {
                setError("Gagal memuat data pertumbuhan");
                console.error(err);
            } finally {
                setSedangMemuat(false);
            }
        };

        ambilData();
    }, [anakId]);

    if (sedangMemuat) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner size="md" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 text-rose-500 text-sm">
                {error}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-stone-400 text-sm">
                Belum ada data pertumbuhan
            </div>
        );
    }

    const zScores = data.map(d => d.z_weight || 0);
    const absMax = Math.max(...zScores.map(z => Math.abs(z)));
    
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-700" style={{ fontFamily: 'var(--font-nunito)' }}>
                {judul}
            </h3>
            
            <div className="relative h-48 bg-gradient-to-b from-violet-100 to-violet-50 rounded-xl border border-violet-200 overflow-hidden">
                <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-violet-300 z-10" />
                
                <div className="absolute inset-4 flex items-center justify-around gap-2">
                    {data.slice(-12).map((item, index) => {
                        const zScore = item.z_weight || 0;
                        const isPositive = zScore >= 0;
                        const barHeight = absMax > 0 ? (Math.abs(zScore) / absMax) * 45 : 30;
                        const finalHeight = Math.max(barHeight, 15);
                        
                        return (
                            <div key={index} className="flex-1 flex flex-col items-center h-full relative">
                                {isPositive && (
                                    <div 
                                        className="absolute bottom-1/2 w-4/5 rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400 shadow-md"
                                        style={{ height: `${finalHeight}%` }}
                                    />
                                )}
                                
                                {!isPositive && (
                                    <div 
                                        className="absolute top-1/2 w-4/5 rounded-b-lg bg-gradient-to-b from-orange-500 to-amber-400 shadow-md"
                                        style={{ height: `${finalHeight}%` }}
                                    />
                                )}
                                
                                <span className="absolute bottom-0 text-[9px] font-medium text-stone-600">
                                    {item.age_months}bln
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm" />
                    <span className="text-emerald-700">Z-score positif (sehat)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-md bg-gradient-to-r from-orange-500 to-amber-400 shadow-sm" />
                    <span className="text-orange-700">Z-score negatif (perhatian)</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center p-3 bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl border border-violet-200">
                    <p className="text-lg font-bold text-violet-700">{data[data.length - 1]?.weight_kg || 0}</p>
                    <p className="text-xs text-violet-600">Berat (kg)</p>
                </div>
                <div className={`text-center p-3 rounded-xl border ${
                    (data[data.length - 1]?.z_weight || 0) >= 0 
                        ? "bg-gradient-to-br from-emerald-100 to-teal-50 border-emerald-200" 
                        : "bg-gradient-to-br from-orange-100 to-amber-50 border-orange-200"
                }`}>
                    <p className={`text-lg font-bold ${
                        (data[data.length - 1]?.z_weight || 0) >= 0 ? "text-emerald-700" : "text-orange-700"
                    }`}>{data[data.length - 1]?.z_weight?.toFixed(1) || 0}</p>
                    <p className={`text-xs ${
                        (data[data.length - 1]?.z_weight || 0) >= 0 ? "text-emerald-600" : "text-orange-600"
                    }`}>Z-Score BB</p>
                </div>
                <div className={`text-center p-3 rounded-xl border ${
                    (data[data.length - 1]?.z_height || 0) >= 0 
                        ? "bg-gradient-to-br from-emerald-100 to-teal-50 border-emerald-200" 
                        : "bg-gradient-to-br from-orange-100 to-amber-50 border-orange-200"
                }`}>
                    <p className={`text-lg font-bold ${
                        (data[data.length - 1]?.z_height || 0) >= 0 ? "text-emerald-700" : "text-orange-700"
                    }`}>{data[data.length - 1]?.z_height?.toFixed(1) || 0}</p>
                    <p className={`text-xs ${
                        (data[data.length - 1]?.z_height || 0) >= 0 ? "text-emerald-600" : "text-orange-600"
                    }`}>Z-Score TB</p>
                </div>
            </div>
        </div>
    );
}
