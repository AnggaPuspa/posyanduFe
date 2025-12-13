"use client";

import { useState } from "react";
import { FloatingNav, Footer } from "@/components/layout";
import { FloatingLoginButton } from "@/components/layout/floating-login";

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    setFormData({ nama: "", email: "", pesan: "" });
  };

  return (
    <main className="min-h-screen bg-white">
      <FloatingNav />
      <FloatingLoginButton />

      {/* Header */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-emerald-600 text-sm font-medium mb-3">Kontak</p>
          <h1 
            className="text-2xl md:text-3xl font-bold text-stone-800 mb-3"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Ada pertanyaan?
          </h1>
          <p className="text-stone-500">
            Kami senang mendengar dari Anda. Kirim pesan dan tim kami akan merespons dalam 1-2 hari kerja.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            
            {/* Contact Info - Left */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <p className="text-sm font-medium text-stone-800 mb-1">Surel</p>
                <a 
                  href="mailto:info@posyanduplus.id" 
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  info@posyanduplus.id
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium text-stone-800 mb-1">WhatsApp</p>
                <a 
                  href="https://wa.me/628001234567" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  +62 800-123-4567
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium text-stone-800 mb-1">Alamat</p>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Jl. Kesehatan No. 1, RT.01/RW.01,<br />
                  Kel. Sehat, Kec. Sejahtera,<br />
                  Kota Indonesia Sehat,<br />
                  Indonesia 10110
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-stone-800 mb-1">Jam Operasional</p>
                <p className="text-stone-500 text-sm">
                  Senin - Jumat, 09:00 - 17:00 WIB
                </p>
              </div>
            </div>

            {/* Form - Right */}
            <div className="md:col-span-3">
              {isSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-xl text-center">
                  <p className="text-emerald-700 font-medium mb-1">Pesan terkirim!</p>
                  <p className="text-emerald-600 text-sm">Kami akan segera menghubungi Anda.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 text-sm text-emerald-600 hover:underline"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      required
                      className="w-full h-11 px-4 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full h-11 px-4 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                      placeholder="email@contoh.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Pesan
                    </label>
                    <textarea
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-stone-200 rounded-lg text-stone-800 resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                      placeholder="Tulis pesan Anda..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Kirim Pesan"
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
