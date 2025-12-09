"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Peta", href: "#peta" },
  { label: "Kontak", href: "#kontak" },
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Ultra-Slim Floating Nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div 
          className={`
            flex items-center gap-2 px-2 rounded-full transition-all duration-500 ease-out
            bg-white/60 backdrop-blur-xl border border-white/40 
            shadow-lg shadow-emerald-500/10
            ${scrolled ? 'h-11 scale-[0.97]' : 'h-12'}
          `}
        >
          {/* Logo - Minimal */}
          <Link href="/" className="flex items-center gap-1 pl-3 pr-1">
            <span className="font-bold text-sm text-stone-700" style={{ fontFamily: 'var(--font-nunito)' }}>
              Posyandu
            </span>
            <span className="font-bold text-sm text-emerald-500">+</span>
          </Link>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-stone-200/60" />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-medium text-stone-500 hover:text-emerald-600 transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-px bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-stone-200/60" />

          {/* CTA Button - Compact */}
          <Link
            href="/dashboard"
            className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Login
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden h-8 w-8 rounded-full bg-stone-100/80 flex items-center justify-center text-stone-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all mr-1"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown - Compact */}
        <div className={`
          md:hidden mt-2 overflow-hidden rounded-2xl transition-all duration-300 ease-out
          bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl shadow-emerald-500/10
          ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="p-3">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-600 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20"
            >
              Login Kader
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
