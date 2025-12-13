"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FloatingNav, Footer } from "@/components/layout";
import { TermsModal, TransitionLink } from "@/components/ui";

const STORAGE_KEY = "posyandu_mitra_form_draft";


const provinces = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
  "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua", "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan"
];

interface FormData {

  namaPosyandu: string;
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;

  namaKetua: string;
  telepon: string;
  email: string;
  jumlahKader: string;

  dokumenSK: File | null;
  fotoPosyandu: File | null;
  daftarKader: File | null;

  setujuSyarat: boolean;
  dataBenar: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function DaftarMitra() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    namaPosyandu: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    namaKetua: "",
    telepon: "",
    email: "",
    jumlahKader: "",
    dokumenSK: null,
    fotoPosyandu: null,
    daftarKader: null,
    setujuSyarat: false,
    dataBenar: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});


  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setFormData(prev => ({
          ...prev,
          namaPosyandu: parsed.namaPosyandu || "",
          alamat: parsed.alamat || "",
          kelurahan: parsed.kelurahan || "",
          kecamatan: parsed.kecamatan || "",
          kabupaten: parsed.kabupaten || "",
          provinsi: parsed.provinsi || "",
          namaKetua: parsed.namaKetua || "",
          telepon: parsed.telepon || "",
          email: parsed.email || "",
          jumlahKader: parsed.jumlahKader || "",
        }));

        if (parsed.currentStep) {
          setCurrentStep(parsed.currentStep);
        }
      } catch (e) {

        console.error("Failed to parse saved form data", e);
      }
    }
  }, []);


  useEffect(() => {
    const dataToSave = {
      namaPosyandu: formData.namaPosyandu,
      alamat: formData.alamat,
      kelurahan: formData.kelurahan,
      kecamatan: formData.kecamatan,
      kabupaten: formData.kabupaten,
      provinsi: formData.provinsi,
      namaKetua: formData.namaKetua,
      telepon: formData.telepon,
      email: formData.email,
      jumlahKader: formData.jumlahKader,
      currentStep: currentStep,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData, currentStep]);

  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const steps = [
    { id: 1, title: "Informasi Posyandu" },
    { id: 2, title: "Kontak" },
    { id: 3, title: "Dokumen" },
    { id: 4, title: "Review" },
  ];


  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.namaPosyandu.trim()) newErrors.namaPosyandu = "Nama posyandu wajib diisi";
    if (!formData.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
    if (!formData.kelurahan.trim()) newErrors.kelurahan = "Kelurahan wajib diisi";
    if (!formData.kecamatan.trim()) newErrors.kecamatan = "Kecamatan wajib diisi";
    if (!formData.kabupaten.trim()) newErrors.kabupaten = "Kabupaten/Kota wajib diisi";
    if (!formData.provinsi) newErrors.provinsi = "Provinsi wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};
    if (!formData.namaKetua.trim()) newErrors.namaKetua = "Nama ketua wajib diisi";
    if (!formData.telepon.trim()) {
      newErrors.telepon = "Nomor telepon wajib diisi";
    } else if (!/^08[0-9]{8,12}$/.test(formData.telepon.replace(/[-\s]/g, ""))) {
      newErrors.telepon = "Format nomor telepon tidak valid";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.jumlahKader.trim()) {
      newErrors.jumlahKader = "Jumlah kader wajib diisi";
    } else if (parseInt(formData.jumlahKader) < 1) {
      newErrors.jumlahKader = "Minimal 1 kader";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: FormErrors = {};
    if (!formData.dokumenSK) {
      newErrors.dokumenSK = "Dokumen SK RT/RW wajib diupload";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: FormErrors = {};
    if (!formData.setujuSyarat) newErrors.setujuSyarat = "Anda harus menyetujui syarat dan ketentuan";
    if (!formData.dataBenar) newErrors.dataBenar = "Anda harus mengkonfirmasi kebenaran data";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const regNum = `REG-2025-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;
    setRegistrationNumber(regNum);
    clearSavedData();
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [field]: "File terlalu besar, maksimal 2MB" }));
      return;
    }
    handleInputChange(field, file);
  };


  if (isSuccess) {
    return (
      <main className="min-h-screen bg-stone-50">
        <FloatingNav />
        
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 
              className="text-2xl md:text-3xl font-bold text-stone-800 mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Pendaftaran Berhasil!
            </h1>

            <p className="text-stone-600 mb-6">
              Terima kasih telah mendaftar sebagai mitra. Tim kami akan menghubungi Anda dalam 1-2 hari kerja melalui email <span className="font-semibold">{formData.email}</span> atau WhatsApp <span className="font-semibold">{formData.telepon}</span>.
            </p>

            <div className="bg-stone-100 rounded-xl p-4 mb-8">
              <p className="text-sm text-stone-500 mb-1">Nomor Pendaftaran</p>
              <p className="text-lg font-bold text-stone-800">{registrationNumber}</p>
            </div>

            <TransitionLink href="/">
              <button className="px-8 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-400 transition-colors">
                Kembali ke Beranda
              </button>
            </TransitionLink>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <FloatingNav />

      {/* Hero Section - Compact */}
      <section className="pt-28 pb-8 px-6 bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className="text-2xl md:text-3xl font-bold text-stone-800 mb-2"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Daftar Sebagai Mitra
          </h1>
          <p className="text-stone-500">
            Lengkapi formulir berikut untuk bergabung dengan ekosistem kesehatan digital
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-stone-200 -z-10" />
              <div 
                className="absolute top-4 left-0 h-0.5 bg-emerald-500 -z-10 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step.id < currentStep
                        ? "bg-emerald-500 text-white"
                        : step.id === currentStep
                        ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                        : "bg-stone-200 text-stone-500"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`mt-2 text-xs md:text-sm font-medium hidden md:block ${
                    step.id <= currentStep ? "text-stone-800" : "text-stone-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Mobile: Show current step title */}
            <p className="text-center mt-4 text-sm font-medium text-stone-600 md:hidden">
              Step {currentStep}: {steps[currentStep - 1].title}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10">
            
            {/* Step 1: Informasi Posyandu */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-stone-800 mb-6" style={{ fontFamily: "var(--font-nunito)" }}>
                  Informasi Posyandu
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Nama Posyandu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.namaPosyandu}
                    onChange={(e) => handleInputChange("namaPosyandu", e.target.value)}
                    placeholder="Contoh: Posyandu Melati 1"
                    className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.namaPosyandu ? "border-red-400 focus:border-red-400" : "border-stone-200 focus:border-emerald-500"
                    }`}
                  />
                  {errors.namaPosyandu && <p className="mt-1 text-sm text-red-500">{errors.namaPosyandu}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.alamat}
                    onChange={(e) => handleInputChange("alamat", e.target.value)}
                    placeholder="Jl. ..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg text-base resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.alamat ? "border-red-400 focus:border-red-400" : "border-stone-200 focus:border-emerald-500"
                    }`}
                  />
                  {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Kelurahan/Desa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kelurahan}
                      onChange={(e) => handleInputChange("kelurahan", e.target.value)}
                      className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.kelurahan ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                      }`}
                    />
                    {errors.kelurahan && <p className="mt-1 text-sm text-red-500">{errors.kelurahan}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Kecamatan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kecamatan}
                      onChange={(e) => handleInputChange("kecamatan", e.target.value)}
                      className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.kecamatan ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                      }`}
                    />
                    {errors.kecamatan && <p className="mt-1 text-sm text-red-500">{errors.kecamatan}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Kabupaten/Kota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kabupaten}
                      onChange={(e) => handleInputChange("kabupaten", e.target.value)}
                      className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.kabupaten ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                      }`}
                    />
                    {errors.kabupaten && <p className="mt-1 text-sm text-red-500">{errors.kabupaten}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Provinsi <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.provinsi}
                      onChange={(e) => handleInputChange("provinsi", e.target.value)}
                      className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white ${
                        errors.provinsi ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                      }`}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    {errors.provinsi && <p className="mt-1 text-sm text-red-500">{errors.provinsi}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Kontak & Penanggung Jawab */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-stone-800 mb-6" style={{ fontFamily: "var(--font-nunito)" }}>
                  Kontak & Penanggung Jawab
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Nama Ketua/Koordinator <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.namaKetua}
                    onChange={(e) => handleInputChange("namaKetua", e.target.value)}
                    placeholder="Nama lengkap"
                    className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.namaKetua ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                    }`}
                  />
                  {errors.namaKetua && <p className="mt-1 text-sm text-red-500">{errors.namaKetua}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Nomor Telepon/WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.telepon}
                    onChange={(e) => handleInputChange("telepon", e.target.value)}
                    placeholder="08xx-xxxx-xxxx"
                    className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.telepon ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                    }`}
                  />
                  {errors.telepon && <p className="mt-1 text-sm text-red-500">{errors.telepon}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.email ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Jumlah Kader Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.jumlahKader}
                    onChange={(e) => handleInputChange("jumlahKader", e.target.value)}
                    placeholder="Contoh: 5"
                    className={`w-full h-12 px-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      errors.jumlahKader ? "border-red-400" : "border-stone-200 focus:border-emerald-500"
                    }`}
                  />
                  {errors.jumlahKader && <p className="mt-1 text-sm text-red-500">{errors.jumlahKader}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Dokumen Pendukung */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-stone-800 mb-6" style={{ fontFamily: "var(--font-nunito)" }}>
                  Dokumen Pendukung
                </h2>

                {/* SK RT/RW - Required */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    SK RT/RW <span className="text-red-500">*</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    errors.dokumenSK ? "border-red-300 bg-red-50" : "border-stone-200 hover:border-emerald-300 bg-stone-50"
                  }`}>
                    {formData.dokumenSK ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-stone-700">{formData.dokumenSK.name}</p>
                            <p className="text-xs text-stone-500">{(formData.dokumenSK.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleInputChange("dokumenSK", null)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileChange("dokumenSK", e.target.files?.[0] || null)}
                        />
                        <div className="text-stone-400">
                          <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm font-medium">Klik untuk upload</p>
                          <p className="text-xs mt-1">PDF, JPG, PNG. Max 2MB</p>
                        </div>
                      </label>
                    )}
                  </div>
                  {errors.dokumenSK && <p className="mt-1 text-sm text-red-500">{errors.dokumenSK}</p>}
                </div>

                {/* Foto Posyandu - Optional */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Foto Posyandu <span className="text-stone-400 font-normal">(opsional)</span>
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center border-stone-200 hover:border-emerald-300 bg-stone-50">
                    {formData.fotoPosyandu ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-stone-700">{formData.fotoPosyandu.name}</p>
                            <p className="text-xs text-stone-500">{(formData.fotoPosyandu.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleInputChange("fotoPosyandu", null)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileChange("fotoPosyandu", e.target.files?.[0] || null)}
                        />
                        <div className="text-stone-400">
                          <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm font-medium">Klik untuk upload foto</p>
                          <p className="text-xs mt-1">JPG, PNG. Max 2MB</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Daftar Kader - Optional */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Daftar Kader <span className="text-stone-400 font-normal">(opsional)</span>
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center border-stone-200 hover:border-emerald-300 bg-stone-50">
                    {formData.daftarKader ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-stone-700">{formData.daftarKader.name}</p>
                            <p className="text-xs text-stone-500">{(formData.daftarKader.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleInputChange("daftarKader", null)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept=".pdf,.xlsx,.xls"
                          className="hidden"
                          onChange={(e) => handleFileChange("daftarKader", e.target.files?.[0] || null)}
                        />
                        <div className="text-stone-400">
                          <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-sm font-medium">Klik untuk upload</p>
                          <p className="text-xs mt-1">PDF, Excel. Max 2MB</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-stone-800 mb-6" style={{ fontFamily: "var(--font-nunito)" }}>
                  Review Data Pendaftaran
                </h2>

                {/* Summary Cards */}
                <div className="space-y-4">
                  {/* Informasi Posyandu */}
                  <div className="bg-stone-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Informasi Posyandu</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-emerald-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-stone-500">Nama:</span> <span className="text-stone-700">{formData.namaPosyandu}</span></p>
                      <p><span className="text-stone-500">Alamat:</span> <span className="text-stone-700">{formData.alamat}</span></p>
                      <p><span className="text-stone-500">Wilayah:</span> <span className="text-stone-700">{formData.kelurahan}, {formData.kecamatan}, {formData.kabupaten}, {formData.provinsi}</span></p>
                    </div>
                  </div>

                  {/* Kontak */}
                  <div className="bg-stone-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Kontak & Penanggung Jawab</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-sm text-emerald-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-stone-500">Nama Ketua:</span> <span className="text-stone-700">{formData.namaKetua}</span></p>
                      <p><span className="text-stone-500">Telepon:</span> <span className="text-stone-700">{formData.telepon}</span></p>
                      <p><span className="text-stone-500">Email:</span> <span className="text-stone-700">{formData.email}</span></p>
                      <p><span className="text-stone-500">Jumlah Kader:</span> <span className="text-stone-700">{formData.jumlahKader} orang</span></p>
                    </div>
                  </div>

                  {/* Dokumen */}
                  <div className="bg-stone-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-stone-700">Dokumen</h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-sm text-emerald-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-stone-500">SK RT/RW:</span> <span className="text-stone-700">{formData.dokumenSK?.name || "-"}</span></p>
                      <p><span className="text-stone-500">Foto Posyandu:</span> <span className="text-stone-700">{formData.fotoPosyandu?.name || "-"}</span></p>
                      <p><span className="text-stone-500">Daftar Kader:</span> <span className="text-stone-700">{formData.daftarKader?.name || "-"}</span></p>
                    </div>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div 
                    className={`flex items-start gap-3 cursor-pointer ${errors.setujuSyarat ? "text-red-500" : ""}`}
                    onClick={() => {
                      if (!formData.setujuSyarat) {
                        setIsTermsModalOpen(true);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.setujuSyarat}
                      onChange={(e) => {
                        if (formData.setujuSyarat) {
                          handleInputChange("setujuSyarat", false);
                        } else {
                          e.preventDefault();
                          setIsTermsModalOpen(true);
                        }
                      }}
                      className="mt-1 w-4 h-4 rounded border-stone-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-sm text-stone-600">
                      Saya menyetujui{" "}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTermsModalOpen(true);
                        }}
                        className="text-emerald-600 hover:underline font-medium"
                      >
                        syarat dan ketentuan
                      </button>
                      {" "}yang berlaku.
                    </span>
                  </div>
                  {errors.setujuSyarat && <p className="text-sm text-red-500 ml-7">{errors.setujuSyarat}</p>}

                  <label className={`flex items-start gap-3 cursor-pointer ${errors.dataBenar ? "text-red-500" : ""}`}>
                    <input
                      type="checkbox"
                      checked={formData.dataBenar}
                      onChange={(e) => handleInputChange("dataBenar", e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-stone-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-stone-600">
                      Data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
                    </span>
                  </label>
                  {errors.dataBenar && <p className="text-sm text-red-500 ml-7">{errors.dataBenar}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "text-stone-300 cursor-not-allowed"
                    : "text-stone-600 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-400 transition-colors"
                >
                  Lanjut
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Pendaftaran
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => {
          handleInputChange("setujuSyarat", true);
          setIsTermsModalOpen(false);
        }}
      />
    </main>
  );
}
