import { TagPill } from "@/components/ui/TagPill";
import { priorityTone } from "@/lib/utils";
import type { Task } from "@/types";

export interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
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
