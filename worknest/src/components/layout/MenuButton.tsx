"use client";

import { MenuIcon } from "@/components/ui/icons";
import { useSidebar } from "@/components/layout/SidebarContext";

/** Hamburger trigger that opens the mobile sidebar drawer. Hidden at md+. */
export function MenuButton() {
  const { toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Open menu"
      className="-ml-1 flex flex-none items-center justify-center p-1 text-ink-soft md:hidden"
    >
      <MenuIcon size={18} />
    </button>
  );
}
