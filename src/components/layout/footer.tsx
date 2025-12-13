"use client";

import Link from "next/link";
import { Instagram, Globe } from "lucide-react";
import { TransitionLink } from "@/components/ui";

const lamanTerkait = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Mitra & Kerjasama", href: "/mitra-kerjasama" },
  { label: "Hubungi Kami", href: "#kontak" },
];

export function Footer() {
  return (
    <footer id="kontak" className="bg-slate-900" style={{ transform: 'translateZ(0)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-14">
        <div className="grid gap-10 md:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex items-center gap-1 mb-2">
              <span className="font-bold text-2xl text-white" style={{ fontFamily: 'var(--font-nunito)' }}>
                Posyandu
              </span>
              <span className="font-bold text-2xl text-emerald-400">+</span>
            </Link>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold text-white mb-3">
              Alamat
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Jl. Kesehatan No. 1, RT.01/RW.01, Kel. Sehat,<br />
              Kec. Sejahtera, Kota Indonesia Sehat,<br />
              Indonesia 10110
            </p>
            
            <h3 className="text-sm font-semibold text-white mb-2">
              Surel
            </h3>
            <a 
              href="mailto:info@posyanduplus.id" 
              className="text-teal-400 hover:text-teal-300 text-sm transition-colors"
            >
              info@posyanduplus.id
            </a>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-3">
              Laman terkait
            </h3>
            <ul className="space-y-2">
              {lamanTerkait.map((link) => (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Ketentuan Penggunaan
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                <Globe className="w-4 h-4" />
                <span>Bahasa Indonesia</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <a 
                href="https://instagram.com/posyanduplus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@posyanduplus</span>
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-slate-500 text-xs">
              Hak cipta © 2025 Posyandu+. Seluruh hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
