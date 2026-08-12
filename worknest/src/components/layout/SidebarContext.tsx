"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

/**
 * Tracks whether the off-canvas mobile sidebar is open. Desktop layout ignores
 * this. No effect is needed to close it on navigation: each page mounts its
 * own AppShell/SidebarProvider, so routing to a different page already
 * remounts this provider with `open` back at its `false` default.
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, toggle: () => setOpen((v) => !v), close: () => setOpen(false) }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
