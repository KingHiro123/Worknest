import { AppShell } from "@/components/layout/AppShell";
import { MenuButton } from "@/components/layout/MenuButton";
import { Button } from "@/components/ui/Button";
import { FilterIcon, GridIcon, StarIcon } from "@/components/ui/icons";
import { BoardsView } from "@/components/boards/BoardsView";
import { boardColumns } from "@/lib/data";

export default function BoardsPage() {
  return (
    <AppShell workspaceName="Studio Admin">
      <header className="flex h-13.5 flex-none items-center gap-2.5 border-b border-line bg-surface px-5">
        <MenuButton />
        <h1 className="truncate text-[15px] font-bold tracking-tight text-ink">Board: Studio Admin Tasks</h1>
        <StarIcon size={15} className="hidden flex-none text-[#C6C0B5] sm:block" />
        <div className="flex-1" />
        <FilterIcon size={15} className="hidden flex-none text-muted sm:block" />
        <GridIcon size={15} className="hidden flex-none text-muted sm:block" />
        <Button>+ New Card</Button>
      </header>

      <BoardsView initialColumns={boardColumns} />
    </AppShell>
  );
}
