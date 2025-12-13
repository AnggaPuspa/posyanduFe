"use client";

import { useState, useEffect } from "react";
import { LogIn, X, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui";

export function FloatingLoginButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <TransitionLink
            href="/login"
            className="group flex items-center gap-3 pl-4 pr-5 py-3 bg-white rounded-full shadow-lg border border-stone-200/60 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-shadow">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                Login Orang Tua
              </p>
              <p className="text-xs text-stone-500">Pantau tumbuh kembang anak</p>
            </div>
          </TransitionLink>

          <TransitionLink
            href="/login"
            className="group flex items-center gap-3 pl-4 pr-5 py-3 bg-white rounded-full shadow-lg border border-stone-200/60 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200 group-hover:shadow-orange-300 transition-shadow">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-stone-800" style={{ fontFamily: 'var(--font-nunito)' }}>
                Login Kader
              </p>
              <p className="text-xs text-stone-500">Kelola data Posyandu</p>
            </div>
          </TransitionLink>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "group relative h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110",
          isExpanded
            ? "bg-stone-800 hover:bg-stone-700 rotate-0"
            : "bg-gradient-to-br from-emerald-400 to-teal-500 hover:shadow-emerald-300/50"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isExpanded ? (
          <X className="w-6 h-6 text-white transition-transform duration-300" />
        ) : (
          <LogIn className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </button>

      {!isExpanded && (
        <div className="absolute bottom-0 right-16 whitespace-nowrap bg-stone-800 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Masuk ke Dashboard
        </div>
      )}
    </div>
  );
}
