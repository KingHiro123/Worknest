"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TagPill } from "@/components/ui/TagPill";
import { priorityTone } from "@/lib/utils";
import type { Task } from "@/types";

export interface TaskCardProps {
  task: Task;
}

/** Pure card visuals, reused by the sortable card below and the drag overlay preview. */
export function TaskCardContent({ task }: TaskCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] border border-line bg-surface p-2.75 shadow-sm">
      <div className="flex items-start gap-2">
        <span className="flex-1 text-pretty text-[11.5px] font-semibold leading-snug text-ink">{task.title}</span>
        <span className="text-[12px] tracking-widest text-[#C6C0B5]">···</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[9.5px] text-faint">Due: {task.due}</span>
        <TagPill tone={priorityTone(task.priority)}>{task.priority}</TagPill>
      </div>
      <TagPill tone="neutral" className="self-start">
        # {task.tag}
      </TagPill>
    </div>
  );
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={`touch-none ${isDragging ? "opacity-40" : ""}`}
    >
      <TaskCardContent task={task} />
    </div>
  );
}
