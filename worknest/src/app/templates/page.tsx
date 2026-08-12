import { AppShell } from "@/components/layout/AppShell";
import { MenuButton } from "@/components/layout/MenuButton";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagPill } from "@/components/ui/TagPill";
import { DocIcon } from "@/components/ui/icons";
import { templateFilters, templates } from "@/lib/data";

export default function TemplatesPage() {
  return (
    <AppShell workspaceName="Studio Admin">
      <header className="flex h-13.5 flex-none items-center gap-3.5 border-b border-line bg-surface px-5">
        <MenuButton />
        <h1 className="flex-1 truncate text-[15px] font-bold tracking-tight text-ink">Templates</h1>
        <div className="hidden md:block">
          <Input icon="search" placeholder="Search templates…" wrapperClassName="w-62.5" readOnly />
        </div>
        <Button>+ New Template</Button>
      </header>

      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-4 sm:p-5.5">
        <div className="flex gap-2 overflow-x-auto">
          {templateFilters.map((filter, i) => (
            <TagPill key={filter} tone={i === 0 ? "filterActive" : "filterInactive"} size="md" className="flex-none">
              {filter}
            </TagPill>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex items-start gap-2.75 rounded-xl border border-line bg-surface p-3.5"
            >
              <div className="flex h-7.5 w-7.5 flex-none items-center justify-center rounded-[9px] bg-accent-soft">
                <DocIcon className="text-accent-strong" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-ink">{template.title}</div>
                <div className="mt-1 text-pretty text-[11px] leading-relaxed text-muted">
                  {template.description}
                </div>
                <div className="mt-2.25 flex items-center gap-2">
                  <span className="text-[9.5px] text-faint">{template.updatedLabel}</span>
                  <TagPill tone="neutral"># {template.tag}</TagPill>
                </div>
              </div>
              <span className="text-[12px] tracking-widest text-[#C6C0B5]">···</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
