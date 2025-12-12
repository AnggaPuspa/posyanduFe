"use client";

import { useState, useCallback, useEffect, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Stethoscope, Users } from "lucide-react";
import { Spinner } from "@/components/ui";
import { authService } from "@/services";
import { simpanToken } from "@/lib/api-client";
import { validasiFormLogin, adaErrorValidasi, ErrorValidasiLogin } from "@/lib/validations";
import { pakeToast } from "@/components/providers/toast-provider";
import { KONFIGURASI_AUTH, PESAN_AUTH } from "@/config";
import type { DataLogin, ErrorApi } from "@/types";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { tampilkanSukses, tampilkanError } = pakeToast();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [tampilkanPassword, setTampilkanPassword] = useState(false);
    const [ingatSaya, setIngatSaya] = useState(false);
    const [errors, setErrors] = useState<ErrorValidasiLogin>({});
    const [sedangMemuat, setSedangMemuat] = useState(false);
    const [sedangMengecekAuth, setSedangMengecekAuth] = useState(true);

    useEffect(() => {
        const cekAuthDanRedirect = async () => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem(KONFIGURASI_AUTH.NAMA_TOKEN);
                if (token) {
                    try {
                        // Ambil profil untuk dapat role user
                        const user = await authService.ambilProfil();
                        const halamanTujuan = searchParams.get("kembali") || 
                            KONFIGURASI_AUTH.HALAMAN_SESUAI_ROLE[user.role] || 
                            KONFIGURASI_AUTH.HALAMAN_DEFAULT;
                        router.replace(halamanTujuan);
                        return;
                    } catch {
                        // Token invalid, lanjut ke form login
                    }
                }
            }
            setSedangMengecekAuth(false);
        };
        
        cekAuthDanRedirect();
    }, [router, searchParams]);

    const handleChange = useCallback((field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field as keyof ErrorValidasiLogin]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasilValidasi = validasiFormLogin(formData.email, formData.password);
        if (adaErrorValidasi(hasilValidasi)) {
            setErrors(hasilValidasi);
            return;
        }

        setErrors({});
        setSedangMemuat(true);

        try {
            const dataLogin: DataLogin = { email: formData.email, password: formData.password };
            const respon = await authService.login(dataLogin);

            simpanToken(respon.token);
            tampilkanSukses(PESAN_AUTH.LOGIN_BERHASIL);

            const halamanTujuan = searchParams.get("kembali") || KONFIGURASI_AUTH.HALAMAN_SESUAI_ROLE[respon.user.role] || KONFIGURASI_AUTH.HALAMAN_DEFAULT;
            
            // Gunakan window.location untuk redirect yang lebih reliable di production
            setTimeout(() => {
                window.location.href = halamanTujuan;
            }, 500);
        } catch (error) {
            const errorApi = error as ErrorApi;

            if (errorApi.status === 401) {
                tampilkanError(PESAN_AUTH.KREDENSIAL_SALAH);
                setErrors({ email: " ", password: PESAN_AUTH.KREDENSIAL_SALAH });
            } else if (errorApi.errors) {
                const serverErrors: ErrorValidasiLogin = {};
                if (errorApi.errors.email) serverErrors.email = errorApi.errors.email[0];
                if (errorApi.errors.password) serverErrors.password = errorApi.errors.password[0];
                setErrors(serverErrors);
            } else {
                tampilkanError(errorApi.pesan || PESAN_AUTH.TERJADI_KESALAHAN);
            }
        } finally {
            setSedangMemuat(false);
        }
    };

    if (sedangMengecekAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" />
                    <p className="text-slate-500" style={{ fontFamily: 'var(--font-nunito)' }}>
                        {PESAN_AUTH.MEMERIKSA_LOGIN}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${KONFIGURASI_AUTH.GAMBAR_LATAR}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-emerald-900/60 to-slate-900/90" />
                <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <Link href="/" className="inline-flex items-center gap-2 w-fit">
                        <span className="font-bold text-2xl text-white" style={{ fontFamily: 'var(--font-nunito)' }}>
                            Posyandu
                        </span>
                        <span className="font-bold text-2xl text-emerald-400">+</span>
                    </Link>
                    
                    <div className="max-w-lg">
                        <blockquote className="text-3xl xl:text-4xl font-light text-white leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                            "{PESAN_AUTH.KUTIPAN}"
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-emerald-400" />
                            <p className="text-emerald-300 font-medium">{PESAN_AUTH.TAGLINE}</p>
                        </div>
                    </div>
                    
                    <p className="text-slate-400 text-sm">{PESAN_AUTH.HAK_CIPTA}</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 md:p-12 bg-slate-50">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <span className="font-bold text-2xl text-slate-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                                Posyandu
                            </span>
                            <span className="font-bold text-2xl text-emerald-500">+</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                            {PESAN_AUTH.JUDUL_HALAMAN}
                        </h1>
                        <p className="text-slate-500">{PESAN_AUTH.DESKRIPSI}</p>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs text-slate-400">Demo:</span>
                        <button
                            type="button"
                            onClick={() => setFormData({ email: "pos1@example.com", password: "password" })}
                            className="px-3 py-1.5 text-xs font-medium rounded-full border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 transition-all flex items-center gap-1.5"
                        >
                            <Stethoscope className="w-3 h-3" />
                            Kader
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ email: "ortu1@example.com", password: "password" })}
                            className="px-3 py-1.5 text-xs font-medium rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-1.5"
                        >
                            <Users className="w-3 h-3" />
                            Orang Tua
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">{PESAN_AUTH.LABEL_EMAIL}</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange("email")}
                                    placeholder={PESAN_AUTH.PLACEHOLDER_EMAIL}
                                    disabled={sedangMemuat}
                                    className={`w-full pl-12 pr-4 py-3.5 bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"}`}
                                    required
                                />
                            </div>
                            {errors.email?.trim() && <p className="text-sm text-rose-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700">{PESAN_AUTH.LABEL_PASSWORD}</label>
                                <Link href="/lupa-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                    {PESAN_AUTH.LUPA_PASSWORD}
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={tampilkanPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange("password")}
                                    placeholder={PESAN_AUTH.PLACEHOLDER_PASSWORD}
                                    disabled={sedangMemuat}
                                    className={`w-full pl-12 pr-12 py-3.5 bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.password ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setTampilkanPassword(!tampilkanPassword)}
                                    disabled={sedangMemuat}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                                    aria-label={tampilkanPassword ? "Sembunyikan password" : "Tampilkan password"}
                                >
                                    {tampilkanPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password?.trim() && <p className="text-sm text-rose-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={ingatSaya}
                                onChange={(e) => setIngatSaya(e.target.checked)}
                                disabled={sedangMemuat}
                                className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 disabled:opacity-50"
                            />
                            <label htmlFor="remember" className="text-sm text-slate-600">{PESAN_AUTH.LABEL_INGAT_SAYA}</label>
                        </div>

                        <button
                            type="submit"
                            disabled={sedangMemuat}
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-105 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {sedangMemuat ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {PESAN_AUTH.TOMBOL_MASUK}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-600">
                        {PESAN_AUTH.BELUM_PUNYA_AKUN}{" "}
                        <Link href="/daftar" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                            {PESAN_AUTH.DAFTAR_SEKARANG}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Spinner size="lg" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
