import type { Priority } from "@/types";
import type { TagTone } from "@/components/ui/TagPill";

/** Maps a task/card priority to the TagPill tone that colors it. */
export function priorityTone(priority: Priority): TagTone {
  if (priority === "High") return "high";
  if (priority === "Low") return "low";
  return "medium";
}
