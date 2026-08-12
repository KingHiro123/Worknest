import { Sidebar } from "@/components/layout/Sidebar";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArchiveIcon } from "@/components/ui/icons";

export default function ArchivePage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      <Sidebar workspaceName="Studio Admin" />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-13.5 flex-none items-center border-b border-line bg-surface px-5">
          <h1 className="text-[15px] font-bold tracking-tight text-ink">Archive</h1>
        </header>

        <div className="flex flex-1 flex-col overflow-y-auto p-5.5">
          <EmptyState
            icon={<ArchiveIcon size={18} />}
            title="Nothing archived yet"
            description="Notes, boards, and templates you archive will show up here so your active workspace stays tidy."
          />
        </div>
      </div>
    </div>
  );
}
