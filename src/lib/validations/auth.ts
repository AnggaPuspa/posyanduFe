export interface HasilValidasi {
    valid: boolean;
    pesan: string;
}

export interface ErrorValidasiLogin {
    email?: string;
    password?: string;
}

export function validasiEmail(email: string): HasilValidasi {
    if (!email || email.trim() === "") {
        return { valid: false, pesan: "Email tidak boleh kosong" };
    }

    const polEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!polEmail.test(email)) {
        return { valid: false, pesan: "Format email tidak valid" };
    }

    return { valid: true, pesan: "" };
}

export function validasiPassword(password: string): HasilValidasi {
    if (!password || password.trim() === "") {
        return { valid: false, pesan: "Password tidak boleh kosong" };
    }

    if (password.length < 6) {
        return { valid: false, pesan: "Password minimal 6 karakter" };
    }

    return { valid: true, pesan: "" };
}

export function validasiFormLogin(email: string, password: string): ErrorValidasiLogin {
    const errors: ErrorValidasiLogin = {};

    const hasilEmail = validasiEmail(email);
    if (!hasilEmail.valid) errors.email = hasilEmail.pesan;

    const hasilPassword = validasiPassword(password);
    if (!hasilPassword.valid) errors.password = hasilPassword.pesan;

    return errors;
}

export function adaErrorValidasi(errors: ErrorValidasiLogin): boolean {
    return Object.keys(errors).length > 0;
}
