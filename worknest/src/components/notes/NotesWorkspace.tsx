"use client";

import { useState } from "react";
import { NoteList } from "@/components/notes/NoteList";
import { NoteEditor } from "@/components/notes/NoteEditor";
import type { Note } from "@/types";

export interface NotesWorkspaceProps {
  notes: Note[];
}

/**
 * Client wrapper around NoteList + NoteEditor. On md+ both panes show side
 * by side (as in the design). Below md there's only room for one pane, so
 * this tracks which one is showing and lets tapping a note switch to it,
 * with a back button in the editor returning to the list.
 */
export function NotesWorkspace({ notes }: NotesWorkspaceProps) {
  const [activeId, setActiveId] = useState(notes[0]?.id);
  const [mobileView, setMobileView] = useState<"list" | "editor">("list");
  const activeNote = notes.find((note) => note.id === activeId) ?? notes[0];

  function selectNote(id: string) {
    setActiveId(id);
    setMobileView("editor");
  }

  return (
    <div className="flex min-h-0 flex-1">
      <NoteList
        notes={notes}
        activeId={activeNote?.id}
        onSelect={selectNote}
        mobileHidden={mobileView === "editor"}
      />
      {activeNote && (
        <div className={`min-w-0 flex-1 ${mobileView === "list" ? "hidden md:flex" : "flex"}`}>
          <NoteEditor note={activeNote} onBack={() => setMobileView("list")} />
        </div>
      )}
    </div>
  );
}
