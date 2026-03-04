import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "emergency" | "success";
  className?: string;
}

const variants = {
  primary: "bg-primary-100 text-primary-700",
  emergency: "bg-red-100 text-red-700",
  success: "bg-green-100 text-green-700",
};

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
