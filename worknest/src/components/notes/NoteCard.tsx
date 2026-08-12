import { PinIcon } from "@/components/ui/icons";
import type { Note } from "@/types";

export interface NoteCardProps {
  note: Note;
  active?: boolean;
  onSelect?: (id: string) => void;
}

export function NoteCard({ note, active = false, onSelect }: NoteCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(note.id)}
      className={`flex w-full items-start gap-2 rounded-[9px] border px-2.5 py-2.25 text-left ${
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
    </button>
  );
}
