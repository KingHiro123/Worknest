"use client";

import { useState, useEffect, useRef } from "react";
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
  const [dropTargetColumnId, setDropTargetColumnId] = useState<UniqueIdentifier | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    setDropTargetColumnId(columnOfTask(active.id)?.id ?? null);
  }

  // On phone view, columns are a snap carousel where a peeking neighbor can sit
  // only a few pixels from the column under the pointer, and dnd-kit's own
  // collision detection (over) only updates when its matched result changes —
  // it can lag behind or lock onto the wrong column while auto-scroll is
  // carrying the card. So on mobile, cross-column assignment is driven by the
  // real pointer position instead: a native `pointermove` listener (Pointer
  // Events cover touch, mouse, and pen the same way) hit-tests each column's
  // actual rect against where the finger currently is, exactly like you'd do
  // with `elementFromPoint` — except comparing rects directly means the
  // floating DragOverlay ghost (which sits on top of everything) can't shadow
  // the column underneath it the way elementFromPoint would.
  useEffect(() => {
    if (!isMobile || !activeTask) return;

    function handlePointerMove(event: PointerEvent) {
      const container = scrollContainerRef.current;
      if (!container || !activeTask) return;

      let hoveredColumnId: string | null = null;
      container.querySelectorAll<HTMLElement>("[data-column-id]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          hoveredColumnId = el.dataset.columnId ?? null;
        }
      });
      if (!hoveredColumnId) return;

      setDropTargetColumnId((prev) => (prev === hoveredColumnId ? prev : hoveredColumnId));

      setColumns((prev) => {
        const fromColumn = prev.find((col) => col.tasks.some((t) => t.id === activeTask.id));
        if (!fromColumn || fromColumn.id === hoveredColumnId) return prev;
        const movingTask = fromColumn.tasks.find((t) => t.id === activeTask.id);
        if (!movingTask) return prev;

        return prev.map((col) => {
          if (col.id === fromColumn.id) {
            return { ...col, tasks: col.tasks.filter((t) => t.id !== activeTask.id) };
          }
          if (col.id === hoveredColumnId) {
            return { ...col, tasks: [...col.tasks, movingTask] };
          }
          return col;
        });
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isMobile, activeTask]);

  // On phone view, follow the drag: whichever column is the current drop target
  // (set above from the real pointer position) gets smoothly recentered in the
  // carousel, in either direction. This replaces relying on dnd-kit's own
  // edge-proximity auto-scroll for the horizontal carousel (disabled below via
  // canScroll) — that edge zone overlapped the peeking neighbor column itself,
  // which is what caused drags into "Doing" to slide straight through into
  // "Done" instead of stopping there.
  useEffect(() => {
    if (!isMobile || !activeTask || !dropTargetColumnId) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const target = Array.from(
      container.querySelectorAll<HTMLElement>("[data-column-id]"),
    ).find((el) => el.dataset.columnId === dropTargetColumnId);
    target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [isMobile, activeTask, dropTargetColumnId]);

  // While dragging over a different column, live-move the card so the columns
  // preview the drop as it happens (standard dnd-kit multi-container pattern).
  // On phone view this is handled by the pointermove effect above instead.
  function handleDragOver({ active, over }: DragOverEvent) {
    if (isMobile) return;
    if (!over) return;

    const fromColumn = columnOfTask(active.id);
    const toColumn = columnOfTask(over.id) ?? columnById(over.id);
    setDropTargetColumnId((toColumn ?? fromColumn)?.id ?? null);

    if (active.id === over.id) return;
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
    setDropTargetColumnId(null);
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

  function handleDragCancel() {
    setActiveTask(null);
    setDropTargetColumnId(null);
  }

  return (
    <DndContext
      id="boards-dnd"
      sensors={sensors}
      collisionDetection={collisionDetection}
      // On phone view, horizontal carousel scrolling is driven deliberately by
      // the drop-target-column effect above (which recenters whichever column
      // the pointer is hovering), not by dnd-kit's own edge-proximity
      // auto-scroll — canScroll below excludes the carousel container from it.
      // dnd-kit's default edge threshold is 20% of the scroll container's
      // width per side; on phone view that's wider than the sliver of the next
      // column peeking in at the edge, so the peeking column's entire visible
      // area sat inside the auto-scroll hot zone and a card hovered there kept
      // sliding straight through into the column beyond — exactly why dragging
      // into "Doing" was landing in "Done" instead. Column vertical task lists
      // (overflow-y-auto, for long columns) still auto-scroll normally; only
      // the horizontal carousel container is opted out.
      autoScroll={{
        acceleration: isMobile ? 4 : 10,
        canScroll: isMobile
          ? (element) => element !== scrollContainerRef.current
          : undefined,
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        ref={scrollContainerRef}
        className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto p-4 sm:p-5.5 md:snap-none"
      >
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            isDropTarget={activeTask !== null && dropTargetColumnId === column.id}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          // Scoped to just this element (not the whole page — see globals.css):
          // some mobile browsers auto-invert pages that don't opt out of "force
          // dark," and that repaint is known to corrupt transformed + translucent
          // elements into garbled diagonal artifacts instead of the actual
          // content. This card is rotated and semi-transparent (rotate-2
          // opacity-90), so it's exactly the shape that glitches; opting just
          // the drag ghost out keeps it rendering as a normal card while leaving
          // the rest of the app under the browser's own color handling.
          <div className="w-[82vw] max-w-80 rotate-2 opacity-90 [color-scheme:light] md:w-72">
            <TaskCardContent task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
