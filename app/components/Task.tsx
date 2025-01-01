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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 mb-2 rounded shadow cursor-move"
    >
      {task.text}
    </div>
  );
} 