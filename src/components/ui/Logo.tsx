"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (variant === "white") {
    return (
      <Image
        src="/logo.svg"
        alt="Elektro Master"
        width={s.width}
        height={s.height}
        priority
        className={cn("brightness-0 invert", className)}
      />
    );
  }

  const src = mounted && resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg";

  return (
    <Image
      src={src}
      alt="Elektro Master"
      width={s.width}
      height={s.height}
      priority
      className={className}
    />
  );
}
