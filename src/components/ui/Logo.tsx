import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "color" | "white";
  className?: string;
}

const sizes = {
  sm: { width: 180, height: 32 },
  md: { width: 220, height: 40 },
  lg: { width: 280, height: 48 },
};

export function Logo({ size = "md", variant = "color", className }: LogoProps) {
  const s = sizes[size];

  return (
    <Image
      src="/logo.svg"
      alt="Elektro Master"
      width={s.width}
      height={s.height}
      priority
      className={cn(variant === "white" ? "brightness-0 invert" : "", className)}
    />
  );
}
