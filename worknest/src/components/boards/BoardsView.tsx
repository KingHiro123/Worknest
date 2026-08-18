"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BoardColumn } from "@/components/boards/BoardColumn";
import { TaskCardContent } from "@/components/boards/TaskCard";
import type { BoardColumnData, Task } from "@/types";

export interface BoardsViewProps {
  initialColumns: BoardColumnData[];
}

// On phone widths each column nearly fills the viewport and its neighbors peek in
// at the edges (snap carousel), so their droppable rects sit only a few pixels away
// from the active column's. closestCorners alone can then match a peeking neighbor
// instead of the column the pointer is actually over. Require the pointer to be
// within a droppable first, and only fall back to corner-distance matching (e.g. for
// drops in the empty gap of an empty column) when nothing contains the pointer.
const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  return pointerCollisions.length > 0
    ? pointerCollisions
    : closestCorners(args);
};

/** Client-side kanban board: drag cards to reorder within a column or move between columns. */
export function BoardsView({ initialColumns }: BoardsViewProps) {
  const [columns, setColumns] = useState(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: isMobile ? 8 : 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Track mobile state on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function columnOfTask(id: UniqueIdentifier) {
    return columns.find((col) => col.tasks.some((task) => task.id === id));
  }

  function columnById(id: UniqueIdentifier) {
    return columns.find((col) => col.id === id);
  }

  function handleDragStart({ active }: DragStartEvent) {
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    setActiveTask(task ?? null);
  }

  // While dragging over a different column, live-move the card so the columns
  // preview the drop as it happens (standard dnd-kit multi-container pattern).
  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over || active.id === over.id) return;

    const fromColumn = columnOfTask(active.id);
    const toColumn = columnOfTask(over.id) ?? columnById(over.id);
    if (!fromColumn || !toColumn || fromColumn.id === toColumn.id) return;

    setColumns((prev) => {
      const movingTask = fromColumn.tasks.find((t) => t.id === active.id);
      if (!movingTask) return prev;
      const overIndex = toColumn.tasks.findIndex((t) => t.id === over.id);

      return prev.map((col) => {
        if (col.id === fromColumn.id) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== active.id) };
        }
        if (col.id === toColumn.id) {
          const insertAt = overIndex >= 0 ? overIndex : col.tasks.length;
          const nextTasks = [...col.tasks];
          nextTasks.splice(insertAt, 0, movingTask);
          return { ...col, tasks: nextTasks };
        }
        return col;
      });
    });
  }

  // Finalize ordering within the settled column once the drag is released.
  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null);
    if (!over) return;

    const fromColumn = columnOfTask(active.id);
    const toColumn = columnOfTask(over.id) ?? columnById(over.id);
    if (!fromColumn || !toColumn || fromColumn.id !== toColumn.id) return;

    const oldIndex = fromColumn.tasks.findIndex((t) => t.id === active.id);
    const newIndex = toColumn.tasks.findIndex((t) => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === fromColumn.id
          ? { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) }
          : col,
      ),
    );
  }

  return (
    <DndContext
      id="boards-dnd"
      sensors={sensors}
      collisionDetection={collisionDetection}
      // Carrying a card near the screen edge auto-scrolls the column carousel on
      // phone view; a lower acceleration ramps that scroll up more gradually so
      // crossing into the middle column feels deliberate instead of snappy. This
      // only affects the horizontal carousel scroll (mobile) and the vertical
      // task-list scroll for long columns — it never skips or drops a drag-over
      // event, so it can't cause a drop to be lost like the old throttle did.
      autoScroll={{ acceleration: isMobile ? 4 : 10 }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto p-4 sm:p-5.5 md:snap-none">
        {columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          <div className="w-[82vw] max-w-80 rotate-2 opacity-90 md:w-72">
            <TaskCardContent task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
