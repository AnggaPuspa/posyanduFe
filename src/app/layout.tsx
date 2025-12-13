import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ConfirmProvider } from "@/components/providers/confirm-provider";
import { ParallaxProvider } from "@/components/providers/parallax-provider";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Posyandu Plus",
  description: "Sistem Informasi Posyandu Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-stone-50 antialiased" style={{ fontFamily: 'var(--font-nunito), var(--font-inter), system-ui, sans-serif' }}>
        <PageTransitionProvider>
          <ParallaxProvider>
            <ToastProvider>
              <ConfirmProvider>{children}</ConfirmProvider>
            </ToastProvider>
          </ParallaxProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
