"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArchiveIcon,
  BoardsIcon,
  ChevronDownIcon,
  DashboardIcon,
  GearIcon,
  NotesIcon,
  TemplatesIcon,
  XIcon,
  type IconProps,
} from "@/components/ui/icons";
import { useSidebar } from "@/components/layout/SidebarContext";
import { workspaces } from "@/lib/data";

const NAV_ITEMS: { label: string; href: string; icon: (props: IconProps) => React.ReactElement }[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Notes", href: "/notes", icon: NotesIcon },
  { label: "Boards", href: "/boards", icon: BoardsIcon },
  { label: "Templates", href: "/templates", icon: TemplatesIcon },
  { label: "Archive", href: "/archive", icon: ArchiveIcon },
];

export interface SidebarProps {
  workspaceName?: string;
}

export function Sidebar({ workspaceName = "Studio Admin" }: SidebarProps) {
  const pathname = usePathname();
  const { open, close } = useSidebar();

  return (
    <>
      {open && (
        <div
          role="presentation"
          onClick={close}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-52 flex-none flex-col border-r border-line bg-surface p-3 transition-transform duration-200 ease-out md:static md:z-auto md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="flex items-center gap-2 px-1 pb-4">
        <div className="flex h-5.5 w-5.5 flex-none items-center justify-center rounded-md bg-accent">
          <div className="h-2 w-2 rounded-tl-xs rounded-tr-md rounded-bl-md rounded-br-xs bg-white" />
        </div>
        <span className="flex-1 text-[15px] font-bold tracking-tight text-accent-strong">Worknest</span>
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="flex-none text-muted md:hidden"
        >
          <XIcon size={16} />
        </button>
      </div>

      <button
        type="button"
        className="mb-4 flex h-8.5 items-center gap-2 rounded-[9px] border border-line bg-bg px-2.5 text-left"
      >
        <span className="h-3.5 w-3.5 flex-none rounded bg-accent" />
        <span className="flex-1 truncate text-[12px] font-medium text-ink">{workspaceName}</span>
        <ChevronDownIcon className="flex-none text-faint" />
      </button>

      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, href, icon: NavIcon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] ${
                active ? "bg-accent-soft font-semibold text-accent-strong" : "font-medium text-ink-soft hover:bg-bg"
              }`}
            >
              <NavIcon className={active ? "text-accent" : "text-muted"} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pt-5.5 pb-2 text-[9.5px] font-semibold tracking-widest text-faint">WORKSPACES</div>
      <div className="flex flex-col gap-0.5">
        {workspaces.map((space) => (
          <div key={space.id} className="flex h-7 items-center gap-2.5 rounded-lg px-2.5">
            <span className="h-2.25 w-2.25 flex-none rounded-[3px]" style={{ background: space.color }} />
            <span className="text-[12px] font-medium text-ink-soft">{space.name}</span>
          </div>
        ))}
      </div>

      <div className="flex-1" />
      <Link
        href="/settings"
        className={`flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] font-medium ${
          pathname === "/settings" ? "bg-accent-soft text-accent-strong" : "text-muted hover:bg-bg"
        }`}
      >
        <GearIcon className={pathname === "/settings" ? "text-accent" : undefined} />
        Settings
      </Link>
      </aside>
    </>
  );
}
