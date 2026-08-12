import { Sidebar } from "@/components/layout/Sidebar";
import { workspaces } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      <Sidebar workspaceName="Studio Admin" />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-13.5 flex-none items-center border-b border-line bg-surface px-5">
          <h1 className="text-[15px] font-bold tracking-tight text-ink">Settings</h1>
        </header>

        <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-5.5">
          <section className="rounded-xl border border-line bg-surface p-3.5">
            <h2 className="text-[12.5px] font-semibold text-ink">Profile</h2>
            <p className="mt-1 text-[11.5px] text-muted">Account and profile settings will live here.</p>
          </section>

          <section className="rounded-xl border border-line bg-surface p-3.5">
            <h2 className="text-[12.5px] font-semibold text-ink">Workspaces</h2>
            <p className="mt-1 text-[11.5px] text-muted">Manage workspace names, colors, and members.</p>
            <div className="mt-3 flex flex-col gap-1">
              {workspaces.map((space) => (
                <div key={space.id} className="flex items-center gap-2.5 border-t border-line-faint py-2 first:border-t-0">
                  <span className="h-2.5 w-2.5 flex-none rounded-[3px]" style={{ background: space.color }} />
                  <span className="text-[11.5px] font-medium text-ink-soft">{space.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
