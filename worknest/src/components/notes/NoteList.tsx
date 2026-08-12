import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { NoteCard } from "@/components/notes/NoteCard";
import type { Note } from "@/types";

export interface NoteListProps {
  notes: Note[];
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Hidden below md when a note is open in the mobile master-detail view. */
  mobileHidden?: boolean;
}

export function NoteList({ notes, activeId, onSelect, mobileHidden = false }: NoteListProps) {
  return (
    <div
      className={`${mobileHidden ? "hidden md:flex" : "flex"} w-full flex-none flex-col gap-2.75 border-r border-line bg-surface p-3.5 md:w-65.5`}
    >
      <div className="flex items-center">
        <span className="flex-1 text-[16px] font-bold text-ink">Notes</span>
        <span className="text-[13px] tracking-widest text-faint">···</span>
      </div>
      <Input icon="search" placeholder="Search notes…" readOnly />
      <Button variant="soft" className="justify-center">
        + New Note
      </Button>
      <div className="mt-0.5 flex flex-col gap-1 overflow-y-auto">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} active={note.id === activeId} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
