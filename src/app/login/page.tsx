"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual & Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070')`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-emerald-900/60 to-slate-900/90" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 w-fit">
            <span className="font-bold text-2xl text-white" style={{ fontFamily: 'var(--font-nunito)' }}>
              Posyandu
            </span>
            <span className="font-bold text-2xl text-emerald-400">+</span>
          </Link>
          
          {/* Quote */}
          <div className="max-w-lg">
            <blockquote className="text-3xl xl:text-4xl font-light text-white leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              "Memantau tumbuh kembang anak kini semudah sentuhan jari."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-emerald-400" />
              <p className="text-emerald-300 font-medium">Platform Posyandu Digital Indonesia</p>
            </div>
          </div>
          
          {/* Footer */}
          <p className="text-slate-400 text-sm">
            © 2025 Kementerian Kesehatan Republik Indonesia
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 md:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-bold text-2xl text-slate-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                Posyandu
              </span>
              <span className="font-bold text-2xl text-emerald-500">+</span>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
              Selamat Datang Kembali! 👋
            </h1>
            <p className="text-slate-500">
              Masuk untuk mengelola data Posyandu Anda
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@posyandu.id"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Lupa Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Ingat saya di perangkat ini
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-105 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-8 text-slate-600">
            Belum punya akun?{" "}
            <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
