import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar, NotificationBell, UserAvatar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { PinIcon } from "@/components/ui/icons";
import { boardRows, pinnedRows, recentActivity, workspaceStats } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      <Sidebar workspaceName="Studio Admin" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar>
          <NotificationBell />
          <UserAvatar />
        </TopBar>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5.5">
          <div className="flex items-center gap-3.25">
            <div className="h-11 w-11 flex-none rounded-[13px] bg-accent" />
            <div className="flex-1">
              <h1 className="text-[20px] font-bold tracking-tight text-ink">Studio Admin</h1>
              <p className="mt-0.5 text-[11.5px] text-muted">Workspace overview and activity</p>
            </div>
            <Button variant="secondary">+ New Note</Button>
            <Button>+ New Board</Button>
          </div>

          <div className="flex gap-3.5">
            {workspaceStats.map((stat) => (
              <div key={stat.label} className="flex-1 rounded-xl border border-line bg-surface p-3.25">
                <div className="text-[22px] font-bold tracking-tight text-ink">{stat.value}</div>
                <div className="mt-1 text-[10.5px] font-semibold tracking-wider text-faint">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-1 gap-3.5">
            <div className="flex flex-1 flex-col gap-3.5">
              <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-3.5">
                <div className="flex items-center gap-1.75">
                  <PinIcon className="text-accent" />
                  <span className="text-[12.5px] font-semibold text-ink">Pinned Notes</span>
                </div>
                {pinnedRows.map((row) => (
                  <div key={row.title} className="flex items-center gap-2.5 border-t border-line-faint py-1.75">
                    <span className="h-3.5 w-3.5 flex-none rounded bg-accent-soft" />
                    <span className="flex-1 text-[11.5px] font-medium text-ink-soft">{row.title}</span>
                    <span className="text-[10px] text-faint">{row.when}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col gap-2.5 rounded-xl border border-line bg-surface p-3.5">
                <div className="text-[12.5px] font-semibold text-ink">Boards</div>
                {boardRows.map((row) => (
                  <div key={row.name} className="flex items-center gap-2.5 border-t border-line-faint py-1.75">
                    <span className="h-3.5 w-3.5 flex-none rounded" style={{ background: row.color }} />
                    <span className="flex-1 text-[11.5px] font-medium text-ink-soft">{row.name}</span>
                    <span className="text-[10px] text-faint">{row.tasks}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 rounded-xl border border-line bg-surface p-3.5">
              <div className="text-[12.5px] font-semibold text-ink">Recent Activity</div>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-2.5 border-t border-line-faint py-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
                    style={{ background: activity.color }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-pretty text-[11.5px] leading-snug text-ink-soft">{activity.text}</div>
                    <div className="mt-0.5 text-[9.5px] text-faint">{activity.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
