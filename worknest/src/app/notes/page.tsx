import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar, NotificationBell, UserAvatar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { NoteList } from "@/components/notes/NoteList";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { notes } from "@/lib/data";

export default function NotesPage() {
  const activeNote = notes[0];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      <Sidebar workspaceName="Studio Admin" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar>
          <Button>+ New</Button>
          <NotificationBell />
          <UserAvatar />
        </TopBar>

        <div className="flex min-h-0 flex-1">
          <NoteList notes={notes} activeId={activeNote.id} />
          <NoteEditor note={activeNote} />
        </div>
      </div>
    </div>
  );
}
