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

  // Sort tasks by priority: high > medium > low
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTasks = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="bg-gray-100 p-4 bg-base-200 rounded-lg w-80 ">
      <h2 className="font-bold mb-4 card-title">{title}</h2>
      <div
        ref={setNodeRef}
        className="min-h-[500px] max-h-[500px] overflow-y-auto rounded-lg shadow-inner p-2"
      >
        {sortedTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
