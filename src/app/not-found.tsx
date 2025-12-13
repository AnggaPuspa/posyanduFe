"use client";

import { TransitionLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center">
        
        <div className="mb-8 animate-[fadeIn_0.4s_ease-out_forwards]">
          <svg 
            className="w-48 h-48 mx-auto" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="#E2E8F0" strokeWidth="4" strokeDasharray="8 8" />
            
            <circle cx="100" cy="85" r="35" fill="#F0FDF4" stroke="#10B981" strokeWidth="3" />
            <path 
              d="M92 85 L100 93 L115 78" 
              stroke="#10B981" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.3"
            />
            <text x="100" y="92" textAnchor="middle" fill="#10B981" fontSize="24" fontWeight="bold">?</text>
            
            <circle cx="65" cy="140" r="4" fill="#10B981" opacity="0.6" />
            <circle cx="135" cy="140" r="4" fill="#10B981" opacity="0.6" />
            <circle cx="100" cy="155" r="3" fill="#10B981" opacity="0.4" />
            
            <path 
              d="M60 160 Q100 175 140 160" 
              stroke="#E2E8F0" 
              strokeWidth="2" 
              strokeLinecap="round"
              fill="none"
            />
            
            <text x="100" y="45" textAnchor="middle" fill="#CBD5E1" fontSize="16" fontWeight="600">404</text>
          </svg>
        </div>

        <h1 
          className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 opacity-0 animate-[fadeInUp_0.4s_ease-out_0.1s_forwards]"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto opacity-0 animate-[fadeInUp_0.4s_ease-out_0.2s_forwards]">
          Sepertinya Anda tersesat. Jangan khawatir, kami bantu Anda kembali ke jalur yang benar.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 opacity-0 animate-[fadeInUp_0.4s_ease-out_0.3s_forwards]">
          <TransitionLink href="/">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Beranda
            </button>
          </TransitionLink>

          <TransitionLink href="/tentang-kami">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-500 hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Tentang Kami
            </button>
          </TransitionLink>
        </div>

        <div className="opacity-0 animate-[fadeInUp_0.4s_ease-out_0.4s_forwards]">
          <p className="text-sm text-stone-400 mb-4">Atau coba halaman ini:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <TransitionLink href="/" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
              Beranda
            </TransitionLink>
            <TransitionLink href="/tentang-kami" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
              Tentang Kami
            </TransitionLink>
            <TransitionLink href="/mitra-kerjasama" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
              Mitra
            </TransitionLink>
            <a href="#kontak" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
              Kontak
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-200 opacity-0 animate-[fadeInUp_0.4s_ease-out_0.5s_forwards]">
          <TransitionLink href="/" className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-600 transition-colors">
            <span className="font-bold text-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              Posyandu
            </span>
            <span className="font-bold text-lg text-emerald-500">+</span>
          </TransitionLink>
        </div>

      </div>
    </main>
  );
}
