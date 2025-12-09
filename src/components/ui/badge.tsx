import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  success: "bg-emerald-100 text-emerald-600",
  warning: "bg-amber-100 text-amber-600",
  danger: "bg-rose-100 text-rose-600",
  info: "bg-sky-100 text-sky-600",
  neutral: "bg-stone-100 text-stone-600",
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "normal" | "kuning" | "merah" | string }) {
  const config: Record<string, { variant: BadgeProps["variant"]; label: string }> = {
    normal: { variant: "success", label: "Sehat" },
    hijau: { variant: "success", label: "Normal" },
    kuning: { variant: "warning", label: "Perlu Perhatian" },
    merah: { variant: "danger", label: "Berisiko" },
  };
  const c = config[status] || config.normal;
  return <Badge variant={c.variant}>{c.label}</Badge>;
}

export default Badge;
