import React from 'react';
import { Task as TaskType } from '../types';
import { useDraggable } from '@dnd-kit/core';

interface TaskProps {
  task: TaskType;
}

export function Task({ task }: TaskProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
    data: task
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const isDragging = !!transform;

return (
  <div
    ref={setNodeRef}
    style={{
      ...style,
      zIndex: isDragging ? 1000 : 'auto', // Higher z-index while dragging
    }}
    {...listeners}
    {...attributes}
    className="bg-gray-500 p-4 mb-2 rounded-lg shadow-md hover:shadow-lg border border-gray-200 cursor-move"
  >
    {task.text}
  </div>
);
}