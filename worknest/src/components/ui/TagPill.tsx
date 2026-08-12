import type { ReactNode } from "react";

export type TagTone = "high" | "medium" | "low" | "neutral" | "accent" | "filterActive" | "filterInactive";
type TagSize = "sm" | "md";

const TONE_CLASSES: Record<TagTone, string> = {
  high: "bg-terracotta-soft text-terracotta-strong",
  medium: "bg-amber-soft text-amber-strong",
  low: "bg-green-soft text-green-strong",
  neutral: "bg-[#F5F2EC] text-muted",
  accent: "bg-accent-soft text-accent-strong",
  filterActive: "border border-accent-soft-line bg-accent-soft text-accent-strong",
  filterInactive: "border border-line bg-surface text-muted",
};

const SIZE_CLASSES: Record<TagSize, string> = {
  sm: "px-2 py-[3px] text-[9.5px]",
  md: "px-3 py-1.5 text-[11px]",
};

export interface TagPillProps {
  tone?: TagTone;
  size?: TagSize;
  className?: string;
  children: ReactNode;
}

export function TagPill({ tone = "neutral", size = "sm", className = "", children }: TagPillProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full font-semibold ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </span>
  );
}
