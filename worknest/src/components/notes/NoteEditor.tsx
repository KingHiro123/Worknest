import { ChevronDownIcon, ChevronLeftIcon, PinIcon } from "@/components/ui/icons";
import { TagPill } from "@/components/ui/TagPill";
import { Button } from "@/components/ui/Button";
import type { Note } from "@/types";

const TOOLBAR = [
  { label: "B", weight: "font-bold" },
  { label: "I", weight: "italic font-normal" },
  { label: "U", weight: "font-medium" },
  { label: "H", weight: "font-semibold" },
  { label: "···", weight: "font-normal" },
  { label: "“”", weight: "font-normal" },
  { label: "≔", weight: "font-normal" },
  { label: "⊞", weight: "font-normal" },
  { label: "↩", weight: "font-normal" },
];

export interface NoteEditorProps {
  note: Note;
  /** Shows a mobile-only back button that returns to the note list. */
  onBack?: () => void;
}

export function NoteEditor({ note, onBack }: NoteEditorProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-surface">
      <div className="flex items-start gap-2.5 px-5.5 pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to notes"
            className="-ml-1 flex-none p-1 text-ink-soft md:hidden"
          >
            <ChevronLeftIcon size={17} />
          </button>
        )}
        <span className="flex-1 text-[16px] font-bold tracking-tight text-ink">{note.title}</span>
        <span className="text-[13px] tracking-widest text-faint">···</span>
        <PinIcon className="flex-none text-accent" />
      </div>

      <div className="flex items-end gap-6.5 px-5.5 pt-3.5 pb-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9.5px] font-semibold tracking-widest text-faint">WORKSPACE</span>
          <div className="flex h-7 items-center gap-2 rounded-lg border border-line bg-bg px-2.5 text-[11.5px] text-ink">
            {note.workspace}
            <ChevronDownIcon className="text-faint" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9.5px] font-semibold tracking-widest text-faint">TAGS</span>
          <div className="flex h-7 items-center gap-1.5">
            {note.tags?.map((tag) => (
              <TagPill key={tag} tone="accent" size="md">
                # {tag}
              </TagPill>
            ))}
            <span className="text-[12px] text-faint">+</span>
          </div>
        </div>
      </div>

      <div className="mx-5.5 flex h-8.5 items-center gap-0.5 rounded-[9px] border border-line bg-bg px-2">
        {TOOLBAR.map((b) => (
          <span
            key={b.label}
            className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] text-ink-soft ${b.weight}`}
          >
            {b.label}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-5.5 py-4">
        {note.body?.purpose && (
          <div>
            <div className="mb-1 text-[12.5px] font-bold text-ink">Purpose</div>
            <p className="max-w-130 text-pretty text-[11.5px] leading-relaxed text-ink-soft">
              {note.body.purpose}
            </p>
          </div>
        )}
        {note.body?.sections.map((section) => (
          <div key={section.head}>
            <div className="mb-1 text-[12px] font-bold text-ink">{section.head}</div>
            <p className="max-w-130 text-pretty text-[11.5px] leading-relaxed text-ink-soft">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <div className="flex h-13 flex-none items-center gap-2.5 border-t border-line px-5.5">
        <span className="flex-1 text-[10.5px] text-faint">{note.meta}</span>
        <Button variant="danger" size="sm">
          Delete
        </Button>
        <Button variant="secondary" size="sm">
          Pin
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
