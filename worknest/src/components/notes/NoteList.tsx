import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { NoteCard } from "@/components/notes/NoteCard";
import type { Note } from "@/types";

export interface NoteListProps {
  notes: Note[];
  activeId?: string;
}

export function NoteList({ notes, activeId }: NoteListProps) {
  return (
    <div className="flex w-65.5 flex-none flex-col gap-2.75 border-r border-line bg-surface p-3.5">
      <div className="flex items-center">
        <span className="flex-1 text-[16px] font-bold text-ink">Notes</span>
        <span className="text-[13px] tracking-widest text-faint">···</span>
      </div>
      <Input icon="search" placeholder="Search notes…" readOnly />
      <Button variant="soft" className="justify-center">
        + New Note
      </Button>
      <div className="mt-0.5 flex flex-col gap-1">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} active={note.id === activeId} />
        ))}
      </div>
    </div>
  );
}
