import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { FilterIcon, GridIcon, StarIcon } from "@/components/ui/icons";
import { BoardColumn } from "@/components/boards/BoardColumn";
import { boardColumns } from "@/lib/data";

export default function BoardsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      <Sidebar workspaceName="Studio Admin" />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-13.5 flex-none items-center gap-2.5 border-b border-line bg-surface px-5">
          <h1 className="text-[15px] font-bold tracking-tight text-ink">Board: Studio Admin Tasks</h1>
          <StarIcon size={15} className="text-[#C6C0B5]" />
          <div className="flex-1" />
          <FilterIcon size={15} className="text-muted" />
          <GridIcon size={15} className="text-muted" />
          <Button>+ New Card</Button>
        </header>

        <div className="flex flex-1 gap-4 overflow-x-auto p-5.5">
          {boardColumns.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}
