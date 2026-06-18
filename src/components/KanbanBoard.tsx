'use client'

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateApplicationStatus } from "@/app/actions/search";
import { KanbanCard } from "./KanbanCard";

interface KanbanBoardProps {
  initialApplications: any[];
}

const COLUMNS = [
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offer", value: "offered" },
  { label: "Rejected", value: "rejected" },
];

export function KanbanBoard({ initialApplications }: KanbanBoardProps) {
  const [apps, setApps] = useState(initialApplications);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeApp = apps.find((a) => a.id === active.id);
    const overId = over.id as string;

    // Check if we dropped over a column or another card
    const overColumn = COLUMNS.find(c => c.value === overId);
    const newStatus = overColumn ? overColumn.value : apps.find(a => a.id === overId)?.status;

    if (activeApp && newStatus && activeApp.status !== newStatus) {
      const updatedApps = apps.map((a) =>
        a.id === active.id ? { ...a, status: newStatus } : a
      );
      setApps(updatedApps);
      await updateApplicationStatus(active.id as string, newStatus);
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
        {COLUMNS.map((column) => (
          <div key={column.value} className="flex flex-col gap-4">
            <Card className="bg-slate-100/50 dark:bg-slate-900/50 border-dashed flex-1 flex flex-col overflow-hidden">
              <CardHeader className="py-4 shrink-0">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {column.label}
                  <span className="text-xs bg-white dark:bg-slate-800 px-2 py-0.5 rounded border">
                    {apps.filter((a) => a.status === column.value).length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                <SortableContext
                  items={apps.filter((a) => a.status === column.value).map(a => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {apps
                    .filter((a) => a.status === column.value)
                    .map((app) => (
                      <KanbanCard key={app.id} app={app} />
                    ))}
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <KanbanCard app={apps.find((a) => a.id === activeId)} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
