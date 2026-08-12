import { AppShell } from "@/components/layout/AppShell";
import { MenuButton } from "@/components/layout/MenuButton";
import {
  TopBar,
  NotificationBell,
  UserAvatar,
} from "@/components/layout/TopBar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagPill } from "@/components/ui/TagPill";
import { PinIcon } from "@/components/ui/icons";
import { priorityTone } from "@/lib/utils";
import { activeTasks, pinnedNotes, recentNotes } from "@/lib/data";

export default function DashboardPage() {
  return (
    <AppShell workspaceName="Studio Admin">
        <TopBar>
          <MenuButton />
          <div className="hidden flex-1 justify-center md:flex">
            <Input
              icon="search"
              placeholder="Search everything…"
              wrapperClassName="w-82.5"
              readOnly
            />
          </div>
          <Button>+ New</Button>
          <NotificationBell />
          <UserAvatar />
        </TopBar>

        <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-4 sm:p-5.5">
          <div>
            <h1 className="text-[19px] font-bold tracking-tight text-ink">
              Good evening, &quot;Username&quot;{" "}
            </h1>
            <p className="mt-0.75 text-[12px] text-muted">
              Here&rsquo;s what&rsquo;s happening in your workspace.
            </p>
          </div>

          <div className="flex items-end gap-4 rounded-xl border border-line bg-surface p-3.5">
            <div className="flex-1">
              <div className="text-[12.5px] font-semibold text-ink">
                Quick Note
              </div>
              <div className="mt-1.75 text-[12px] text-faint">
                Write something quickly…
              </div>
            </div>
            <Button>Save Note</Button>
          </div>

          <div className="flex flex-col gap-3.5 md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col gap-2.75 rounded-xl border border-line bg-surface p-3.5">
              <div className="flex items-center gap-1.75">
                <PinIcon className="text-accent" />
                <span className="flex-1 text-[12.5px] font-semibold text-ink">
                  Pinned Notes
                </span>
                <span className="text-[13px] tracking-widest text-faint">
                  ···
                </span>
              </div>
              <div className="flex flex-col gap-2.25">
                {pinnedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start gap-2.25 rounded-[9px] border border-line-soft bg-bg px-2.5 py-2"
                  >
                    <span
                      className="mt-px h-4 w-4 flex-none rounded"
                      style={{ background: note.color }}
                      aria-hidden
                    />
                    <div>
                      <div className="text-[11.5px] font-semibold text-ink">
                        {note.title}
                      </div>
                      <div className="mt-0.75 text-[10px] text-faint">
                        {note.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/notes"
                className="text-[11px] font-semibold text-accent-strong hover:text-accent-hover"
              >
                View all
              </a>
            </div>

            <div className="flex flex-1 flex-col gap-2.75 rounded-xl border border-line bg-surface p-3.5">
              <div className="flex items-center gap-1.75">
                <span className="flex-1 text-[12.5px] font-semibold text-ink">
                  Active Tasks
                </span>
                <span className="text-[13px] tracking-widest text-faint">
                  ···
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {activeTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2.25">
                    <span className="h-3.5 w-3.5 flex-none rounded border-[1.4px] border-[#CFC9BE]" />
                    <span className="flex-1 text-[11.5px] text-ink-soft">
                      {task.title}
                    </span>
                    <TagPill tone={priorityTone(task.priority)}>
                      {task.priority}
                    </TagPill>
                  </div>
                ))}
              </div>
              <div className="flex-1" />
              <a
                href="/boards"
                className="text-[11px] font-semibold text-accent-strong hover:text-accent-hover"
              >
                View board
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.25 rounded-xl border border-line bg-surface p-3.5">
            <div className="text-[12.5px] font-semibold text-ink">
              Recent Notes
            </div>
            <div className="grid grid-cols-[1fr_90px] gap-x-3 gap-y-2 border-b border-line-soft pb-2 text-[9.5px] font-semibold tracking-widest text-faint sm:grid-cols-[1fr_150px_130px]">
              <span>TITLE</span>
              <span className="hidden sm:block">WORKSPACES</span>
              <span>UPDATED</span>
            </div>
            {recentNotes.map((note) => (
              <div
                key={note.id}
                className="grid grid-cols-[1fr_90px] gap-3 border-b border-line-faint py-1.75 text-[11.5px] text-ink-soft sm:grid-cols-[1fr_150px_130px]"
              >
                <span className="truncate font-medium">{note.title}</span>
                <span className="hidden text-muted sm:block">{note.space}</span>
                <span className="text-muted">{note.updated}</span>
              </div>
            ))}
            <a
              href="/notes"
              className="mt-0.5 text-[11px] font-semibold text-accent-strong hover:text-accent-hover"
            >
              View all notes
            </a>
          </div>
        </div>
    </AppShell>
  );
}
