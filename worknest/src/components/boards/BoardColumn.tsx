import { TaskCard } from "@/components/boards/TaskCard";
import type { BoardColumnData } from "@/types";

const COLUMN_STYLES: Record<string, string> = {
  "To Do": "bg-line-faint border-line",
  Doing: "bg-amber-soft border-amber-line",
  Done: "bg-green-soft border-green-line",
};

export interface BoardColumnProps {
  column: BoardColumnData;
}

export function BoardColumn({ column }: BoardColumnProps) {
  const style = COLUMN_STYLES[column.name] ?? "bg-line-faint border-line";

  return (
    <div className={`flex min-w-0 flex-1 flex-col gap-2.5 rounded-xl border p-3 ${style}`}>
      <div className="flex items-center px-0.75">
        <span className="flex-1 text-[12.5px] font-bold text-ink">{column.name}</span>
        <span className="text-[10px] font-semibold text-faint">{column.tasks.length}</span>
      </div>
      {column.tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <div className="cursor-pointer rounded-md px-0.75 py-1 text-[11px] font-semibold text-faint hover:text-muted">
        + Add card
      </div>
    </div>
  );
}
