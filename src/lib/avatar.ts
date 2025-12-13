type AvatarStyle = "avataaars" | "bottts" | "lorelei" | "notionists" | "personas";

interface AvatarConfig {
    style?: AvatarStyle;
    backgroundColor?: string;
    size?: number;
}

const DEFAULT_CONFIG: AvatarConfig = {
    style: "avataaars",
    backgroundColor: "b6e3f4",
    size: 80,
};

export function generateAvatarUrl(seed: string, config: AvatarConfig = {}): string {
    const { style, backgroundColor, size } = { ...DEFAULT_CONFIG, ...config };
    const encodedSeed = encodeURIComponent(seed || "default");

    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodedSeed}&backgroundColor=${backgroundColor}&size=${size}`;
}

export function getAdminAvatarUrl(name: string): string {
    return generateAvatarUrl(name, {
        style: "avataaars",
        backgroundColor: "b6e3f4",
    });
}

export function getUserAvatarUrl(name: string): string {
    return generateAvatarUrl(name, {
        style: "avataaars",
        backgroundColor: "ffd5dc",
    });
}

export function getAvatarByRole(name: string, role?: string): string {
    if (!role) return generateAvatarUrl(name);

    const roleNormalized = role.toLowerCase();

    if (roleNormalized === "ortu" || roleNormalized === "orang_tua") {
        return getUserAvatarUrl(name);
    }

    return getAdminAvatarUrl(name);
}
