'use client'

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KanbanCard({ app, isOverlay }: { app: any; isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-3 text-sm shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-colors",
        isDragging && "opacity-30",
        isOverlay && "border-primary shadow-lg rotate-3"
      )}
      {...attributes}
      {...listeners}
    >
      <div className="font-bold">{app.company}</div>
      <div className="text-muted-foreground">{app.role}</div>
      {app.appliedDate && (
        <div className="text-[10px] mt-2 opacity-50">
          {new Date(app.appliedDate).toLocaleDateString()}
        </div>
      )}
    </Card>
  );
}
