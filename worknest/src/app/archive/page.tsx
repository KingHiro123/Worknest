import { AppShell } from "@/components/layout/AppShell";
import { MenuButton } from "@/components/layout/MenuButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArchiveIcon } from "@/components/ui/icons";

export default function ArchivePage() {
  return (
    <AppShell workspaceName="Studio Admin">
      <header className="flex h-13.5 flex-none items-center gap-2.5 border-b border-line bg-surface px-5">
        <MenuButton />
        <h1 className="text-[15px] font-bold tracking-tight text-ink">Archive</h1>
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-5.5">
        <EmptyState
          icon={<ArchiveIcon size={18} />}
          title="Nothing archived yet"
          description="Notes, boards, and templates you archive will show up here so your active workspace stays tidy."
        />
      </div>
    </AppShell>
  );
}
