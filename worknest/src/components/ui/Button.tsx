import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "soft" | "danger" | "ghost";
type Size = "sm" | "md";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-line bg-surface text-ink-soft hover:bg-bg",
  soft: "bg-accent-soft text-accent-strong hover:bg-accent-soft-line",
  danger: "border border-terracotta-line text-terracotta-strong hover:bg-terracotta-soft",
  ghost: "text-muted hover:bg-bg",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-7 px-3 text-[11px]",
  md: "h-7.5 px-3.5 text-[11.5px]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex flex-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    />
  );
}
