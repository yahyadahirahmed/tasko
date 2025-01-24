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

  // Determine border color based on priority
  const borderColor =
    task.priority === 'high'
      ? 'border-red-500'
      : task.priority === 'medium'
      ? 'border-orange-500'
      : 'border-green-500';

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? 1000 : 'auto', // Higher z-index while dragging
      }}
      {...listeners}
      {...attributes}
      className={`bg-white text-black font-bold p-4 mb-2 rounded-lg shadow-md hover:shadow-lg border-2 ${borderColor} cursor-move`}
    >
      {task.text}
    </div>
  );
}