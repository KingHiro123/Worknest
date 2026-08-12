"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
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
  const { setNodeRef } = useDroppable({ id: column.id });
  const style = COLUMN_STYLES[column.name] ?? "bg-line-faint border-line";
  const taskIds = column.tasks.map((task) => task.id);

  return (
    <div
      className={`flex h-full w-[82vw] max-w-80 flex-none snap-center flex-col gap-2.5 rounded-xl border p-3 md:w-auto md:max-w-none md:min-w-0 md:flex-1 ${style}`}
    >
      <div className="flex flex-none items-center px-0.75">
        <span className="flex-1 text-[12.5px] font-bold text-ink">{column.name}</span>
        <span className="text-[10px] font-semibold text-faint">{column.tasks.length}</span>
      </div>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex min-h-16 flex-1 flex-col gap-2.5 overflow-y-auto">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {column.tasks.length === 0 && (
            <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-line py-6 text-[10.5px] text-faint">
              Drop cards here
            </div>
          )}
        </div>
      </SortableContext>
      <div className="flex-none cursor-pointer rounded-md px-0.75 py-1 text-center text-[11px] font-semibold text-faint hover:text-muted">
        + Add card
      </div>
    </div>
  );
}
