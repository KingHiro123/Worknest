export type Priority = "Low" | "Medium" | "High";

export interface NoteSection {
  head: string;
  body: string;
}

export interface NoteBody {
  purpose: string;
  sections: NoteSection[];
}

export interface Note {
  id: string;
  title: string;
  meta: string;
  workspace: string;
  pinned?: boolean;
  tags?: string[];
  body?: NoteBody;
}

export interface PinnedNote {
  id: string;
  title: string;
  meta: string;
  color: string;
}

export interface RecentNote {
  id: string;
  title: string;
  space: string;
  updated: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  priority: Priority;
}

export interface Task {
  id: string;
  title: string;
  due: string;
  priority: Priority;
  tag: string;
}

export interface BoardColumnData {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Template {
  id: string;
  title: string;
  description: string;
  updatedLabel: string;
  tag: string;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface PinnedRow {
  title: string;
  when: string;
}

export interface BoardRow {
  name: string;
  tasks: string;
  color: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  when: string;
  color: string;
}
