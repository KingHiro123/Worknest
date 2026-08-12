import type {
  ActivityItem,
  BoardColumnData,
  BoardRow,
  DashboardTask,
  Note,
  PinnedNote,
  PinnedRow,
  RecentNote,
  StatItem,
  Template,
  Workspace,
} from "@/types";

export const workspaces: Workspace[] = [
  { id: "studio-admin", name: "Studio Admin", color: "#8A7CFF" },
  { id: "school", name: "School", color: "#76A55A" },
  { id: "personal", name: "Personal", color: "#E5A441" },
  { id: "projects", name: "Projects", color: "#D98C6C" },
];

// --- Dashboard -------------------------------------------------------------

export const pinnedNotes: PinnedNote[] = [
  { id: "pn-1", title: "Client message templates", meta: "Studio Admin · Today", color: "#EFEDFF" },
  { id: "pn-2", title: "School project notes", meta: "School · Yesterday", color: "#EAF2E4" },
  { id: "pn-3", title: "App ideas", meta: "Projects · 2 days ago", color: "#FBEAE3" },
];

export const activeTasks: DashboardTask[] = [
  { id: "dt-1", title: "Update studio sheet", priority: "Medium" },
  { id: "dt-2", title: "Draft campaign copy", priority: "High" },
  { id: "dt-3", title: "Review UI layout", priority: "Low" },
];

export const recentNotes: RecentNote[] = [
  { id: "rn-1", title: "Cancellation policy wording", space: "Studio Admin", updated: "Today, 4:32 PM" },
  { id: "rn-2", title: "Instructor onboarding notes", space: "Studio Admin", updated: "Yesterday, 9:12 PM" },
  { id: "rn-3", title: "Marketing ideas", space: "Projects", updated: "May 20, 2024" },
  { id: "rn-4", title: "Database design thoughts", space: "School", updated: "May 19, 2024" },
];

// --- Notes -------------------------------------------------------------

export const notes: Note[] = [
  {
    id: "note-1",
    title: "Client follow-up templates",
    meta: "Updated today, 4:32 PM",
    workspace: "Studio Admin",
    pinned: true,
    tags: ["admin", "messages"],
    body: {
      purpose: "Use these templates when following up with clients in a friendly and professional way.",
      sections: [
        {
          head: "Template 1: General Follow-up",
          body: "Hi [Name], just checking in to see how everything is going! Let me know if you need any help with anything.",
        },
        {
          head: "Template 2: After No Response",
          body: "Hi [Name], just following up on my previous message. Let me know if you have any questions!",
        },
        {
          head: "Template 3: After Work Completed",
          body: "Hi [Name], I hope you're happy with the recent work! Let me know if you need any changes.",
        },
      ],
    },
  },
  {
    id: "note-2",
    title: "Cancellation policy wording",
    meta: "Updated today, 2:10 PM",
    workspace: "Studio Admin",
    body: { purpose: "Draft wording for the studio's cancellation and refund policy.", sections: [] },
  },
  {
    id: "note-3",
    title: "Instructor onboarding notes",
    meta: "Updated yesterday, 9:12 PM",
    workspace: "Studio Admin",
    body: { purpose: "Checklist and notes for bringing a new instructor on board.", sections: [] },
  },
  {
    id: "note-4",
    title: "Studio admin ideas",
    meta: "Updated 2 days ago",
    workspace: "Studio Admin",
    body: { purpose: "Loose ideas for streamlining day-to-day studio admin work.", sections: [] },
  },
  {
    id: "note-5",
    title: "School project plan",
    meta: "Updated 2 days ago",
    workspace: "School",
    body: { purpose: "Milestones and timeline for the current school project.", sections: [] },
  },
  {
    id: "note-6",
    title: "Database design thoughts",
    meta: "Updated 3 days ago",
    workspace: "School",
    body: { purpose: "Notes on schema design for the class database project.", sections: [] },
  },
  {
    id: "note-7",
    title: "App concept ideas",
    meta: "Updated 4 days ago",
    workspace: "Projects",
    body: { purpose: "Early concepts for a personal app project.", sections: [] },
  },
];

// --- Boards -------------------------------------------------------------

export const boardColumns: BoardColumnData[] = [
  {
    id: "todo",
    name: "To Do",
    tasks: [
      { id: "c-1", title: "Update client template sheet", due: "Jun 12", priority: "Medium", tag: "admin" },
      { id: "c-2", title: "Instagram content ideas", due: "Jun 14", priority: "Low", tag: "content" },
      { id: "c-3", title: "Check instructor availability", due: "Jun 15", priority: "Medium", tag: "admin" },
    ],
  },
  {
    id: "doing",
    name: "Doing",
    tasks: [
      { id: "c-4", title: "Draft new client message", due: "Jun 9", priority: "High", tag: "messages" },
      { id: "c-5", title: "Update cancellation policy", due: "Jun 10", priority: "Medium", tag: "admin" },
    ],
  },
  {
    id: "done",
    name: "Done",
    tasks: [
      { id: "c-6", title: "Organize Google Drive", due: "Jun 5", priority: "Low", tag: "admin" },
      { id: "c-7", title: "Weekly admin meeting", due: "Jun 3", priority: "Medium", tag: "admin" },
      { id: "c-8", title: "Review studio photos", due: "Jun 2", priority: "Low", tag: "content" },
    ],
  },
];

// --- Templates -------------------------------------------------------------

export const templateFilters = ["All", "Notes", "Boards", "Client-facing"];

export const templates: Template[] = [
  { id: "t-1", title: "Client Message Draft", description: "A template for writing professional client messages.", updatedLabel: "Updated 2 days ago", tag: "messages" },
  { id: "t-2", title: "Meeting Notes", description: "Template for meeting notes and action items.", updatedLabel: "Updated 1 week ago", tag: "admin" },
  { id: "t-3", title: "Project Planning", description: "Plan and outline your projects effectively.", updatedLabel: "Updated 1 week ago", tag: "projects" },
  { id: "t-4", title: "Sprint Planning", description: "Template for agile sprint planning.", updatedLabel: "Updated 2 weeks ago", tag: "projects" },
  { id: "t-5", title: "Onboarding Checklist", description: "Steps for bringing a new instructor on board.", updatedLabel: "Updated 3 weeks ago", tag: "admin" },
  { id: "t-6", title: "Weekly Review", description: "Reflect on the week and set next priorities.", updatedLabel: "Updated 1 month ago", tag: "personal" },
];

// --- Workspace overview -------------------------------------------------------------

export const workspaceStats: StatItem[] = [
  { value: "24", label: "NOTES" },
  { value: "3", label: "BOARDS" },
  { value: "12", label: "OPEN TASKS" },
  { value: "6", label: "TEMPLATES" },
];

export const pinnedRows: PinnedRow[] = [
  { title: "Message templates", when: "Updated today" },
  { title: "Instructor sheet notes", when: "Updated yesterday" },
  { title: "Client follow-up wording", when: "Updated 2 days ago" },
];

export const boardRows: BoardRow[] = [
  { name: "Weekly Admin Tasks", tasks: "8 tasks", color: "#EFEDFF" },
  { name: "Content Ideas", tasks: "12 tasks", color: "#FCF1DE" },
  { name: "Sheet Updates", tasks: "6 tasks", color: "#EAF2E4" },
];

export const recentActivity: ActivityItem[] = [
  { id: "a-1", text: "You edited “Cancellation policy wording”", when: "Today, 4:32 PM", color: "#8A7CFF" },
  { id: "a-2", text: "You completed “Update instructor availability”", when: "Yesterday, 3:21 PM", color: "#76A55A" },
  { id: "a-3", text: "You created “Client follow-up templates”", when: "May 20, 2024", color: "#8A7CFF" },
  { id: "a-4", text: "You moved “Weekly admin meeting” to Done", when: "May 19, 2024", color: "#76A55A" },
  { id: "a-5", text: "You added the “Sprint Planning” template", when: "May 17, 2024", color: "#E5A441" },
  { id: "a-6", text: "You archived “Old pricing notes”", when: "May 14, 2024", color: "#777366" },
];
