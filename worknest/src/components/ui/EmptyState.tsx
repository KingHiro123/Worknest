import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
      {icon && (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          {icon}
        </div>
      )}
      <div className="text-[14px] font-semibold text-ink">{title}</div>
      {description && <p className="max-w-[320px] text-[12px] leading-relaxed text-muted">{description}</p>}
      {action}
    </div>
  );
}
