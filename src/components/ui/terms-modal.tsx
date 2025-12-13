"use client";

import { useState, useEffect, useRef } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasScrolledToBottom(false);
      setIsChecked(false);
      document.body.style.overflow = "hidden";
      
      setTimeout(() => {
        if (contentRef.current) {
          const { scrollHeight, clientHeight } = contentRef.current;
          if (scrollHeight <= clientHeight) {
            setHasScrolledToBottom(true);
          }
        }
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      if (isNearBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleCheckboxClick = () => {
    if (!hasScrolledToBottom) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setIsChecked(!isChecked);
  };

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      <div 
        className="relative w-full max-w-[600px] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h2 
            id="terms-modal-title"
            className="text-lg font-bold text-stone-800"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Syarat dan Ketentuan Kemitraan
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Tutup modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div 
            ref={contentRef}
            onScroll={handleScroll}
            className="h-full max-h-[60vh] overflow-y-auto px-6 py-5 text-sm text-stone-600 leading-relaxed scroll-smooth"
            style={{ 
              scrollbarWidth: "thin",
              scrollbarColor: "#10b981 #e5e7eb"
            }}
          >
            <div className="space-y-5 pb-8">
              <p className="text-xs text-stone-400">Terakhir diperbarui: 13 Desember 2025</p>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">1. PENDAHULUAN</h3>
                <p>Dengan mendaftar sebagai mitra Posyandu Pintar, Anda setuju untuk terikat dengan syarat dan ketentuan berikut.</p>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">2. KEWAJIBAN MITRA</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Menyediakan data yang akurat dan dapat dipertanggungjawabkan</li>
                  <li>Menjaga kerahasiaan akun dan password</li>
                  <li>Menggunakan platform sesuai dengan tujuan yang telah ditentukan</li>
                  <li>Melaporkan setiap insiden atau masalah teknis kepada tim support</li>
                  <li>Memastikan kader posyandu terlatih dalam penggunaan platform</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">3. HAK MITRA</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Akses penuh ke platform dan fitur yang tersedia</li>
                  <li>Dukungan teknis dari tim Posyandu Pintar</li>
                  <li>Training dan material edukasi</li>
                  <li>Update fitur dan improvement berkelanjutan</li>
                  <li>Data analytics dan reporting</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">4. PRIVASI DAN KEAMANAN DATA</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Data personal akan dijaga kerahasiaannya sesuai regulasi yang berlaku</li>
                  <li>Data kesehatan masyarakat akan dienkripsi dan tersimpan aman</li>
                  <li>Tidak ada penjualan data personal kepada pihak ketiga</li>
                  <li>Data agregat anonymous dapat digunakan untuk research dan improvement</li>
                  <li>Compliance dengan UU Perlindungan Data Personal (UU PDP)</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">5. PENGGUNAAN PLATFORM</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Platform hanya boleh digunakan untuk kepentingan pelayanan kesehatan posyandu</li>
                  <li>Dilarang menyalahgunakan platform untuk tujuan komersial pribadi</li>
                  <li>Dilarang mendistribusikan akses kepada pihak tidak berwenang</li>
                  <li>Dilarang merusak atau mengganggu sistem</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">6. MASA BERLAKU KEMITRAAN</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kemitraan berlaku sejak akun diaktivasi</li>
                  <li>Dapat diakhiri oleh salah satu pihak dengan pemberitahuan 30 hari sebelumnya</li>
                  <li>Posyandu Pintar berhak menonaktifkan akun jika terjadi pelanggaran</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">7. PERUBAHAN SYARAT DAN KETENTUAN</h3>
                <p>Posyandu Pintar berhak mengubah syarat dan ketentuan ini. Perubahan akan diberitahukan via email dan akan berlaku 14 hari setelah pemberitahuan.</p>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">8. BATASAN TANGGUNG JAWAB</h3>
                <p className="mb-2">Posyandu Pintar tidak bertanggung jawab atas:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kesalahan input data oleh pengguna</li>
                  <li>Kerugian akibat force majeure</li>
                  <li>Gangguan internet atau jaringan di luar kontrol kami</li>
                  <li>Keputusan medis yang dibuat berdasarkan data dari platform</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">9. PENYELESAIAN SENGKETA</h3>
                <p>Segala sengketa akan diselesaikan secara musyawarah. Jika tidak tercapai kesepakatan, akan diselesaikan melalui jalur hukum yang berlaku di Indonesia.</p>
              </section>

              <section>
                <h3 className="font-semibold text-stone-800 mb-2">10. KONTAK</h3>
                <p className="mb-2">Untuk pertanyaan terkait syarat dan ketentuan ini, hubungi:</p>
                <p>Email: info@posyanduplus.id</p>
                <p>Telepon: 021-2121-8888</p>
              </section>

              <div className="pt-4 border-t border-stone-200">
                <p className="font-medium text-stone-700">
                  Dengan menyetujui syarat dan ketentuan ini, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan yang berlaku.
                </p>
              </div>
            </div>
          </div>

          {!hasScrolledToBottom && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none flex flex-col items-center justify-end pb-2">
              <span className="text-xs text-stone-400 mb-1">Scroll ke bawah untuk melanjutkan</span>
              <svg 
                className="w-4 h-4 text-stone-400 animate-bounce" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 rounded-b-xl">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label 
                className={`flex items-start gap-3 cursor-pointer ${!hasScrolledToBottom ? "opacity-50" : ""}`}
                onClick={(e) => {
                  if (!hasScrolledToBottom) {
                    e.preventDefault();
                    handleCheckboxClick();
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxClick}
                  disabled={!hasScrolledToBottom}
                  className={`mt-0.5 w-5 h-5 rounded border-2 transition-all ${
                    hasScrolledToBottom 
                      ? "border-emerald-500 text-emerald-500 focus:ring-emerald-500 cursor-pointer" 
                      : "border-stone-300 cursor-not-allowed"
                  } ${hasScrolledToBottom && !isChecked ? "animate-pulse ring-2 ring-emerald-200" : ""}`}
                />
                <span className={`text-sm ${hasScrolledToBottom ? "text-stone-700" : "text-stone-400"}`}>
                  Saya telah membaca dan menyetujui syarat dan ketentuan
                </span>
              </label>
              
              {showTooltip && (
                <div className="absolute left-0 -top-8 bg-stone-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2">
                  Scroll ke bawah terlebih dahulu
                  <div className="absolute left-4 -bottom-1 w-2 h-2 bg-stone-800 rotate-45" />
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleAccept}
                disabled={!isChecked}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  isChecked
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                Setuju
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
