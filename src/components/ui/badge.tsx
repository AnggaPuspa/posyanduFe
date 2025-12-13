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

export function StatusBadge({ status }: { status: string }) {
  const statusLower = status?.toLowerCase()?.trim() || "";
  
  let variant: BadgeProps["variant"] = "success";
  let label = "Sehat";
  
  if (statusLower.includes("buruk") || statusLower.includes("stunting") || statusLower.includes("sangat kurang")) {
    variant = "danger";
    label = "Gizi Buruk";
  } else if (statusLower.includes("kurang")) {
    variant = "warning";
    label = "Gizi Kurang";
  } else if (statusLower.includes("lebih") || statusLower.includes("obesitas") || statusLower.includes("overweight")) {
    variant = "warning";
    label = "Gizi Lebih";
  } else if (statusLower.includes("baik") || statusLower.includes("normal") || statusLower.includes("sehat")) {
    variant = "success";
    label = "Gizi Baik";
  } else if (statusLower === "merah" || statusLower === "berisiko") {
    variant = "danger";
    label = "Berisiko";
  } else if (statusLower === "kuning" || statusLower === "perhatian") {
    variant = "warning";
    label = "Perlu Perhatian";
  } else if (statusLower === "hijau") {
    variant = "success";
    label = "Normal";
  } else if (statusLower.includes("error") || statusLower.includes("gagal")) {
    variant = "neutral";
    label = "Error";
  }
  
  return <Badge variant={variant}>{label}</Badge>;
}

export default Badge;
