import { AppShell } from "@/components/layout/AppShell";
import { MenuButton } from "@/components/layout/MenuButton";
import { TopBar, NotificationBell, UserAvatar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { NotesWorkspace } from "@/components/notes/NotesWorkspace";
import { notes } from "@/lib/data";

export default function NotesPage() {
  return (
    <AppShell workspaceName="Studio Admin">
      <TopBar>
        <MenuButton />
        <div className="flex-1" />
        <Button>+ New</Button>
        <NotificationBell />
        <UserAvatar />
      </TopBar>

      <NotesWorkspace notes={notes} />
    </AppShell>
  );
}
