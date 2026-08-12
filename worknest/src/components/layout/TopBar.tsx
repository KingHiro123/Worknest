import type { ReactNode } from "react";
import { BellIcon } from "@/components/ui/icons";

export interface TopBarProps {
  children: ReactNode;
}

/** 54px header shell shared by every screen; each page composes its own content. */
export function TopBar({ children }: TopBarProps) {
  return (
    <header className="flex h-13.5 flex-none items-center gap-3.5 border-b border-line bg-surface px-5">
      {children}
    </header>
  );
}

export function NotificationBell() {
  return (
    <button type="button" aria-label="Notifications" className="flex-none text-muted hover:text-ink-soft">
      <BellIcon size={15} />
    </button>
  );
}

export function UserAvatar() {
  return <div aria-hidden className="h-6.5 w-6.5 flex-none rounded-full bg-avatar" />;
}
