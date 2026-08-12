import { PinIcon } from "@/components/ui/icons";
import type { Note } from "@/types";

export interface NoteCardProps {
  note: Note;
  active?: boolean;
}

export function NoteCard({ note, active = false }: NoteCardProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-[9px] border px-2.5 py-2.25 ${
        active ? "border-accent-soft-line bg-accent-soft" : "border-transparent hover:bg-bg"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className={`truncate text-[11.5px] font-semibold ${active ? "text-accent-strong" : "text-ink"}`}>
          {note.title}
        </div>
        <div className="mt-1 text-[9.5px] text-faint">{note.meta}</div>
      </div>
      {note.pinned && <PinIcon size={11} className="mt-0.5 flex-none text-accent" />}
    </div>
  );
}
