import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarContext";

export interface AppShellProps {
  workspaceName?: string;
  children: ReactNode;
}

/**
 * Shared page shell: sidebar + main content column. The sidebar is a static
 * column on md+ screens and an off-canvas drawer (toggled by MenuButton) on
 * phone-sized screens.
 */
export function AppShell({ workspaceName = "Studio Admin", children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-bg">
        <Sidebar workspaceName={workspaceName} />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </SidebarProvider>
  );
}
