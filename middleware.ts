import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RUTE_TERPROTEKSI = ["/dashboard", "/beranda"];
const RUTE_AUTH = ["/login", "/daftar"];
const NAMA_TOKEN = "auth_token";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const adalahRuteTerproteksi = RUTE_TERPROTEKSI.some((rute) => pathname.startsWith(rute));
    const adalahRuteAuth = RUTE_AUTH.some((rute) => pathname === rute);
    const token = request.cookies.get(NAMA_TOKEN)?.value;

    if (!token && adalahRuteTerproteksi) {
        const urlLogin = new URL("/login", request.url);
        urlLogin.searchParams.set("kembali", pathname);
        return NextResponse.redirect(urlLogin);
    }

    // Jangan redirect otomatis dari halaman auth jika sudah login
    // Biarkan halaman login handle redirect berdasarkan role user
    // Ini mencegah user ortu di-redirect ke /dashboard

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
};
