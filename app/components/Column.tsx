import React from 'react';
import { Task as TaskType, TaskState } from '../types';
import { Task } from './Task';
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
  title: string;
  tasks: TaskType[];
  state: TaskState;
}

export function Column({ title, tasks, state }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: state,
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-80">
      <h2 className="font-bold mb-4 text-black">{title}</h2>
      <div ref={setNodeRef} className="min-h-[500px]">
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}