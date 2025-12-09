import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  gradient?: string;
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8 text-xs rounded-lg",
  md: "h-10 w-10 text-sm rounded-xl",
  lg: "h-12 w-12 text-base rounded-xl",
  xl: "h-16 w-16 text-xl rounded-2xl",
};

const gradients = [
  "from-sky-400 to-blue-500",
  "from-pink-400 to-rose-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",
  "from-cyan-400 to-blue-500",
  "from-rose-400 to-red-500",
  "from-lime-400 to-green-500",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getGradient(name: string): string {
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export function Avatar({ name, size = "md", gradient, className }: AvatarProps) {
  const initials = getInitials(name);
  const bg = gradient || getGradient(name);

  return (
    <div
      className={cn(
        "flex items-center justify-center font-semibold text-white shadow-md",
        `bg-gradient-to-br ${bg}`,
        sizeStyles[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

export default Avatar;
